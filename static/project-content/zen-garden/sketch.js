let strokeW,
	gap,
	patterns = [],
	currentY = 0;
let speedFactor = 720; // Lower number = Faster Speed
const arcSizes = [8, 4, 0.5];

// Fade and reset variables
let completionTime = null,
	isFading = false,
	resetTime = null;
const waitDuration = 3000;
const fadeInDuration = 3000;
const restartWaitDuration = 3000;

function setup() {
	createCanvas(windowWidth, windowHeight);
	strokeW = windowHeight / 37;
	gap = strokeW * 2;
	strokeWeight(strokeW);
	strokeCap(ROUND);
	angleMode(DEGREES);
	noFill();
	stroke(0);
	patterns.push({ travelDistance: 0, lineRightX: 0, yOffset: currentY, isFirst: true });
}

function drawArcs(x, y, startAngle, endAngle) {
	for (let i = 0; i < arcSizes.length; i++) {
		push();
		strokeWeight(i === 2 ? strokeW / 2 : strokeW);
		arc(x, y, strokeW * arcSizes[i], strokeW * arcSizes[i], startAngle, endAngle);
		pop();
	}
}

function drawLines(x1, y1, x2, y2, yOffset) {
	for (let i = 0; i < 3; i++) {
		line(x1, y1 + gap * i + yOffset, x2, y2 + gap * i + yOffset);
	}
}

function getWhiteRectAlpha() {
	if (!completionTime) return 0;
	let elapsed = millis() - completionTime;
	if (elapsed < waitDuration) return 0;
	let fadeElapsed = elapsed - waitDuration;
	return fadeElapsed >= fadeInDuration ? 255 : map(fadeElapsed, 0, fadeInDuration, 0, 255);
}

function resetAnimation() {
	patterns = [];
	currentY = 0;
	completionTime = null;
	isFading = false;
	resetTime = null;
	stroke(0);
	patterns.push({ travelDistance: 0, lineRightX: 0, yOffset: currentY, isFirst: true });
}

function drawArcR(travelDist, startDist, turnDist, endPointRight, yOffset) {
	let arcEnd = startDist + turnDist;
	let centerY = strokeW / 2 + gap * 2 + yOffset;
	if (travelDist >= startDist && travelDist <= arcEnd) {
		let arcAngle = map((travelDist - startDist) / turnDist, 0, 1, -90, 90);
		drawArcs(endPointRight, centerY, -90, min(arcAngle, 90));
	} else if (travelDist >= arcEnd) {
		drawArcs(endPointRight, centerY, -90, 90);
	}
	return arcEnd;
}

function drawArcL(travelDist, startDist, turnDist, endPointLeft, yOffset) {
	let arcEnd = startDist + turnDist;
	let centerY = strokeW / 2 + gap * 4 + yOffset;
	if (travelDist >= startDist && travelDist <= arcEnd) {
		let arcAngle = map((travelDist - startDist) / turnDist, 0, 1, 270, 90);
		drawArcs(endPointLeft, centerY, max(arcAngle, 90), 270);
	} else if (travelDist >= arcEnd) {
		drawArcs(endPointLeft, centerY, 90, 270);
	}
	return arcEnd;
}

function drawLineRL(travelDist, startDist, lineDist, endPointRight, endPointLeft, yOffset) {
	let lineEnd = startDist + lineDist;
	let baseY = strokeW / 2 + gap * 2 + yOffset;
	if (travelDist >= startDist && travelDist <= lineEnd) {
		let currentX = endPointRight - ((travelDist - startDist) / lineDist) * lineDist;
		drawLines(endPointRight, baseY, max(endPointLeft, currentX), baseY, 0);
	} else if (travelDist >= lineEnd) {
		drawLines(endPointRight, baseY, endPointLeft, baseY, 0);
	}
	return lineEnd;
}

function drawLineLR(travelDist, startDist, lineDist, endPointLeft, endPointRight, yOffset) {
	let lineEnd = startDist + lineDist;
	let baseY = strokeW / 2 + gap * 4 + yOffset;
	if (travelDist >= startDist && travelDist <= lineEnd) {
		let currentX = endPointLeft + ((travelDist - startDist) / lineDist) * lineDist;
		drawLines(endPointLeft, baseY, min(endPointRight, currentX), baseY, 0);
	} else if (travelDist >= lineEnd) {
		drawLines(endPointLeft, baseY, endPointRight, baseY, 0);
	}
	return lineEnd;
}

function drawLastLine(travelDist, startDist, lineDist, endPointLeft, windowWidth, yOffset) {
	let lineEnd = startDist + lineDist;
	let baseY = strokeW / 2 + gap * 4 + yOffset;
	if (travelDist >= startDist && travelDist <= lineEnd) {
		let currentX = endPointLeft + ((travelDist - startDist) / lineDist) * lineDist;
		drawLines(endPointLeft, baseY, min(windowWidth, currentX), baseY, 0);
	} else if (travelDist >= lineEnd) {
		drawLines(endPointLeft, baseY, windowWidth, baseY, 0);
	}
	return lineEnd;
}

