let rock;
let gravity = 0.5;
let hill;
let direction = 1;
let isNewIteration = true;
let handPose;
let video;
let hands = [];
let smoothedHandX = null;
let smoothedHandY = null;
let handSmoothingFactor = 0.2;
let handBoundsInsetX = 0.08;
let handBoundsInsetY = 0.08;

function preload() {
	handPose = ml5.handPose({ maxHands: 1, flipped: true });
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	rock = {
		x: 0,
		y: windowHeight,
		radius: windowHeight / 10,
		velocity: 0,
		color: color(255, 136, 0)
	};
	updateHillConfiguration();
	noStroke();

	video = createCapture({
		audio: false,
		video: {
			width: { ideal: windowWidth },
			height: { ideal: windowHeight },
			facingMode: 'user'
		},
		flipped: true
	});
	video.size(windowWidth, windowHeight);
	// video.style('position', 'absolute');
	// video.style('top', '0');
	// video.style('left', '0');
	// video.style('width', `${windowWidth}px`);
	// video.style('height', `${windowHeight}px`);
	// video.style('object-fit', 'cover');
	// video.style('opacity', '0.4');
	// video.style('pointer-events', 'none');
	// video.style('z-index', '10');
	video.hide();
	handPose.detectStart(video, gotHands);
}

function updateHillConfiguration() {
	if (direction === 1) {
		hill = {
			x1: windowWidth,
			y1: 0,
			x2: windowWidth,
			y2: windowHeight,
			x3: 0,
			y3: windowHeight
		};
	} else {
		hill = {
			x1: 0,
			y1: 0,
			x2: 0,
			y2: windowHeight,
			x3: windowWidth,
			y3: windowHeight
		};
	}
}

function draw() {
	background(255);

	// draw hill
	fill(0);
	triangle(hill.x1, hill.y1, hill.x2, hill.y2, hill.x3, hill.y3);

	// draw rock
	fill(rock.color);
	circle(rock.x, rock.y, rock.radius * 2);

	// calculate slope position for rock
	let slope = (hill.y1 - hill.y3) / (hill.x1 - hill.x3);
	let yIntercept = hill.y3 - slope * hill.x3;
	let targetY = slope * rock.x + yIntercept;

	// switch direction if rock is at the top of the hill
	if (
		isNewIteration &&
		((direction === 1 && rock.x >= windowWidth - 100) || (direction === -1 && rock.x <= 100))
	) {
		direction *= -1;
		isNewIteration = false;
		updateHillConfiguration();
		rock.x = direction === 1 ? windowWidth - rock.x : windowWidth - rock.x;
	} else if (rock.y >= 100) {
		isNewIteration = true;
	}

	// cursor settings
	if (dist(mouseX, mouseY, rock.x, rock.y) <= rock.radius) {
		cursor('grab');
	} else {
		cursor('default');
	}

	// mouse control
	if (mouseIsPressed && dist(mouseX, mouseY, rock.x, rock.y) < rock.radius) {
		rock.x = mouseX;
		rock.y = targetY;
		rock.velocity = 0;
		cursor('grabbing');
	} else {
		// roll down the slope
		if ((direction === 1 && rock.x > 0) || (direction === -1 && rock.x < windowWidth)) {
			rock.velocity -= gravity * direction;
			rock.x += rock.velocity;
			rock.y = targetY;
		} else {
			rock.x = direction === 1 ? 0 : windowWidth;
			rock.y = windowHeight;
			rock.velocity = 0;
		}
	}

	// hand control
	if (hands.length > 0) {
		cursor('none');
		let handCenterX;
		let handCenterY;
		if (hands?.[0]) {
			let keypoints = hands[0].keypoints;
			let indices = [0, 1, 5, 9, 13, 17]; // wrist + fingertips
			let sumX = 0;
			let sumY = 0;
			let count = 0;
			for (let i of indices) {
				let point = keypoints[i];
				if (point && !isNaN(point.x) && !isNaN(point.y)) {
					sumX += point.x;
					sumY += point.y;
					count++;
				}
			}
			if (count > 0) {
				let avgX = Math.round(sumX / count);
				let avgY = Math.round(sumY / count);
				console.log('Average X:', avgX, 'Average Y:', avgY);
				if (smoothedHandX === null || smoothedHandY === null) {
					smoothedHandX = avgX;
					smoothedHandY = avgY;
				} else {
					smoothedHandX = lerp(smoothedHandX, avgX, handSmoothingFactor);
					smoothedHandY = lerp(smoothedHandY, avgY, handSmoothingFactor);
				}
				let insetLeft = windowWidth * handBoundsInsetX;
				let insetRight = windowWidth - insetLeft;
				let insetTop = windowHeight * handBoundsInsetY;
				let insetBottom = windowHeight - insetTop;
				let clampedX = constrain(smoothedHandX, insetLeft, insetRight);
				let clampedY = constrain(smoothedHandY, insetTop, insetBottom);
				let normalizedX = (clampedX - insetLeft) / Math.max(1, insetRight - insetLeft);
				let normalizedY = (clampedY - insetTop) / Math.max(1, insetBottom - insetTop);
				handCenterX = normalizedX * windowWidth;
				handCenterY = normalizedY * windowHeight;
				fill(51);
				ellipse(handCenterX, handCenterY, 20);
			}
		}

		if (typeof handCenterX === 'number' && typeof handCenterY === 'number') {
			if (dist(handCenterX, handCenterY, rock.x, rock.y) < rock.radius) {
				rock.x = handCenterX;
				rock.y = targetY;
				rock.velocity = 0;
			} else {
				if ((direction === 1 && rock.x > 0) || (direction === -1 && rock.x < windowWidth)) {
					rock.velocity -= gravity * direction;
					rock.x += rock.velocity;
					rock.y = targetY;
				} else {
					rock.x = direction === 1 ? 0 : windowWidth;
					rock.y = windowHeight;
					rock.velocity = 0;
				}
			}
		}
	}
}

function gotHands(results) {
	hands = results;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (video) {
		video.size(windowWidth, windowHeight);
		// video.style('width', `${windowWidth}px`);
		// video.style('height', `${windowHeight}px`);
	}
}
