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

document.addEventListener('DOMContentLoaded', function () {
	const main = document.querySelector('main');
	main.innerHTML = '';

	function calculateCurrentSize() {
		const currentHTML = document.documentElement.outerHTML;
		const bytes = new TextEncoder().encode(currentHTML).length;
		const kilobytes = (bytes / 1024).toFixed(2);
		const filesizeElement = document.getElementById('filesize');
		const formattedKB = Number(kilobytes).toLocaleString();
		filesizeElement.textContent = `DOM: ${Number(formattedKB).toFixed(2)} KB`;
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

	startAccumulation();
});
