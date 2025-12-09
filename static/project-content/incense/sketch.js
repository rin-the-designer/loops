let startY;
let burnProgress = 0;
let burnRate = 0.1;
let lastTime = 0;
let cycleStartTime = 0;
let particles = [];
let backgroundColor = '#ffffff';

// Cycle states: 'fadeInStick', 'fadeInTip', 'burning', 'waitAfterComplete'
let cycleState = 'fadeInStick';
let stickFadeDuration = 3;
let tipFadeDuration = 5;
let waitAfterCompleteDuration = 5;
let video;
let bodyPose;
let poses = [];
let targetX;

function preload() {
	bodyPose = ml5.bodyPose({ flipped: true });
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(backgroundColor);
	strokeCap(SQUARE);
	startY = height / 3;
	lastTime = millis();
	targetX = width / 2;

	video = createCapture({
		audio: false,
		video: {
			width: { ideal: windowWidth },
			height: { ideal: windowHeight },
			facingMode: 'user'
		},
		flipped: true
	});
	video.size(width, height);
	video.hide();
	bodyPose.detectStart(video, gotPoses);

	cycleStartTime = millis();
}

function draw() {
	let currentTime = millis();
	let cycleElapsed = (currentTime - cycleStartTime) / 1000;

	// Update cycle state (may reset cycleStartTime)
	updateCycleState(cycleElapsed, currentTime);

	// Recalculate cycleElapsed after state update in case cycleStartTime was reset
	cycleElapsed = (currentTime - cycleStartTime) / 1000;

	// Calculate fade opacity based on current state
	let fadeOpacity = 0;
	let stickOpacity = 0;
	let showStick = false;
	let showBurningTip = false;
	let showParticles = false;

	if (cycleState === 'fadeInStick') {
		// Fade in stick (3 seconds)
		stickOpacity = constrain(cycleElapsed / stickFadeDuration, 0, 1);
		showStick = true;
		showBurningTip = false;
		showParticles = false;
	} else if (cycleState === 'fadeInTip') {
		// Fade in orange tip and particles (5 seconds), stick already visible
		fadeOpacity = constrain(cycleElapsed / tipFadeDuration, 0, 1);
		showStick = true;
		stickOpacity = 1;
		showBurningTip = true;
		showParticles = true;
	} else if (cycleState === 'burning') {
		// Burning phase
		fadeOpacity = 1;
		showStick = true;
		stickOpacity = 1;
		showBurningTip = true;
		showParticles = true;

		// Update burn progress
		let deltaTime = (currentTime - lastTime) / 1000;
		burnProgress += (deltaTime / 60) * burnRate;
		burnProgress = constrain(burnProgress, 0, 1);
		lastTime = currentTime;
	} else if (cycleState === 'waitAfterComplete') {
		// Wait period - nothing visible
		showStick = false;
		showBurningTip = false;
		showParticles = false;
	}

	// Current tip position
	let stickLength = height - startY;
	let currentY = startY + burnProgress * stickLength;

	// Calculate average face position (keypoints 0-4)
	updateTargetPosition();

	// Redraw background
	background(backgroundColor);

	// Create new particles at the burning tip
	if (showParticles && burnProgress < 1) {
		for (let i = 0; i < 15; i++) {
			particles.push(new Particle(width / 2 + random(-4, 4), currentY - random(5, 10)));
		}
	}

	// Update and display particles (drawn first, so they appear behind the stick)
	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].update();
		particles[i].display(fadeOpacity);
		if (particles[i].isDead()) {
			particles.splice(i, 1);
		}
	}

	// Draw stick (drawn after particles, so it appears on top)
	if (showStick) {
		stroke(0, 0, 0, stickOpacity * 255);
		strokeWeight(10);
		line(width / 2, height, width / 2, currentY);

		// Burning part with fade-in animation
		if (showBurningTip) {
			stroke(255, 136, 0, fadeOpacity * 255);
			line(width / 2, currentY - 10, width / 2, currentY);
		}
	}
}

function updateCycleState(cycleElapsed, currentTime) {
	if (cycleState === 'fadeInStick') {
		if (cycleElapsed >= stickFadeDuration) {
			cycleState = 'fadeInTip';
			cycleStartTime = currentTime;
		}
	} else if (cycleState === 'fadeInTip') {
		if (cycleElapsed >= tipFadeDuration) {
			cycleState = 'burning';
			lastTime = currentTime;
		}
	} else if (cycleState === 'burning') {
		if (burnProgress >= 1) {
			cycleState = 'waitAfterComplete';
			cycleStartTime = currentTime;
		}
	} else if (cycleState === 'waitAfterComplete') {
		if (cycleElapsed >= waitAfterCompleteDuration) {
			// Restart cycle
			cycleState = 'fadeInStick';
			burnProgress = 0;
			particles = [];
			cycleStartTime = currentTime;
		}
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

	display(fadeOpacity = 1) {
		noStroke();
		let baseAlpha = this.lifespan * 0.05;
		fill(220, 220, 220, baseAlpha * fadeOpacity);
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
	if (video) {
		video.size(windowWidth, windowHeight);
	}
}
