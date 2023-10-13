// Get the DOM element for displaying FPS
const fpsDiv = document.getElementById('fpsValue');

let frames = 0;
let startTime = performance.now();
let FPSNormal = 0;

// Function to calculate and update the FPS
const calculateFPSNormal = () => {
    const t = performance.now();
    const dt = t - startTime;
    
    if (dt > 1000) {
        FPSNormal = (frames * 1000) / dt;
        frames = 0;
        startTime = t;
    }
    
    frames++;
};

// Function to update the displayed FPS
const updateLabel = (fps) => {
    fpsDiv.textContent = Math.round(fps);
};

// Call the calculateFPSNormal function periodically (e.g., in your animation loop)
// and then call updateLabel to update the displayed FPS
