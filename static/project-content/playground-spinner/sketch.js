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
	//scale(2);
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
	let baseValue = width / 5;

	// Draw base disk
	push();
	translate(0, baseValue / 4, 0);
	rotateX(180);
	cylinder(baseValue, baseValue / 15, 48, 1);
	pop();

	// Draw central pole
	push();
	cylinder(baseValue / 15, (baseValue / 6) * 5);
	pop();

	// Draw handles
	let numHandles = 6;
	let r = (baseValue / 12) * 11;
	for (let i = 0; i < numHandles; i++) {
		let theta = (360 / numHandles) * i;
		let x = r * cos(theta);
		let z = r * sin(theta);
		push();
		translate(x, -baseValue / 15, z);
		// vertical part
		cylinder(baseValue / 30, (baseValue / 3) * 2);
		// horizontal part: connect to center
		translate(0, -baseValue / 3, 0);
		rotateY(-theta); // Rotate to face center
		rotateZ(90);
		translate(baseValue / 12, baseValue / 2, 0);
		cylinder(baseValue / 30, baseValue);
		pop();
	}
}

function gotHands(results) {
	hands = results;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
