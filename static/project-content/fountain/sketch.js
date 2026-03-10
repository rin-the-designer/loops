// Responsive Fountain (top view)
// - Lower basin max diameter: 640px (desktop), min: 320px (mobile)
// - Two layers (upper + lower) with 4 waterways
// - Starts empty -> upper fills -> channels flow -> lower fills -> subtle ripples
// - Coin/orange dot removed for now

let stage = 0;
let t0 = 0;

// Timing (ms)
const DUR_UPPER_FILL = 4200;
const DUR_CHANNEL_FLOW = 1800;
const DUR_LOWER_FILL = 5200;

// Colors
const STONE_OUTER = '#050505';
const STONE_INNER = '#2F2F2F';
const STONE_CAVITY = '#000000';

const WATER_A = '#2A91FF';
const WATER_B = '#1670D1';
const WATER_C = '#1059AD';

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	t0 = millis();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(232);

	// Base sizing
	const targetLowerD = clamp(min(width, height) * 0.72, 320, 640);
	const s = targetLowerD / 640; // reference is 640
	const cx = width / 2;
	const cy = height / 2;

	// Geometry (reference space)
	const lowerOuter = { rx: 320, ry: 320 }; // outer circle (base ring)
	const lowerRim = { rx: 320, ry: 160 }; // rim ellipse
	const lowerCavity = { rx: 300, ry: 145 }; // inner cavity ellipse

	const upperRim = { rx: 200, ry: 100 };
	const upperCavity = { rx: 180, ry: 85 };

	// Channel geometry
	const channelW = 36;
	const channelL = 92;
	const channelInset = 6;

	// Animation progress
	const now = millis();
	const elapsed = now - t0;

	// Stage transitions
	if (stage === 0) stage = 1;
	if (stage === 1 && elapsed >= DUR_UPPER_FILL) stage = 2;
	if (stage === 2 && elapsed >= DUR_UPPER_FILL + DUR_CHANNEL_FLOW) stage = 3;

	const pUpper = stage >= 2 ? 1 : clamp(elapsed / DUR_UPPER_FILL, 0, 1);
	const pChan = stage >= 3 ? 1 : clamp((elapsed - DUR_UPPER_FILL) / DUR_CHANNEL_FLOW, 0, 1);
	const pLower = clamp((elapsed - (DUR_UPPER_FILL + DUR_CHANNEL_FLOW)) / DUR_LOWER_FILL, 0, 1);

	// Draw order
	drawLowerStructure(cx, cy, s, lowerOuter, lowerRim, lowerCavity);
	if (stage >= 3) drawLowerWater(cx, cy, s, lowerCavity, pLower);

	drawChannels(cx, cy, s, channelW, channelL, channelInset);
	if (stage >= 2) drawChannelWater(cx, cy, s, channelW, channelL, channelInset, pChan);

	drawUpperStructure(cx, cy, s, upperRim, upperCavity);
	drawSpout(cx, cy, s, stage, pUpper);
	if (stage >= 1) drawUpperWater(cx, cy, s, upperCavity, pUpper, stage);
}

function drawLowerStructure(cx, cy, s, outer, rim, cavity) {
	// Outer base ring (circle)
	fill(STONE_OUTER);
	circle(cx, cy, outer.rx * 2 * s);

	// Rim ellipse
	fill(STONE_INNER);
	ellipse(cx, cy, rim.rx * 2 * s, rim.ry * 2 * s);

	// Inner cavity
	fill(STONE_CAVITY);
	ellipse(cx, cy, cavity.rx * 2 * s, cavity.ry * 2 * s);

	// Notches / highlights (subtle)
	fill(255, 22);
	const notchW = 28 * s;
	const notchH = 10 * s;
	// top
	rect(cx - notchW / 2, cy - rim.ry * s - notchH * 0.65, notchW, notchH, 999);
	// bottom
	rect(cx - notchW / 2, cy + rim.ry * s - notchH * 0.35, notchW, notchH, 999);
	// left
	push();
	translate(cx - rim.ry * s, cy);
	rotate(HALF_PI);
	rect(-notchW / 2, -notchH / 2, notchW, notchH, 999);
	pop();
	// right
	push();
	translate(cx + rim.ry * s, cy);
	rotate(HALF_PI);
	rect(-notchW / 2, -notchH / 2, notchW, notchH, 999);
	pop();
}

function drawUpperStructure(cx, cy, s, rim, cavity) {
	// Upper base shape (kept abstract: just rim + cavity)
	fill(STONE_INNER);
	ellipse(cx, cy, rim.rx * 2 * s, rim.ry * 2 * s);
	fill(STONE_CAVITY);
	ellipse(cx, cy, cavity.rx * 2 * s, cavity.ry * 2 * s);
}

function drawChannels(cx, cy, s, w, l, inset) {
	// 4 channels as rounded capsules between upper and lower basins
	fill(STONE_INNER);

	// top
	drawCapsule(cx, cy - (85 + l / 2) * s, w * s, l * s, 999);
	// bottom
	drawCapsule(cx, cy + (85 + l / 2) * s, w * s, l * s, 999);
	// left
	push();
	translate(cx - (180 + l / 2) * s, cy);
	rotate(HALF_PI);
	drawCapsule(0, 0, w * s, l * s, 999);
	pop();
	// right
	push();
	translate(cx + (180 + l / 2) * s, cy);
	rotate(HALF_PI);
	drawCapsule(0, 0, w * s, l * s, 999);
	pop();
}

