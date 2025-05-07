let strokeW = 24;
let gap = strokeW * 2;
let patterns = [];
let currentY = 0;
let isFirstPattern = true;
let speedFactor = 720;

function setup() {
	createCanvas(windowWidth, windowHeight);
	strokeWeight(strokeW);
	strokeCap(ROUND);
	angleMode(DEGREES);
	noFill();

	// Add first pattern
	patterns.push({
		travelDistance: 0,
		lineRightX: 0,
		lineLeftX: 0,
		yOffset: currentY,
		isFirst: true
	});
}

function draw() {
	background(255);
	let endPointRight = width - strokeW * 4.5;
	let endPointLeft = strokeW * 4.5;
	let speed = width / speedFactor;
	let turnDistance = speed * 180;
	let lineDistance = endPointRight - endPointLeft;
	const arcSizes = [8, 4, 0.5];

	// Update the current pattern
	if (patterns.length > 0) {
		let currentPattern = patterns[patterns.length - 1];
		currentPattern.travelDistance += speed;

		// If current pattern completes, add a new pattern
		if (
			currentPattern.travelDistance >=
			endPointRight + turnDistance + lineDistance + turnDistance + lineDistance
		) {
			currentY += gap * 4;
			patterns.push({
				travelDistance: endPointRight, // Start from first arc position
				lineRightX: endPointRight,
				lineLeftX: endPointRight,
				yOffset: currentY,
				isFirst: false
			});
		}
	}

	// Remove patterns that are off screen
	if (patterns.length > 5) {
		patterns.shift();
	}

	// Draw all patterns
	for (let p = 0; p < patterns.length; p++) {
		let pattern = patterns[p];

		// Draw first line (only for first pattern)
		if (pattern.isFirst) {
			if (pattern.travelDistance >= 0 && pattern.travelDistance <= endPointRight) {
				pattern.lineRightX += speed;
				for (let i = 0; i < 3; i++) {
					line(
						0,
						strokeW / 2 + gap * i + pattern.yOffset,
						min(pattern.lineRightX, endPointRight),
						strokeW / 2 + gap * i + pattern.yOffset
					);
				}
			} else if (pattern.travelDistance >= endPointRight) {
				for (let i = 0; i < 3; i++) {
					line(
						0,
						strokeW / 2 + gap * i + pattern.yOffset,
						endPointRight,
						strokeW / 2 + gap * i + pattern.yOffset
					);
				}
			}
		}

		// Draw first arc (Arc Right)
		if (
			pattern.travelDistance >= endPointRight &&
			pattern.travelDistance <= endPointRight + turnDistance
		) {
			pattern.lineLeftX = endPointRight;

			let extraDistanceRight = pattern.travelDistance - endPointRight;
			let arcAngleRight = map(extraDistanceRight, 0, turnDistance, -90, 90);
			arcAngleRight = min(arcAngleRight, 90);

			for (let i = 0; i < arcSizes.length; i++) {
				push();
				strokeWeight(i === 2 ? strokeW / 2 : strokeW);
				arc(
					endPointRight,
					strokeW / 2 + gap * 2 + pattern.yOffset,
					strokeW * arcSizes[i],
					strokeW * arcSizes[i],
					-90,
					arcAngleRight
				);
				pop();
			}
		} else if (pattern.travelDistance >= endPointRight + turnDistance) {
			for (let i = 0; i < arcSizes.length; i++) {
				push();
				strokeWeight(i === 2 ? strokeW / 2 : strokeW);
				arc(
					endPointRight,
					strokeW / 2 + gap * 2 + pattern.yOffset,
					strokeW * arcSizes[i],
					strokeW * arcSizes[i],
					-90,
					90
				);
				pop();
			}
		}

		// Draw second line (Line Left)
		if (
			pattern.travelDistance >= endPointRight + turnDistance &&
			pattern.travelDistance <= endPointRight + turnDistance + lineDistance
		) {
			pattern.lineLeftX -= speed;
			for (let i = 0; i < 3; i++) {
				line(
					endPointRight,
					strokeW / 2 + gap * (i + 2) + pattern.yOffset,
					max(endPointLeft, pattern.lineLeftX),
					strokeW / 2 + gap * (i + 2) + pattern.yOffset
				);
			}
		} else if (pattern.travelDistance >= endPointRight + turnDistance + lineDistance) {
			for (let i = 0; i < 3; i++) {
				line(
					endPointRight,
					strokeW / 2 + gap * (i + 2) + pattern.yOffset,
					endPointLeft,
					strokeW / 2 + gap * (i + 2) + pattern.yOffset
				);
			}
		}

		// Draw second arc (Arc Left)
		if (
			pattern.travelDistance >= endPointRight + turnDistance + lineDistance &&
			pattern.travelDistance <= endPointRight + turnDistance + lineDistance + turnDistance
		) {
			pattern.lineRightX = endPointLeft;

			let extraDistanceLeft = pattern.travelDistance - endPointRight - turnDistance - lineDistance;
			let arcAngleLeft = map(extraDistanceLeft, 0, turnDistance, 270, 90);
			arcAngleLeft = max(arcAngleLeft, 90);

			for (let i = 0; i < arcSizes.length; i++) {
				push();
				strokeWeight(i === 2 ? strokeW / 2 : strokeW);
				arc(
					endPointLeft,
					strokeW / 2 + gap * 4 + pattern.yOffset,
					strokeW * arcSizes[i],
					strokeW * arcSizes[i],
					arcAngleLeft,
					270
				);
				pop();
			}
		} else if (
			pattern.travelDistance >=
			endPointRight + turnDistance + lineDistance + turnDistance
		) {
			for (let i = 0; i < arcSizes.length; i++) {
				push();
				strokeWeight(i === 2 ? strokeW / 2 : strokeW);
				arc(
					endPointLeft,
					strokeW / 2 + gap * 4 + pattern.yOffset,
					strokeW * arcSizes[i],
					strokeW * arcSizes[i],
					90,
					270
				);
				pop();
			}
		}

		// Draw third line (Line Right)
		if (
			pattern.travelDistance >= endPointRight + turnDistance + lineDistance + turnDistance &&
			pattern.travelDistance <=
				endPointRight + turnDistance + lineDistance + turnDistance + lineDistance
		) {
			pattern.lineRightX += speed;
			for (let i = 0; i < 3; i++) {
				line(
					endPointLeft,
					strokeW / 2 + gap * (i + 4) + pattern.yOffset,
					min(pattern.lineRightX, endPointRight),
					strokeW / 2 + gap * (i + 4) + pattern.yOffset
				);
			}
		} else if (
			pattern.travelDistance >=
			endPointRight + turnDistance + lineDistance + turnDistance + lineDistance
		) {
			for (let i = 0; i < 3; i++) {
				line(
					endPointLeft,
					strokeW / 2 + gap * (i + 4) + pattern.yOffset,
					endPointRight,
					strokeW / 2 + gap * (i + 4) + pattern.yOffset
				);
			}
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
