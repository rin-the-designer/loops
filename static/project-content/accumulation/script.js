let colors = [
	['#FFFFFF', '#000000'],
	['#000000', '#ffffff']
];
let colorIndex = 0;

function applyColorScheme(index) {
	document.body.style.backgroundColor = colors[index][0];
	document.documentElement.style.setProperty('--circle-bg', colors[index][1]);
	document.documentElement.style.setProperty('--canvas-bg', colors[index][0]);
}

function setNextColorScheme() {
	colorIndex = (colorIndex + 1) % colors.length;
	applyColorScheme(colorIndex);
}

function setCircleSizeFromDistance(event) {
	// Get viewport center
	const viewportCenterX = window.innerWidth / 2;
	const viewportCenterY = window.innerHeight / 2;

	// Get click coordinates
	const clickX = event.clientX;
	const clickY = event.clientY;

	// Calculate distance using Pythagorean theorem
	const distanceX = clickX - viewportCenterX;
	const distanceY = clickY - viewportCenterY;
	const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

	// Calculate diameter in pixels
	const diameterPx = distance * 2;

	// Convert to vw units
	const diameterVw = (diameterPx / window.innerWidth) * 100;

	// Apply minimum size of 5vw
	const minSizeVw = 5;
	const finalSizeVw = Math.max(diameterVw, minSizeVw);

	// Set the circle size
	document.documentElement.style.setProperty('--circle-size', `${finalSizeVw}vw`);
}

function setRandomCircleSize() {
	const minSize = 10;
	const maxSize = 40;
	const randomSize = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
	document.documentElement.style.setProperty('--circle-size', `${randomSize}vw`);
}

// Closer viewers make bigger circles. Face width as a share of the camera frame
// maps from FACE_FAR (5vw circle) to FACE_NEAR (120vw circle); tune both on the install camera.
const FACE_FAR = 0.08;
const FACE_NEAR = 0.5;
let smoothedFaceShare = null;

// faceMeshReady keeps downloading while the camera starts and the viewer answers the permission prompt
async function startFaceDistance(faceMeshReady) {
	if (!faceMeshReady || !navigator.mediaDevices) return;

	// never added to the page, so the DOM counter only counts the piece
	const video = document.createElement('video');
	video.muted = true;
	video.playsInline = true;
	try {
		video.srcObject = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: { facingMode: 'user' }
		});
		await video.play();
	} catch (error) {
		console.warn('Camera unavailable, circle size stays on click:', error);
		return;
	}
	video.width = video.videoWidth;
	video.height = video.videoHeight;

	const faceMesh = await faceMeshReady;
	faceMesh.detectStart(video, (faces) => {
		if (faces.length === 0) return;
		if (smoothedFaceShare === null) {
			console.log('first face size', Math.round(performance.now()), 'ms after page load');
		}
		const share = faces[0].box.width / video.width;
		smoothedFaceShare =
			smoothedFaceShare === null ? share : smoothedFaceShare + (share - smoothedFaceShare) * 0.2;
		const closeness = Math.min(
			Math.max((smoothedFaceShare - FACE_FAR) / (FACE_NEAR - FACE_FAR), 0),
			1
		);
		document.documentElement.style.setProperty(
			'--circle-size',
			`${(5 + closeness * 115).toFixed(1)}vw`
		);
	});
}

document.addEventListener('DOMContentLoaded', async function () {
	const main = document.querySelector('main');
	main.innerHTML = '';

	function calculateCurrentSize() {
		const currentHTML = document.documentElement.outerHTML;
		const bytes = new TextEncoder().encode(currentHTML).length;
		const kilobytes = (bytes / 1024).toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
		document.getElementById('filesize').textContent = `DOM: ${kilobytes} KB`;
	}

	let lineCount = 20;

	function updateCodeLines() {
		const codeLinesElement = document.getElementById('codelines');
		codeLinesElement.textContent = `Lines: ${lineCount}`;
	}

	function addLineText(type) {
		const lineDiv = document.querySelector('.line');
		const lineText = document.createElement('div');
		lineText.textContent = `<div class="${type}"></div>`;
		lineDiv.appendChild(lineText);
	}

	// Function to add elements
	function startAccumulation() {
		// First circle after 1s
		setTimeout(() => {
			const circle = document.createElement('div');
			circle.className = 'circle';
			main.appendChild(circle);
			calculateCurrentSize();
			lineCount += 2;
			updateCodeLines();
			addLineText('circle');

			// First canvas after another 1s
			setTimeout(() => {
				const canvas = document.createElement('div');
				canvas.className = 'canvas';
				main.appendChild(canvas);
				calculateCurrentSize();
				lineCount += 2;
				updateCodeLines();
				addLineText('canvas');

				// Start the alternating pattern every 1s
				let isCanvas = false;
				setInterval(() => {
					const element = document.createElement('div');
					const className = isCanvas ? 'canvas' : 'circle';
					element.className = className;
					main.appendChild(element);
					calculateCurrentSize();
					lineCount += 2;
					updateCodeLines();
					addLineText(className);
					isCanvas = !isCanvas;
				}, 1000);
			}, 1000);
		}, 1000);
	}

	// Initial color scheme
	applyColorScheme(colorIndex);

	// On every click, change color scheme and circle size
	document.addEventListener('click', (event) => {
		setNextColorScheme();
		setCircleSizeFromDistance(event);
	});

	calculateCurrentSize();
	updateCodeLines();

	const faceMeshReady = typeof ml5 === 'undefined' ? null : ml5.faceMesh({ maxFaces: 1 });
	startFaceDistance(faceMeshReady);
	// like the other camera pieces, nothing appears until the tracking model is ready
	await faceMeshReady?.catch(() => {});
	startAccumulation();
});
