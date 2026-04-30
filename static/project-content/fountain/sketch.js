let scaleFactor, offsetX, offsetY;
let waterStage = 1;
let stage1StartTime, stage2StartTime, stage3StartTime;

const WATER_COLOR = '#0077FF';

// Spout stream - (unused)
// const STREAM_WIDTH = 78;
// const STREAM_X = 921;
// const STREAM_TOP = 309;
// const STREAM_HEIGHT_INITIAL = 12;
// const STREAM_HEIGHT_FINAL = 120;
// const STREAM_GROW_DURATION = 1000;
// const SPOUT_FLUCTUATION = 12;

// Upper basin water (stage 1)
const UPPER_WATER_RX = 177;
const UPPER_WATER_RY = 82;
const UPPER_DARK_BOTTOM = 430;
const STAGE1_DURATION = 5000;

// Center stream (stage 2)
const CENTER_STREAM_X = 921;
const CENTER_STREAM_WIDTH = 78;
const CENTER_STREAM_TOP = 426;
const CENTER_STREAM_HEIGHT = 223;
const CENTER_STREAM_HEIGHT_STAGE3 = 150;
const CENTER_STREAM_DURATION = 1000;
const CORNERS_TOP = [100, 100, 0, 0];
const CORNERS_BOTTOM = [0, 0, 100, 100];

// Lower basin water (stage 3)
const LOWER_WATER_RX = 292;
const LOWER_WATER_RY = 142;
const LOWER_DARK_BOTTOM = 650;

// Inner ellipses (structure, not water) - coin must stay inside
const UPPER_INNER = { cx: 960, cy: 345, rx: 180, ry: 85 };
const LOWER_INNER = { cx: 960, cy: 505, rx: 300, ry: 145 };
const STAGE3_DURATION = 5000;

// Water wave animation (after stage 3 complete)
const WATER_WAVE_AMOUNT = 0.015;
const WATER_WAVE_SPEED = 0.003;

// Coin toss
const COIN_DIAMETER = 24;
const COIN_COLORS = ['#FF8800', '#D9D9D9'];
const COIN_SPIN_SPEED = 0.04;
const COIN_FLY_DURATION = 800;
const COIN_SINK_DURATION = 600;
const COIN_LAUNCH_Y = 1080;
let coins = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(255);

	scaleFactor = min(width / 1920, height / 1080);
	offsetX = width / 2 - 960 * scaleFactor;
	offsetY = height / 2 - 540 * scaleFactor;
	noStroke();

	// Structure
	drawLowerBasinStructure();
	if (waterStage >= 3) drawLowerBasinWater();
	drawUpperBasinStructure();
	drawCreak();

	// Stage content
	if (waterStage >= 2) drawCenterStream();
	if (waterStage >= 1) drawStage1();
	if (waterStage >= 2) updateStage2();

	// Coins (on top)
	updateCoins();
	drawCoins();
}

/** Lower basin */
function drawLowerBasinStructure() {
	// Base
	fill(0);
	beginShape();
	vertex(sx(960), sy(830));
	bezierVertex(sx(1136.73), sy(830), sx(1280), sy(686.731), sx(1280), sy(510));
	vertex(sx(640), sy(510));
	bezierVertex(sx(640), sy(686.731), sx(783.269), sy(830), sx(960), sy(830));
	endShape(CLOSE);
	// Rim
	fill('#2F2F2F');
	ellipse(sx(960), sy(510), 640 * scaleFactor, 320 * scaleFactor);
	fill(0);
	// Inner ellipse
	ellipse(sx(960), sy(505), 600 * scaleFactor, 290 * scaleFactor);
}

/** Lower basin water */
function drawLowerBasinWater() {
	if (!stage3StartTime) stage3StartTime = millis();
	const progress = min(1, (millis() - stage3StartTime) / STAGE3_DURATION);
	let rx = LOWER_WATER_RX * progress;
	let ry = LOWER_WATER_RY * progress;

	if (progress >= 1) {
		const t = millis() * WATER_WAVE_SPEED;
		ry *= 1 + sin(t) * WATER_WAVE_AMOUNT;
		rx *= 1 + sin(t * 0.7 + 1) * WATER_WAVE_AMOUNT;
	}

	fill(WATER_COLOR);
	ellipse(sx(960), sy(LOWER_DARK_BOTTOM - ry), rx * 2 * scaleFactor, ry * 2 * scaleFactor);
}

