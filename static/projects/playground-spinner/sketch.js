let angle = 0;
let spinSpeed = 0;
let lastHandX = null;
let handPose;
let video;
let hands = [];
let colors = [
	['#FFFFFF', '#000000'],
	['#AD1717', '#D81D1D'],
	['#CC6D00', '#FF8800'],
	['#CCA600', '#FFD000'],
	['#70AA05', '#8CD406'],
	['#1B4AB6', '#225CE3'],
	['#AE1BB6', '#D922E3']
];
let colorIndex = 0;

function preload() {
	handPose = ml5.handPose({ maxHands: 1, flipped: true });
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);

	video = createCapture(VIDEO, { flipped: true });
	video.size(windowWidth, windowHeight);
	video.hide();
	handPose.detectStart(video, gotHands);
}

function draw() {
	//orbitControl();
	//lights();
	background(colors[colorIndex][1]);
	handleHandSwipe();
	rotateY(angle);
	scale(2);
	drawSpinner();
	angle -= spinSpeed;
	// Gradually slow down the spinner
	spinSpeed *= 0.99;
}

function handleHandSwipe() {
	if (hands.length > 0) {
		let hand = hands[0];
		let handPosition = hand.wrist;
		let handX = handPosition.x;
		// Change color when a hand first appears
		if (lastHandX === null && handX !== null) {
			let prevIndex = colorIndex;
			while (colorIndex === prevIndex) {
				colorIndex = floor(random(colors.length));
			}
		}
		if (lastHandX !== null) {
			let dx = handX - lastHandX;
			if (abs(dx) > 10) {
				// Always spin clockwise, regardless of direction
				spinSpeed = constrain(abs(dx) * 0.2, 0, 10);
			}
		}
		lastHandX = handX;
	} else {
		lastHandX = null;
	}
}

function drawSpinner() {
	fill(colors[colorIndex][0]);
	noStroke();

	// Draw base disk
	push();
	translate(0, 30, 0);
	rotateX(180);
	cylinder(120, 8, 48, 1); // disk
	pop();

	// Draw central pole
	push();
	cylinder(8, 100);
	pop();

	// Draw handles
	let numHandles = 6;
	let r = 110;
	for (let i = 0; i < numHandles; i++) {
		let theta = (360 / numHandles) * i;
		let x = r * cos(theta);
		let z = r * sin(theta);
		push();
		translate(x, -8, z);
		// vertical part
		cylinder(4, 80);
		// horizontal part: connect to center
		translate(0, -40, 0); // Move to top of post
		rotateY(-theta); // Rotate to face center
		rotateZ(90);
		translate(10, 60, 0); // Move so bar starts at post and points to center
		cylinder(4, 120); // Bar length to center
		pop();
	}
}

function gotHands(results) {
	hands = results;
}
