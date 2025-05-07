let multiplier;
let coffeeMakerY;
let coffeeMakerZ;
let coffeeMakerW;
let coffeeMakerH;
let coffeeMakerD;
let component1W;
let component1H;
let component1D;
let component2W;
let component2H;
let component2D;
let component3R;
let component3H;
let cupR;
let cupH;
let rotationAngle = 0;

// For body pose detection
let video;
let bodyPose;
let poses = [];
let targetX;
let cameraRotation = 0;
let isVisible = false;

function preload() {
	bodyPose = ml5.bodyPose({ flipped: true });
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	noStroke();
	angleMode(DEGREES);
	multiplier = windowHeight / (2 * 500);

	// Update all dimensions with new multiplier
	coffeeMakerY = 300 * multiplier;
	coffeeMakerZ = 0 * multiplier;
	coffeeMakerW = 120 * multiplier;
	coffeeMakerH = 240 * multiplier;
	coffeeMakerD = 180 * multiplier;
	component1W = 120 * multiplier;
	component1H = 80 * multiplier;
	component1D = 50 * multiplier;
	component2W = 120 * multiplier;
	component2H = 40 * multiplier;
	component2D = 50 * multiplier;
	component3R = 15 * multiplier;
	component3H = 30 * multiplier;
	cupR = 25 * multiplier;
	cupH = 50 * multiplier;

	// Set up intersection observer
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				isVisible = entry.isIntersecting;
				if (isVisible) {
					// Start camera when visible
					if (!video) {
						video = createCapture(VIDEO, { flipped: true });
						video.size(width, height);
						video.hide();
						bodyPose.detectStart(video, gotPoses);
					}
				} else {
					// Stop camera when not visible
					if (video) {
						video.remove();
						video = null;
						bodyPose.detectStop();
					}
				}
			});
		},
		{ threshold: 0.5 }
	); // Trigger when 50% of the iframe is visible

	// Start observing the iframe
	observer.observe(document.querySelector('main'));
}

function gotPoses(results) {
	poses = results;
}

function updateCameraRotation() {
	if (!isVisible || !poses.length) return;

	let facePose = poses[0];
	let validPoints = 0;
	let sum = 0;

	// Using direct property access which is more reliable
	const faceKeypoints = [
		facePose.nose,
		facePose.left_eye,
		facePose.right_eye,
		facePose.left_ear,
		facePose.right_ear
	];

	// Average facial keypoints
	for (let i = 0; i < faceKeypoints.length; i++) {
		if (faceKeypoints[i] && faceKeypoints[i].confidence > 0.3) {
			sum += faceKeypoints[i].x;
			validPoints++;
		}
	}

	if (validPoints > 0) {
		// Calculate normalized position (-1 to 1)
		let normalizedX = (sum / validPoints / width) * 2 - 1;
		// Map to rotation angle (30 to -30 degrees, inverted)
		let targetRotation = map(normalizedX, -1, 1, 30, -30);
		// Smoothly transition to new rotation
		cameraRotation = lerp(cameraRotation, targetRotation, 0.1);
	}
}

function drawCelestialBodies() {
	// Calculate rotation speed: 360 degrees / 30 seconds = 12 degrees per second
	rotationAngle += 12 / 60; // 12 degrees per second, divided by 60 for per frame

	push();
	translate(0, height / 2);
	rotate(rotationAngle);

	// Sun
	push();
	translate(-width / 2, 0);
	fill(255, 136, 0);
	circle(0, 0, width / 5);
	pop();

	// Moon
	push();
	translate(width / 2, 0);
	fill(255);
	circle(0, 0, width / 5);
	pop();

	pop();
}

function draw() {
	// Calculate background color based on rotation angle
	// Use sine to create smooth transition between white (90°) and black (270°)
	let bgColor = map(sin(rotationAngle), -1, 1, 0, 255);
	background(bgColor);

	updateCameraRotation();

	// Apply camera rotation
	rotateY(cameraRotation);

	//lights();
	// orbitControl(1, 0, 0);

	push();
	fill(15);
	lights();
	translate(0, coffeeMakerY, coffeeMakerZ);
	box(coffeeMakerW, coffeeMakerH, coffeeMakerD);
	pop();

	// Draw Component 1
	push();
	fill(15);
	lights();
	translate(
		0,
		coffeeMakerY - coffeeMakerH / 2 + component1H / 2,
		coffeeMakerZ + coffeeMakerD / 2 + component1D / 2
	);
	box(component1W, component1H, component1D);
	pop();

	push();
	fill(15);
	lights();
	translate(
		0,
		coffeeMakerY + coffeeMakerH / 2 - component2H / 2,
		coffeeMakerZ + coffeeMakerD / 2 + component2D / 2
	);
	box(component2W, component2H, component2D);
	pop();

	push();
	fill(125);
	lights();
	translate(
		0,
		coffeeMakerY - coffeeMakerH / 2 + component1H + component3H / 2,
		coffeeMakerZ + coffeeMakerD / 2 + component1D / 2
	);
	cylinder(component3R, component3H);
	pop();

	// Coffee stream
	// Show between 0-30 degrees and 90-120 degrees
	if (
		(rotationAngle % 360 >= 0 && rotationAngle % 360 <= 30) ||
		(rotationAngle % 360 >= 90 && rotationAngle % 360 <= 120)
	) {
		push();
		fill(139, 69, 19); // Brown color
		lights();
		let pourProgress;
		if (rotationAngle % 360 <= 30) {
			pourProgress = (rotationAngle % 360) / 30;
		} else {
			pourProgress = ((rotationAngle % 360) - 90) / 30;
		}
		translate(
			0,
			coffeeMakerY - coffeeMakerH / 2 + component1H + component3H + cupH * pourProgress,
			coffeeMakerZ + coffeeMakerD / 2 + component1D / 2
		);
		cylinder(component3R / 6, cupH, 24, 1, false, false);
		pop();
	}

	// Cup fixed on machine
	push();
	fill(255);
	lights();
	translate(
		0,
		coffeeMakerY + coffeeMakerH / 2 - component2H - cupH / 2,
		coffeeMakerZ + coffeeMakerD / 2 + component1D / 2
	);
	cylinder(cupR, cupH, 24, 1, true, false);
	pop();

	drawCelestialBodies();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
