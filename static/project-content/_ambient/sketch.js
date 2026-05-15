// Ambient loop: wandering thick white line with "The Loops." text
// Accumulative drawing — new segments cover old content on overlap
// Recent characters are redrawn each frame so the line doesn't cover them
// Cycle: draw for 1 min → pause & dissolve for 5s → renew

let ribbonText = 'The Loops. ';
let dotColor = '#ff8800';
let textSize_ = 48;
let speed = 1.5;
let charSpacing;
let strokeW;

// Ribbon head
let headX, headY;
let prevX, prevY;
let angle;
let turnSpeed = 0;
let targetTurn = 0;
let turnTimer = 0;

// Tracking
let distSinceLastChar = 0;
let charIndex = 0;

// Recent characters that need redrawing each frame
let recentChars = [];
let RECENT_COUNT = 5;

// Cycle timing
let phase = 'drawing'; // 'drawing' | 'dissolving'
let drawDuration = 60 * 60; // 1 minute at 60fps
let dissolveDuration = 5 * 60; // 5 seconds at 60fps
let phaseTimer = 0;
let dissolveOpacity = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	strokeW = textSize_ + 12;
	charSpacing = textSize_ * 0.7;

	textSize(textSize_);
	textAlign(CENTER, CENTER);

	resetRibbon();
	background(0);

	noLoop();
	document.fonts.ready.then(() => {
		textFont('Inter');
		loop();
	});
}

function resetRibbon() {
	headX = width / 2;
	headY = height / 2;
	prevX = headX;
	prevY = headY;
	angle = random(TWO_PI);
	turnSpeed = 0;
	targetTurn = 0;
	turnTimer = 0;
	distSinceLastChar = 0;
	charIndex = 0;
	recentChars = [];
}

function draw() {
	phaseTimer++;

	if (phase === 'drawing') {
		drawRibbon();

		if (phaseTimer >= drawDuration) {
			phase = 'dissolving';
			phaseTimer = 0;
			dissolveOpacity = 0;
		}
	} else if (phase === 'dissolving') {
		// Fade to black
		dissolveOpacity = map(phaseTimer, 0, dissolveDuration, 0, 255);
		fill(0, dissolveOpacity);
		noStroke();
		rect(0, 0, width, height);

		if (phaseTimer >= dissolveDuration) {
			// Renew
			phase = 'drawing';
			phaseTimer = 0;
			background(0);
			resetRibbon();
		}
	}
}

function drawRibbon() {
	// Update turn behavior
	turnTimer--;
	if (turnTimer <= 0) {
		targetTurn = random(-0.03, 0.03);
		turnTimer = floor(random(60, 200));
	}

	turnSpeed = lerp(turnSpeed, targetTurn, 0.05);
	angle += turnSpeed;

	prevX = headX;
	prevY = headY;

	// Steer away from edges
	let edgeMargin = strokeW * 0.5;
	let desiredX = 0, desiredY = 0;

	if (headX < edgeMargin) desiredX = 1;
	else if (headX > width - edgeMargin) desiredX = -1;

	if (headY < edgeMargin) desiredY = 1;
	else if (headY > height - edgeMargin) desiredY = -1;

	if (desiredX !== 0 || desiredY !== 0) {
		let desiredAngle = atan2(desiredY, desiredX);
		let diff = desiredAngle - angle;
		while (diff > PI) diff -= TWO_PI;
		while (diff < -PI) diff += TWO_PI;
		angle += diff * 0.08;
	}

	headX += cos(angle) * speed;
	headY += sin(angle) * speed;
	headX = constrain(headX, 0, width);
	headY = constrain(headY, 0, height);

	// Draw new white line segment
	stroke(255);
	strokeWeight(strokeW);
	strokeCap(ROUND);
	line(prevX, prevY, headX, headY);

	// Stamp character when enough distance traveled
	distSinceLastChar += dist(prevX, prevY, headX, headY);

	if (distSinceLastChar >= charSpacing) {
		distSinceLastChar = 0;

		let ch = ribbonText[charIndex % ribbonText.length];
		recentChars.push({ ch: ch, x: headX, y: headY, angle: angle });
		charIndex++;

		// Keep only recent chars in the redraw list
		if (recentChars.length > RECENT_COUNT) {
			recentChars.shift();
		}
	}

	// Redraw all recent characters on top of the line
	noStroke();
	for (let i = 0; i < recentChars.length; i++) {
		let s = recentChars[i];
		fill(s.ch === '.' ? dotColor : 0);
		push();
		translate(s.x, s.y);
		rotate(s.angle);
		text(s.ch, 0, 0);
		pop();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(0);
	resetRibbon();
	phase = 'drawing';
	phaseTimer = 0;
}