function drawCompleteCycle(
	travelDist,
	startDist,
	turnDist,
	lineDist,
	endPointRight,
	endPointLeft,
	yOffset
) {
	let dist = drawArcR(travelDist, startDist, turnDist, endPointRight, yOffset);
	dist = drawLineRL(travelDist, dist, lineDist, endPointRight, endPointLeft, yOffset);
	dist = drawArcL(travelDist, dist, turnDist, endPointLeft, yOffset);
	return drawLineLR(travelDist, dist, lineDist, endPointLeft, endPointRight, yOffset);
}

function drawIncompleteCycle(
	travelDist,
	startDist,
	turnDist,
	lineDist,
	endPointRight,
	endPointLeft,
	yOffset
) {
	let dist = drawArcR(travelDist, startDist, turnDist, endPointRight, yOffset);
	dist = drawLineRL(travelDist, dist, lineDist, endPointRight, endPointLeft, yOffset);
	return drawArcL(travelDist, dist, turnDist, endPointLeft, yOffset);
}

function draw() {
	background(255);
	let endPointRight = width - strokeW * 4.5;
	let endPointLeft = strokeW * 4.5;
	let speed = width / speedFactor;
	let turnDistance = speed * 180;
	let lineDistance = endPointRight - endPointLeft;
	const numCompleteCycles = 3;
	let cycleDistance = 2 * turnDistance + 2 * lineDistance;
	let incompleteCycleDistance = turnDistance + lineDistance + turnDistance;

	// Check if fade completes, clear patterns and set resetTime
	if (completionTime && !resetTime) {
		if (millis() - completionTime >= waitDuration + fadeInDuration) {
			patterns = [];
			resetTime = millis();
		}
	}

	// Check if restart wait is complete, then reset and restart
	if (resetTime && millis() - resetTime >= restartWaitDuration) {
		resetAnimation();
		return;
	}

	// Update patterns (only if not fading and not in restart wait)
	if (patterns.length > 0 && !isFading && !resetTime) {
		let currentPattern = patterns[patterns.length - 1];
		currentPattern.travelDistance += speed;

		let firstLineDistance = currentPattern.isFirst ? endPointRight : 0;
		let lastLineDistance = width - endPointLeft;
		let patternCompleteDistance =
			firstLineDistance +
			numCompleteCycles * cycleDistance +
			incompleteCycleDistance +
			lastLineDistance;

		// Check if first pattern's last line is complete
		if (patterns.length === 1 && patterns[0].isFirst && !completionTime) {
			let lastLineStart =
				firstLineDistance + numCompleteCycles * cycleDistance + incompleteCycleDistance;
			if (patterns[0].travelDistance >= lastLineStart + lastLineDistance) {
				completionTime = millis();
				isFading = true;
			}
		}

		// Add new pattern if current completes
		if (currentPattern.travelDistance >= patternCompleteDistance) {
			currentY += gap * 4;
			patterns.push({
				travelDistance: endPointRight,
				lineRightX: endPointRight,
				yOffset: currentY,
				isFirst: false
			});
		}
	}

	// Draw all patterns
	for (let pattern of patterns) {
		let firstLineDistance = pattern.isFirst ? endPointRight : 0;
		let baseYOffset = pattern.yOffset;

		// Draw first line (only for first pattern)
		if (pattern.isFirst) {
			if (pattern.travelDistance <= endPointRight) {
				pattern.lineRightX += speed;
				drawLines(0, strokeW / 2, min(pattern.lineRightX, endPointRight), strokeW / 2, baseYOffset);
			} else {
				drawLines(0, strokeW / 2, endPointRight, strokeW / 2, baseYOffset);
			}
		}

		// Draw 3 complete cycles
		for (let cycle = 0; cycle < numCompleteCycles; cycle++) {
			drawCompleteCycle(
				pattern.travelDistance,
				firstLineDistance + cycle * cycleDistance,
				turnDistance,
				lineDistance,
				endPointRight,
				endPointLeft,
				baseYOffset + cycle * gap * 4
			);
		}

		// Draw incomplete 4th cycle
		let incompleteCycleYOffset = baseYOffset + numCompleteCycles * gap * 4;
		let incompleteStartDist = firstLineDistance + numCompleteCycles * cycleDistance;
		drawIncompleteCycle(
			pattern.travelDistance,
			incompleteStartDist,
			turnDistance,
			lineDistance,
			endPointRight,
			endPointLeft,
			incompleteCycleYOffset
		);

		// Draw Last Line
		drawLastLine(
			pattern.travelDistance,
			incompleteStartDist + incompleteCycleDistance,
			width - endPointLeft,
			endPointLeft,
			width,
			incompleteCycleYOffset
		);
	}

	// Draw white rectangle overlay when fading in
	if (isFading && completionTime) {
		let elapsed = millis() - completionTime;
		if (elapsed < waitDuration + fadeInDuration) {
			let rectAlpha = getWhiteRectAlpha();
			if (rectAlpha > 0) {
				push();
				fill(255, rectAlpha);
				noStroke();
				rect(0, 0, width, height);
				pop();
			}
		}
	}

	// Draw white screen during restart wait period
	if (resetTime) {
		push();
		fill(255);
		noStroke();
		rect(0, 0, width, height);
		pop();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	strokeW = windowHeight / 37;
	gap = strokeW * 2;
	strokeWeight(strokeW);
}