/** Upper basin */
function drawUpperBasinStructure() {
	// Base
	fill(0);
	beginShape();
	vertex(sx(960), sy(550));
	bezierVertex(sx(1070.46), sy(550), sx(1160), sy(460.457), sx(1160), sy(350));
	vertex(sx(760), sy(350));
	bezierVertex(sx(760), sy(460.457), sx(849.543), sy(550), sx(960), sy(550));
	endShape(CLOSE);
	// Rim
	fill('#2F2F2F');
	ellipse(sx(960), sy(350), 400 * scaleFactor, 200 * scaleFactor);
	fill(0);
	// Inner ellipse
	ellipse(sx(960), sy(345), 360 * scaleFactor, 170 * scaleFactor);
}

/** Creak */
function drawCreak() {
	fill(0, 128);
	rect(sx(921), sy(428), 78 * scaleFactor, 24 * scaleFactor);
	fill(0, 191);
	rect(sx(999), sy(428), 4 * scaleFactor, 24 * scaleFactor);
	rect(sx(917), sy(428), 4 * scaleFactor, 24 * scaleFactor);
}

// Spout stream - not used in current stages, kept for future use
// function drawSpout(streamHeight, useFluctuation = false) {
// 	blendMode(SCREEN);
// 	fill(WATER_COLOR);
// 	let top = 429 - streamHeight;
// 	if (useFluctuation) {
// 		const spoutBob = (noise(millis() * 0.0008) - 0.5) * 2 * SPOUT_FLUCTUATION;
// 		top = STREAM_TOP + spoutBob;
// 		streamHeight = 429 - top;
// 	}
// 	rect(sx(STREAM_X), sy(top), STREAM_WIDTH * scaleFactor, streamHeight * scaleFactor, ...CORNERS_TOP);
// 	blendMode(BLEND);
// }

/** Stage 1 */
function drawStage1() {
	// Stage 1 animation
	if (!stage1StartTime) stage1StartTime = millis();
	const elapsed = millis() - stage1StartTime;
	const progress = min(1, elapsed / STAGE1_DURATION);
	let rx = UPPER_WATER_RX * progress;
	let ry = UPPER_WATER_RY * progress;

	// Stage 2 water wave animation
	if (waterStage >= 2 && progress >= 1) {
		const t = millis() * WATER_WAVE_SPEED;
		ry *= 1 + sin(t * 1.2) * WATER_WAVE_AMOUNT;
		rx *= 1 + sin(t * 0.8 + 2) * WATER_WAVE_AMOUNT;
	}

	fill(WATER_COLOR);
	ellipse(sx(960), sy(UPPER_DARK_BOTTOM - ry), rx * 2 * scaleFactor, ry * 2 * scaleFactor);

	if (elapsed >= STAGE1_DURATION) waterStage = 2;
}

/** Center stream */
function drawCenterStream() {
	// Stage 2 animation
	if (!stage2StartTime) stage2StartTime = millis();
	const elapsed = millis() - stage2StartTime;
	const progress = min(1, elapsed / CENTER_STREAM_DURATION);
	let streamHeight = CENTER_STREAM_HEIGHT * progress;

	// Stage 3 animation
	if (waterStage >= 3) {
		if (!stage3StartTime) stage3StartTime = millis();
		const stage3Progress = min(1, (millis() - stage3StartTime) / STAGE3_DURATION);
		streamHeight = lerp(CENTER_STREAM_HEIGHT, CENTER_STREAM_HEIGHT_STAGE3, stage3Progress);
		// Stage 3 water wave animation
		if (stage3Progress >= 1) {
			streamHeight *= 1 + sin(millis() * WATER_WAVE_SPEED * 1.5) * WATER_WAVE_AMOUNT;
		}
	}

	blendMode(SCREEN);
	fill(WATER_COLOR);
	rect(
		sx(CENTER_STREAM_X),
		sy(CENTER_STREAM_TOP),
		CENTER_STREAM_WIDTH * scaleFactor,
		streamHeight * scaleFactor,
		...CORNERS_BOTTOM
	);
	blendMode(BLEND);
}

/** Stage 2 */
function updateStage2() {
	if (!stage2StartTime) stage2StartTime = millis();
	const elapsed = millis() - stage2StartTime;
	if (elapsed >= CENTER_STREAM_DURATION) waterStage = 3;
}

function sx(x) {
	return offsetX + x * scaleFactor;
}

function sy(y) {
	return offsetY + y * scaleFactor;
}

function svgX(screenX) {
	return (screenX - offsetX) / scaleFactor;
}

function svgY(screenY) {
	return (screenY - offsetY) / scaleFactor;
}

function isPointInEllipse(px, py, cx, cy, rx, ry) {
	return pow((px - cx) / rx, 2) + pow((py - cy) / ry, 2) <= 1;
}

