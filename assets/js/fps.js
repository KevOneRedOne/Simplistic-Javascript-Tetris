var fpsDiv = document.getElementById('fpsValue');
var frames = 0;
var startTime = performance.now();
var FPSNormal = 0;

// Every 1000ms, let's update the framerate
function calculateFPSNormal() {
	var t = performance.now();
	var dt = t - startTime;
	// if elapsed time is greater than 1s
	if( dt > 1000 ) {
		// calculate the frames drawn over the period of time
		FPSNormal = frames * 1000 / dt;
		// and restart the values
		frames = 0;
		startTime = t;
	}
	frames++;
}

function updateLabel( fps ) {
	fpsDiv.textContent = Math.round( fps );
}
