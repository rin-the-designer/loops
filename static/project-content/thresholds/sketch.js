let angle = 0;
let numPeople = 1; // Default value for no poses detected

// Size parameters
let diameterBase = 3; // Controls base size (higher = smaller circles)

// Core variables
let video;
let bodyPose;
let poses = [];

// Movement configuration
let circleMovements = [];
const MOVEMENT_DURATION = 4000; // 4 seconds for the full sequence
const MOVEMENT_OFFSET = 0.2; // 20% offset

// Movement sequence timing (ms)
const PHASE_1_DURATION = 500; // To -20%
const PHASE_2_DURATION = 1000; // From -20% to +20%
const PHASE_3_DURATION = 1000; // From +20% to -20%
const PHASE_4_DURATION = 1000; // From -20% to +20%
const PHASE_5_DURATION = 500; // Back to start

// Pose tracking configuration
let movementHistory = [];
const HISTORY_DURATION = 500; // Movement track interval
const MIN_CONFIDENCE = 0.2;

// Individual circle rotation
let rotationAngles = [];

// Debug logging
let frameCounter = 0;
const LOG_INTERVAL = 20;

function preload() {
	bodyPose = ml5.bodyPose({ minPoseScore: 0.3, flipped: true });
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(60);

	video = createCapture(VIDEO, { flipped: true });
	video.size(windowWidth, windowHeight);
	video.hide();
	bodyPose.detectStart(video, gotPoses);
}

// Calculate sizes based on current state
function calculateSizes() {
	return {
		whiteDiameter: width / diameterBase / numPeople,
		orangeDiameter: width / diameterBase / numPeople / 5,
		strokeBase: width / 50 / numPeople
	};
}

// Calculate circle position
function calculateCirclePosition(index, angle) {
	const xPos = (width / 2 / numPeople) * (2 * index + 1);
	const sizes = calculateSizes();
	const radius = sizes.whiteDiameter / 2;

	return {
		center: { x: xPos, y: height / 2 },
		orbit: {
			x: xPos + cos(angle) * radius,
			y: height / 2 + sin(angle) * radius
		},
		radius: radius
	};
}

function draw() {
	background(0);

	// Update numPeople based on pose detection
	if (poses.length > 0) {
		numPeople = poses.length;
	} else {
		numPeople = 1;
	}

	// Increment frame counter for logging
	frameCounter = (frameCounter + 1) % LOG_INTERVAL;

	// Initialize arrays for each person
	ensureArraySizes();

	// Process movements if poses detected
	if (poses.length > 0) {
		trackMovements();
		checkMovementThresholds();
	}

	// Update global angle
	angle += 1;

	// Draw circles for each person
	const sizes = calculateSizes();

	for (let i = 0; i < numPeople; i++) {
		const positions = calculateCirclePosition(i, rotationAngles[i]);
		const movement = circleMovements[i];

		// White circle
		fill(0);
		stroke(255);
		strokeWeight(sizes.strokeBase);
		circle(positions.center.x, positions.center.y, sizes.whiteDiameter);

		// Update rotation if not paused
		if (!movement.rotationPaused) {
			rotationAngles[i] += 1;
		}

		// Calculate orange circle position with movement if active
		let orangePos = { x: positions.orbit.x, y: positions.orbit.y };

		if (movement.active) {
			orangePos = calculateMovementPosition(movement, positions.radius);
		}

		// Orange circle
		fill(255, 136, 0);
		noStroke();
		circle(orangePos.x, orangePos.y, sizes.orangeDiameter);
	}
}

// Calculate position during movement sequence
function calculateMovementPosition(movement, radius) {
	const elapsedTime = millis() - movement.startTime;
	const start = movement.startPosition;
	let x = start.x;
	let y = start.y;

	// Phase 1: To -20%
	if (elapsedTime <= PHASE_1_DURATION) {
		const progress = smoothStep(elapsedTime / PHASE_1_DURATION);
		if (movement.moveType === 'x') {
			x = start.x - MOVEMENT_OFFSET * radius * progress;
		} else {
			y = start.y - MOVEMENT_OFFSET * radius * progress;
		}
	}
	// Phase 2: -20% to +20%
	else if (elapsedTime <= PHASE_1_DURATION + PHASE_2_DURATION) {
		const progress = smoothStep((elapsedTime - PHASE_1_DURATION) / PHASE_2_DURATION);
		if (movement.moveType === 'x') {
			x = start.x - MOVEMENT_OFFSET * radius + 2 * MOVEMENT_OFFSET * radius * progress;
		} else {
			y = start.y - MOVEMENT_OFFSET * radius + 2 * MOVEMENT_OFFSET * radius * progress;
		}
	}
	// Phase 3: +20% to -20%
	else if (elapsedTime <= PHASE_1_DURATION + PHASE_2_DURATION + PHASE_3_DURATION) {
		const progress = smoothStep(
			(elapsedTime - PHASE_1_DURATION - PHASE_2_DURATION) / PHASE_3_DURATION
		);
		if (movement.moveType === 'x') {
			x = start.x + MOVEMENT_OFFSET * radius - 2 * MOVEMENT_OFFSET * radius * progress;
		} else {
			y = start.y + MOVEMENT_OFFSET * radius - 2 * MOVEMENT_OFFSET * radius * progress;
		}
	}
	// Phase 4: -20% to +20%
	else if (
		elapsedTime <=
		PHASE_1_DURATION + PHASE_2_DURATION + PHASE_3_DURATION + PHASE_4_DURATION
	) {
		const progress = smoothStep(
			(elapsedTime - PHASE_1_DURATION - PHASE_2_DURATION - PHASE_3_DURATION) / PHASE_4_DURATION
		);
		if (movement.moveType === 'x') {
			x = start.x - MOVEMENT_OFFSET * radius + 2 * MOVEMENT_OFFSET * radius * progress;
		} else {
			y = start.y - MOVEMENT_OFFSET * radius + 2 * MOVEMENT_OFFSET * radius * progress;
		}
	}
	// Phase 5: Back to starting position
	else if (elapsedTime <= MOVEMENT_DURATION) {
		const progress = smoothStep(
			(elapsedTime - PHASE_1_DURATION - PHASE_2_DURATION - PHASE_3_DURATION - PHASE_4_DURATION) /
				PHASE_5_DURATION
		);
		if (movement.moveType === 'x') {
			x = start.x + MOVEMENT_OFFSET * radius - MOVEMENT_OFFSET * radius * progress;
		} else {
			y = start.y + MOVEMENT_OFFSET * radius - MOVEMENT_OFFSET * radius * progress;
		}
	}
	// End sequence
	else {
		movement.active = false;
		movement.rotationPaused = false;
	}

	return { x, y };
}

