// Hide cursor after 3 seconds of mouse inactivity
let cursorTimeout;
const CURSOR_HIDE_DELAY = 3000; // 3 seconds in milliseconds

function resetCursorTimer() {
	// Clear existing timeout
	clearTimeout(cursorTimeout);

	// Show cursor
	document.body.style.cursor = 'default';

	// Set new timeout to hide cursor
	cursorTimeout = setTimeout(() => {
		document.body.style.cursor = 'none';
	}, CURSOR_HIDE_DELAY);
}

// Track mouse movement
document.addEventListener('mousemove', resetCursorTimer);
document.addEventListener('mousedown', resetCursorTimer);

// Initialize cursor timer on page load
resetCursorTimer();

// Enter fullscreen when 'f' key is pressed
document.addEventListener('keydown', (event) => {
	if (event.key === 'f' || event.key === 'F') {
		// Check if already in fullscreen
		if (!document.fullscreenElement) {
			// Enter fullscreen
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				// Safari
				document.documentElement.webkitRequestFullscreen();
			} else if (document.documentElement.msRequestFullscreen) {
				// IE/Edge
				document.documentElement.msRequestFullscreen();
			}
		} else {
			// Exit fullscreen
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				// Safari
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				// IE/Edge
				document.msExitFullscreen();
			}
		}
	}
});
