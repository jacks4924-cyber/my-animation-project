// script.js

// 1. Get Elements
const scrubber = document.getElementById('scrubber');
const shape = document.getElementById('shape');
const progressValue = document.getElementById('progressValue');

// 2. Define Start (Rectangle - 5 points) and End (Pentagon - 5 points) Coordinates
// Format: [[x1, y1], [x2, y2], ...] where coordinates are percentages (0-100)

// Start Shape: Rectangle (5-point version for morphing compatibility)
const startPoints = [
    [0, 0],    // Top-Left
    [100, 0],  // Top-Right
    [100, 100], // Bottom-Right
    [0, 100],  // Bottom-Left
    [0, 100]   // Duplicate Bottom-Left point
];

// End Shape: Pentagon
const endPoints = [
    [50, 0],   // Top point
    [100, 35], // Top-right point
    [80, 100], // Bottom-right point
    [20, 100], // Bottom-left point
    [0, 35]    // Top-left point (This is now the 5th point for interpolation)
];

/**
 * Interpolates a value between start and end based on a progress factor (0 to 1).
 * @param {number} start The starting coordinate (e.g., 0 for x-start)
 * @param {number} end The ending coordinate (e.g., 50 for x-end)
 * @param {number} progress The scrub value (0.0 to 1.0)
 * @returns {number} The interpolated coordinate
 */
function interpolate(start, end, progress) {
    return start + (end - start) * progress;
}

/**
 * Calculates the new clip-path based on the slider value.
 */
function updateShape() {
    // Get the slider value (0 to 100) and convert it to a progress factor (0.0 to 1.0)
    const scrubValue = parseInt(scrubber.value);
    const progress = scrubValue / 100; // e.g., 50 -> 0.5

   

    let newClipPath = 'polygon(';
    
    // Loop through all 5 points
    for (let i = 0; i < startPoints.length; i++) {
        const startX = startPoints[i][0];
        const startY = startPoints[i][1];
        const endX = endPoints[i][0];
        const endY = endPoints[i][1];

        // Calculate the intermediate X and Y coordinates
        const interpolatedX = interpolate(startX, endX, progress);
        const interpolatedY = interpolate(startY, endY, progress);

        // Append the interpolated coordinates to the clip-path string
        newClipPath += `${interpolatedX}% ${interpolatedY}%`;

        // Add a comma separator for all points except the last one
        if (i < startPoints.length - 1) {
            newClipPath += ', ';
        }
    }
    
    newClipPath += ')';

    // Apply the newly calculated clip-path to the shape element
    shape.style.clipPath = newClipPath;
}

// 4. Attach Event Listener
// Update the shape whenever the slider value changes
scrubber.addEventListener('input', updateShape);

// 5. Initial setup: Set the shape to 0% progress on load
updateShape();