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

	calculateCurrentSize();
	updateCodeLines();

	startAccumulation();
});
