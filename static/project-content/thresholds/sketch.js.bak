let numPeople = 2;
let angle = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
}

function draw() {
	background(0);
	let strokeBase = width / 30 / numPeople;

	// Calculate the radius of the white circle
	let radius = width / 2 / numPeople / 2;

	// Draw multiple circle groups based on numPeople
	for (let i = 0; i < numPeople; i++) {
		// Calculate x position: width/2/numPeople * (2i + 1)
		let xPos = (width / 2 / numPeople) * (2 * i + 1);

		// Draw white circle
		fill(0);
		stroke(255);
		strokeWeight(strokeBase);
		circle(xPos, height / 2, width / 2 / numPeople);

		// Calculate the position of the orange circle using trigonometry
		let x = xPos + cos(angle) * radius;
		let y = height / 2 + sin(angle) * radius;

		// Draw orange circle
		fill(255, 136, 0);
		noStroke();
		circle(x, y, width / 10 / numPeople);
	}

	// Increment the angle for rotation
	angle += 1;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