function drawChannelWater(cx, cy, s, w, l, inset, p) {
	// Water inside channels
	const innerW = (w - inset * 2) * s;
	const innerL = (l - inset * 2) * s;
	const fillL = innerL * easeOutCubic(p);

	push();
	blendMode(SCREEN);

	function channelFill(x, y, rot) {
		push();
		translate(x, y);
		rotate(rot);

		// background glow
		fill(77, 166, 255, 18);
		rect(-innerW / 2 - 6 * s, -innerL / 2 - 6 * s, innerW + 12 * s, innerL + 12 * s, 999);

		// filled portion (from top of channel down)
		const yy = -innerL / 2;
		fillGradientRect(-innerW / 2, yy, innerW, fillL);

		// shimmer stripe
		const t = millis() * 0.0022;
		fill(255, 18);
		rect(-innerW / 2, yy + (sin(t) * 0.5 + 0.5) * max(0, fillL - 12 * s), innerW, 10 * s, 999);
		pop();
	}

	// top (flows outward)
	channelFill(cx, cy - (85 + l / 2) * s, 0);
	// bottom
	channelFill(cx, cy + (85 + l / 2) * s, PI);
	// left
	channelFill(cx - (180 + l / 2) * s, cy, HALF_PI);
	// right
	channelFill(cx + (180 + l / 2) * s, cy, -HALF_PI);

	blendMode(BLEND);
	pop();
}

function drawSpout(cx, cy, s, stage, pUpper) {
	// Central output (blue circle) + subtle pulse when filling
	const r = 26 * s;
	const pulse = 1 + (stage < 3 ? sin(millis() * 0.004) * 0.06 : sin(millis() * 0.0032) * 0.035);

	push();
	blendMode(SCREEN);
	fill(77, 166, 255, 26);
	circle(cx, cy, r * 2.8 * pulse);
	blendMode(BLEND);

	fill('#1670D1');
	circle(cx, cy, r * 2);

	fill(255, 28);
	circle(cx - r * 0.18, cy - r * 0.22, r * 0.65);
	pop();
}

function drawUpperWater(cx, cy, s, cavity, p, stage) {
	// Radial fill: ellipse grows from center
	let rx = cavity.rx * easeOutCubic(p);
	let ry = cavity.ry * easeOutCubic(p);

	// After full: subtle ripple
	if (p >= 1) {
		const t = millis() * 0.003;
		rx *= 1 + sin(t * 0.9 + 1.2) * 0.012;
		ry *= 1 + sin(t * 1.2) * 0.016;
	}

	push();
	// Clip to cavity by drawing water first, then cavity mask effect via dark rim already
	blendMode(BLEND);
	fillWater();
	ellipse(cx, cy, rx * 2 * s, ry * 2 * s);

	// Highlights / ripples
	if (p > 0.35) {
		blendMode(SCREEN);
		fill(255, 18);
		const t = millis() * 0.0024;
		ellipse(cx, cy - 10 * s, rx * 1.55 * s, ry * 1.25 * s);
		fill(255, 10);
		ellipse(
			cx + 8 * s,
			cy + 2 * s,
			rx * (1.25 + sin(t) * 0.03) * s,
			ry * (1.1 + sin(t * 1.2) * 0.03) * s
		);
		blendMode(BLEND);
	}
	pop();
}

function drawLowerWater(cx, cy, s, cavity, p) {
	let rx = cavity.rx * easeOutCubic(p);
	let ry = cavity.ry * easeOutCubic(p);

	if (p >= 1) {
		const t = millis() * 0.003;
		rx *= 1 + sin(t * 0.7 + 0.8) * 0.012;
		ry *= 1 + sin(t * 1.05) * 0.015;
	}

	push();
	fillWater();
	ellipse(cx, cy, rx * 2 * s, ry * 2 * s);

	// Ripple rings
	if (p >= 1) {
		blendMode(SCREEN);
		noFill();
		stroke(255, 12);
		strokeWeight(2 * s);
		const t = millis() * 0.0012;
		for (let i = 0; i < 3; i++) {
			const k = (t + i * 0.33) % 1;
			const rr = 0.25 + k * 0.75;
			ellipse(cx, cy, rx * 2 * rr * s, ry * 2 * rr * s);
		}
		noStroke();
		blendMode(BLEND);
	}
	pop();
}

// Helpers
function drawCapsule(x, y, w, h, r) {
	rectMode(CENTER);
	rect(x, y, w, h, r);
	rectMode(CORNER);
}

function fillWater() {
	// Approx gradient by layering a few translucent ellipses
	// Base
	fill(WATER_B);
	// Add soft top highlight
	push();
	blendMode(SCREEN);
	fill(77, 166, 255, 30);
	pop();
}

function fillGradientRect(x, y, w, h) {
	// small vertical gradient approximation
	const steps = 10;
	for (let i = 0; i < steps; i++) {
		const t = i / (steps - 1);
		const yy = y + t * h;
		const hh = h / steps + 0.5;
		const col = lerpColor(color(WATER_A), color(WATER_C), t);
		fill(red(col), green(col), blue(col), 170);
		rect(x, yy, w, hh, 999);
	}
}

function easeOutCubic(t) {
	return 1 - pow(1 - t, 3);
}

function clamp(v, a, b) {
	return min(b, max(a, v));
}