// Ensure all arrays are properly sized
function ensureArraySizes() {
	while (circleMovements.length < numPeople) {
		circleMovements.push({
			xOffset: 0,
			yOffset: 0,
			startPosition: { x: 0, y: 0 },
			active: false,
			rotationPaused: false,
			startTime: 0,
			moveType: null
		});
	}

	while (movementHistory.length < numPeople) {
		movementHistory.push({
			rightWristPositions: [],
			leftWristPositions: [],
			rightShoulderPositions: [],
			leftShoulderPositions: []
		});
	}

	while (rotationAngles.length < numPeople) {
		rotationAngles.push(angle);
	}
}

// Smoothing function for transitions
function smoothStep(x) {
	return x * x * (3 - 2 * x);
}

function trackMovements() {
	const currentTime = millis();

	// Save movement history for each person
	for (let i = 0; i < poses.length; i++) {
		const person = poses[i];
		const history = movementHistory[i];

		if (!person) continue;

		// Record keypoint positions
		recordKeypoint(history.rightWristPositions, person.right_wrist, currentTime);
		recordKeypoint(history.leftWristPositions, person.left_wrist, currentTime);
		recordKeypoint(history.rightShoulderPositions, person.right_shoulder, currentTime);
		recordKeypoint(history.leftShoulderPositions, person.left_shoulder, currentTime);

		// Remove old positions
		const removeOld = (pos) => currentTime - pos.time <= HISTORY_DURATION;
		history.rightWristPositions = history.rightWristPositions.filter(removeOld);
		history.leftWristPositions = history.leftWristPositions.filter(removeOld);
		history.rightShoulderPositions = history.rightShoulderPositions.filter(removeOld);
		history.leftShoulderPositions = history.leftShoulderPositions.filter(removeOld);
	}
}

// Record a keypoint position if confidence is high enough
function recordKeypoint(array, keypoint, time) {
	if (keypoint && keypoint.confidence > MIN_CONFIDENCE) {
		array.push({
			x: keypoint.x,
			y: keypoint.y,
			time: time
		});
	}
}

function checkMovementThresholds() {
	const sizes = calculateSizes();
	const radius = sizes.whiteDiameter / 2;

	// Check movement for each person
	for (let i = 0; i < poses.length && i < movementHistory.length; i++) {
		// Skip if animation already active
		if (i >= circleMovements.length || circleMovements[i].active) continue;

		const history = movementHistory[i];

		// Check wrist movements
		checkWristMovement(i, history, 'right');
		checkWristMovement(i, history, 'left');
	}
}

// Check movement for a specific wrist
function checkWristMovement(personIndex, history, side) {
	const wristArray = side === 'right' ? history.rightWristPositions : history.leftWristPositions;
	const shoulderArray =
		side === 'right' ? history.rightShoulderPositions : history.leftShoulderPositions;

	// Need at least two points to measure movement
	if (wristArray.length < 2 || shoulderArray.length < 2) return;

	const latestWrist = wristArray[wristArray.length - 1];
	const latestShoulder = shoulderArray[shoulderArray.length - 1];
	const oldestWrist = wristArray[0];
	const oldestShoulder = shoulderArray[0];

	const currentDist = dist(latestWrist.x, latestWrist.y, latestShoulder.x, latestShoulder.y);
	const oldestDist = dist(oldestWrist.x, oldestWrist.y, oldestShoulder.x, oldestShoulder.y);

	const restingDist = dist(
		latestShoulder.x,
		latestShoulder.y,
		latestShoulder.x,
		latestShoulder.y + currentDist
	);

	const movementAmount = abs(currentDist - oldestDist);
	const threshold = restingDist * 0.3;

	// Log movement data
	if (frameCounter === 0) {
		print(
			`Person ${personIndex + 1} - ${side.charAt(0).toUpperCase() + side.slice(1)} Movement: ${movementAmount.toFixed(2)}, Threshold: ${threshold.toFixed(2)}`
		);
	}

	// Trigger movement if threshold exceeded
	if (movementAmount > threshold) {
		print(`Person ${personIndex + 1} - ${side.toUpperCase()} WRIST MOVEMENT DETECTED!`);

		const positions = calculateCirclePosition(personIndex, rotationAngles[personIndex]);

		// Start movement sequence
		circleMovements[personIndex].active = true;
		circleMovements[personIndex].rotationPaused = true;
		circleMovements[personIndex].startTime = millis();
		circleMovements[personIndex].startPosition = { x: positions.orbit.x, y: positions.orbit.y };
		circleMovements[personIndex].moveType = side === 'right' ? 'x' : 'y';
	}
}

function gotPoses(results) {
	poses = results;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
