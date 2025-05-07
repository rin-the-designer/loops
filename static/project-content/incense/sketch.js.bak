let startY;
let burnProgress = 0;
let burnRate = 0.1;
let lastTime = 0;
let particles = [];
let colors = ['#FF8800', '#0F0F0F', '#000000'];

// For body pose detection
let video;
let bodyPose;
let poses = [];
let targetX;

function preload() {
	bodyPose = ml5.bodyPose({ flipped: true });
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(colors[1]);
	strokeCap(SQUARE);
	startY = height / 3;
	lastTime = millis();
	targetX = width / 2; // Default target is center

	video = createCapture(VIDEO, { flipped: true });
	video.size(width, height);
	video.hide();
	bodyPose.detectStart(video, gotPoses);
}

function draw() {
	// Elapsed time and update burn progress
	let currentTime = millis();
	let deltaTime = (currentTime - lastTime) / 1000;
	burnProgress += (deltaTime / 60) * burnRate;
	burnProgress = constrain(burnProgress, 0, 1);
	lastTime = currentTime;

	// Current tip position
	let stickLength = height - startY;
	let currentY = startY + burnProgress * stickLength;

	// Calculate average face position (keypoints 0-4)
	updateTargetPosition();

	// Redraw background and stick
	background(15);

	// Create new particles at the burning tip
	if (burnProgress < 1) {
		for (let i = 0; i < 15; i++) {
			particles.push(new Particle(width / 2 + random(-4, 4), currentY - random(5, 10)));
		}
	}

	// Update and display particles
	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].update();
		particles[i].display();
		if (particles[i].isDead()) {
			particles.splice(i, 1);
		}
	}

	// Draw stick
	if (burnProgress < 1) {
		stroke(colors[2]);
		strokeWeight(10);
		line(width / 2, height, width / 2, currentY);

		// Burning part
		stroke(colors[0]);
		line(width / 2, currentY, width / 2, currentY - 10);
	}
}

function updateTargetPosition() {
	if (poses.length > 0) {
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
			// Smoothly transition to new target position
			let newTarget = sum / validPoints;
			targetX = lerp(targetX, newTarget, 0.1);
		}
	}
}

class Particle {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = createVector(random(-0.2, 0.1), random(-3, -1.5));
		this.acc = createVector(0, 0);
		this.lifespan = 500;
		this.size = random(3, 7);
	}

	update() {
		// Calculate force toward target x position (from face detection)
		let targetPull = (targetX - this.pos.x) * 0.0002;
		this.acc = createVector(targetPull + random(-0.01, 0.01), random(-0.08, -0.02));

		this.vel.add(this.acc);
		this.vel.x = constrain(this.vel.x, -10, 10);
		this.pos.add(this.vel);
		this.lifespan -= 1.0;
	}

	display() {
		noStroke();
		fill(255, 255, 255, this.lifespan * 0.05);
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
	}

	isDead() {
		return this.lifespan <= 0;
	}
}

function gotPoses(results) {
	poses = results;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
