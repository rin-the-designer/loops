let weight = 100;
let direction = 1; // 1 for increasing, -1 for decreasing
const minWeight = 100;
const maxWeight = 500;
const step = 2; // Adjust for speed/smoothness

function animateWeight() {
	weight += direction * step;
	if (weight >= maxWeight) {
		weight = maxWeight;
		direction = -1;
	} else if (weight <= minWeight) {
		weight = minWeight;
		direction = 1;
	}
	const title = document.querySelector('.title');
	if (title) {
		title.style.fontVariationSettings = `'wght' ${weight}`;
	}
	requestAnimationFrame(animateWeight);
}

document.addEventListener('DOMContentLoaded', animateWeight);

const sections = [
	{ id: 'familiar', file: 'the-familiar.txt' },
	{ id: 'ripple', file: 'the-ripple.txt' },
	{ id: 'spiral', file: 'the-spiral.txt' },
	{ id: 'acceptance', file: 'the-accpetance.txt' }, // fix filename if needed
	{ id: 'continuance', file: 'the-continuance.txt' }
];

function textToParagraphs(text) {
	return text
		.split(/\r?\n/) // split on every line break (handles both \n and \r\n)
		.map((line) => line.trim())
		.filter((line) => line.length > 0) // remove empty lines
		.map((line) => `<p>${line}</p>`)
		.join('');
}

window.addEventListener('DOMContentLoaded', () => {
	sections.forEach(({ id, file }) => {
		fetch(file)
			.then((res) => res.text())
			.then((text) => {
				document.getElementById(id).innerHTML = textToParagraphs(text);
			});
	});
});