function clampPointToEllipse(px, py, cx, cy, rx, ry) {
	const d = pow((px - cx) / rx, 2) + pow((py - cy) / ry, 2);
	if (d <= 1) return { x: px, y: py };
	const scale = 1 / sqrt(d);
	return { x: cx + (px - cx) * scale, y: cy + (py - cy) * scale };
}

function getUpperWaterEllipse() {
	if (!stage1StartTime) return null;
	const elapsed = millis() - stage1StartTime;
	const progress = min(1, elapsed / STAGE1_DURATION);
	let rx = UPPER_WATER_RX * progress;
	let ry = UPPER_WATER_RY * progress;
	if (waterStage >= 2 && progress >= 1) {
		const t = millis() * WATER_WAVE_SPEED;
		ry *= 1 + sin(t * 1.2) * WATER_WAVE_AMOUNT;
		rx *= 1 + sin(t * 0.8 + 2) * WATER_WAVE_AMOUNT;
	}
	return { cx: 960, cy: UPPER_DARK_BOTTOM - ry, rx, ry };
}

function getLowerWaterEllipse() {
	if (waterStage < 3 || !stage3StartTime) return null;
	const progress = min(1, (millis() - stage3StartTime) / STAGE3_DURATION);
	let rx = LOWER_WATER_RX * progress;
	let ry = LOWER_WATER_RY * progress;
	if (progress >= 1) {
		const t = millis() * WATER_WAVE_SPEED;
		ry *= 1 + sin(t) * WATER_WAVE_AMOUNT;
		rx *= 1 + sin(t * 0.7 + 1) * WATER_WAVE_AMOUNT;
	}
	return { cx: 960, cy: LOWER_DARK_BOTTOM - ry, rx, ry };
}

/** Click interaction - Coin toss */
function mouseClicked() {
	if (waterStage < 3) return;

	const px = svgX(mouseX);
	const py = svgY(mouseY);

	const upper = getUpperWaterEllipse();
	if (upper && isPointInEllipse(px, py, upper.cx, upper.cy, upper.rx, upper.ry)) {
		launchCoin(px, py, 'upper');
		return;
	}

	const lower = getLowerWaterEllipse();
	if (lower && isPointInEllipse(px, py, lower.cx, lower.cy, lower.rx, lower.ry)) {
		launchCoin(px, py, 'lower');
		return;
	}
}

function launchCoin(targetX, targetY, basin) {
	const inner = basin === 'upper' ? UPPER_INNER : LOWER_INNER;
	const sinkDest = clampPointToEllipse(
		targetX,
		inner.cy + inner.ry,
		inner.cx,
		inner.cy,
		inner.rx,
		inner.ry
	);

	const color = random(COIN_COLORS);
	coins.push({
		x: 960,
		y: COIN_LAUNCH_Y,
		targetX,
		targetY,
		sinkX: sinkDest.x,
		sinkY: sinkDest.y,
		basin,
		color,
		opacity: 255,
		startTime: millis(),
		state: 'flying'
	});
}

function updateCoins() {
	const now = millis();
	for (let i = coins.length - 1; i >= 0; i--) {
		const c = coins[i];
		const elapsed = now - c.startTime;

		if (c.state === 'flying') {
			const t = min(1, elapsed / COIN_FLY_DURATION);
			c.x = lerp(960, c.targetX, t);
			c.y = lerp(COIN_LAUNCH_Y, c.targetY, t);
			c.rotation = elapsed * COIN_SPIN_SPEED;
			if (t >= 1) {
				c.state = 'sinking';
				c.startTime = now;
			}
		} else if (c.state === 'sinking') {
			const t = min(1, elapsed / COIN_SINK_DURATION);
			const inner = c.basin === 'upper' ? UPPER_INNER : LOWER_INNER;
			let px = lerp(c.targetX, c.sinkX, t);
			let py = lerp(c.targetY, c.sinkY, t);
			const clamped = clampPointToEllipse(px, py, inner.cx, inner.cy, inner.rx, inner.ry);
			c.x = clamped.x;
			c.y = clamped.y;
			c.opacity = 255 * (1 - t);
			if (t >= 1) coins.splice(i, 1);
		}
	}
}

function drawCoins() {
	noStroke();
	for (const c of coins) {
		const col = color(c.color);
		fill(red(col), green(col), blue(col), c.opacity !== undefined ? c.opacity : 255);
		const d = COIN_DIAMETER * scaleFactor;
		if (c.state === 'flying' && c.rotation !== undefined) {
			push();
			translate(sx(c.x), sy(c.y));
			rotate(c.rotation);
			ellipse(0, 0, d * (0.15 + 0.85 * abs(cos(c.rotation))), d);
			pop();
		} else {
			circle(sx(c.x), sy(c.y), d);
		}
	}
}
