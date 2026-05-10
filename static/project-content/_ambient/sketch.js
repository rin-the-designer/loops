// Ambient loop: slowly evolving concentric rings
// Minimal, meditative, runs indefinitely without memory leaks

let rings = [];
const MAX_RINGS = 12;
let time = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noFill();
	strokeWeight(1);
}

function draw() {
	background(0, 12);
	translate(width / 2, height / 2);

	time += 0.003;

	// Draw concentric rings with slowly shifting radii
	for (let i = 0; i < MAX_RINGS; i++) {
		let baseRadius = map(i, 0, MAX_RINGS, 50, min(width, height) * 0.42);
		let wobble = sin(time + i * 0.5) * 20 + cos(time * 0.7 + i * 0.3) * 15;
		let radius = baseRadius + wobble;

		let alpha = map(i, 0, MAX_RINGS, 60, 15);
		stroke(255, alpha);

		beginShape();
		for (let a = 0; a <= TWO_PI; a += 0.02) {
			let noise_val = noise(cos(a) * 0.5 + 1, sin(a) * 0.5 + 1, time + i * 0.1);
			let r = radius + noise_val * 30 - 15;
			let x = cos(a) * r;
			let y = sin(a) * r;
			vertex(x, y);
		}
		endShape(CLOSE);
	}

	// Slowly rotating central point
	let dotAlpha = map(sin(time * 2), -1, 1, 30, 100);
	fill(255, dotAlpha);
	noStroke();
	let dotSize = map(sin(time * 1.5), -1, 1, 3, 8);
	ellipse(0, 0, dotSize, dotSize);
	noFill();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
