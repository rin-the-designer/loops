// The sun crosses the sky once a day. The world brightens as it climbs, darkens as it
// sets, and goes completely black at night. Days alternate between home, always the
// same place in the same grey light, and somewhere new, where the low sun turns the
// hilltops and the houses gold. The sun itself never changes.

const VIEWBOX_WIDTH = 1920;
const VIEWBOX_HEIGHT = 1080;
const DAY_SECONDS = 30; // sunrise to sunset
const NIGHT_SECONDS = 1; // completely black, on top of the dark ends of the day
const SUN_RADIUS = 100;

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const NIGHT = hex('#000000');
const SKY_DAY = hex('#ffffff');
const STREAM_DAY = hex('#0069da');
const GOLD = hex('#ffb347');
const WALLS_HOME = hex('#9c9c9c');
const WALLS_AWAY = hex('#ffffff');

// Home is the original drawing, with a few houses up the slope on the right.
// Houses sit `d` below the hill's edge, so they show against the dark ground.
const HOME = {
	ridge: [
		[0, 905],
		[649.5, 780.2],
		[1055, 832.5],
		[1445.5, 754],
		[1920, 754]
	],
	stream: [
		[910.5, 933.5],
		[997, 825],
		[1055, 832.5],
		[980.5, 933.5],
		[1115, 1109.5],
		[1042, 1109.5]
	],
	houses: [
		{ x: 1262, w1: 26, w2: 20, h: 26, r: 12, d: 34, flip: false },
		{ x: 1314, w1: 20, w2: 26, h: 32, r: 14, d: 12, flip: true },
		{ x: 1368, w1: 28, w2: 22, h: 28, r: 12, d: 44, flip: false },
		{ x: 1420, w1: 22, w2: 20, h: 22, r: 10, d: 18, flip: true }
	]
};

const sun = document.getElementById('sun');
const skyTop = document.getElementById('skyTop');
const skyHorizon = document.getElementById('skyHorizon');
const ground = document.getElementById('ground');
const ridgeLight = document.getElementById('ridgeLight');
const stream = document.getElementById('stream');
const housesGroup = document.getElementById('houses');

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const rand = (a, b) => lerp(a, b, Math.random());
const smoothstep = (edge0, edge1, x) => {
	const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
	return t * t * (3 - 2 * t);
};
const mix = (a, b, t) => a.map((v, i) => lerp(v, b[i], t));
const css = (c) => `rgb(${c.map(Math.round).join(', ')})`;

// Part of the viewBox on screen ("slice" crops it to cover the window).
function getVisibleViewBoxBounds() {
	const viewportAspect = window.innerWidth / window.innerHeight;
	const viewBoxAspect = VIEWBOX_WIDTH / VIEWBOX_HEIGHT;

	if (viewportAspect > viewBoxAspect) {
		// Wider viewport: crop top/bottom
		const visibleHeight = VIEWBOX_WIDTH / viewportAspect;
		const yOffset = (VIEWBOX_HEIGHT - visibleHeight) / 2;
		return {
			left: 0,
			right: VIEWBOX_WIDTH,
			top: yOffset,
			bottom: yOffset + visibleHeight,
			width: VIEWBOX_WIDTH,
			height: visibleHeight
		};
	}

	// Taller viewport: crop left/right
	const visibleWidth = VIEWBOX_HEIGHT * viewportAspect;
	const xOffset = (VIEWBOX_WIDTH - visibleWidth) / 2;
	return {
		left: xOffset,
		right: xOffset + visibleWidth,
		top: 0,
		bottom: VIEWBOX_HEIGHT,
		width: visibleWidth,
		height: VIEWBOX_HEIGHT
	};
}

const linePath = (points) =>
	'M' + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L');
const pathOf = (points) => linePath(points) + 'Z';

function ridgeY(ridge, x) {
	for (let i = 1; i < ridge.length; i++) {
		if (x <= ridge[i][0]) {
			const [x0, y0] = ridge[i - 1];
			const [x1, y1] = ridge[i];
			return lerp(y0, y1, (x - x0) / (x1 - x0));
		}
	}
	return ridge[ridge.length - 1][1];
}

function newPlace() {
	// Horizon: a few straight ridges, with a valley near the middle where the stream
	// starts. Near the middle, it stays in view on narrow screens too.
	const valleyX = rand(820, 1100);
	const xs = [0, valleyX, VIEWBOX_WIDTH];
	for (let i = 1 + Math.floor(Math.random() * 2); i > 0; i--) xs.push(rand(120, valleyX - 180));
	for (let i = 1 + Math.floor(Math.random() * 2); i > 0; i--) xs.push(rand(valleyX + 180, 1800));
	xs.sort((a, b) => a - b);
	const ys = xs.map(() => rand(700, 860));
	const v = xs.indexOf(valleyX);
	ys[v] = Math.min(Math.max(ys[v - 1], ys[v + 1]) + rand(15, 45), 900);
	if (Math.random() < 0.5) ys[ys.length - 1] = ys[ys.length - 2]; // flat run to the edge
	const ridge = xs.map((x, i) => [x, ys[i]]);

	// Stream: zigzags from the valley toward the viewer. Bends come closer together near
	// the horizon and swing wider and the water widens as it comes closer.
	const bends = 1 + Math.floor(Math.random() * 2);
	const side = Math.random() < 0.5 ? -1 : 1;
	const center = [[valleyX, ys[v] - 10]];
	for (let i = 1; i <= bends + 1; i++) {
		const f = i / (bends + 1);
		const swing = (i % 2 ? side : -side) * lerp(50, 130, f) * rand(0.7, 1.2);
		center.push([clamp(valleyX + swing, 760, 1160), lerp(ys[v], VIEWBOX_HEIGHT + 40, f ** 1.4)]);
	}
	const halfWidth = (i) => lerp(24, 40, i / (center.length - 1));
	const left = center.map(([x, y], i) => [x - halfWidth(i), y]);
	const right = center.map(([x, y], i) => [x + halfWidth(i), y]).reverse();

	// A few houses gathered just below the top of the highest hill, away from the edges.
	const hills = ridge.slice(1, -1).filter(([x]) => x !== valleyX);
	const inView = hills.filter(([x]) => x > 300 && x < 1620);
	const hill = (inView.length ? inView : hills).reduce((a, b) => (b[1] < a[1] ? b : a));
	const count = 3 + Math.floor(Math.random() * 4);
	const houses = [];
	let cursor = hill[0] - count * 30;
	for (let i = 0; i < count; i++) {
		const flip = Math.random() < 0.5;
		const w1 = rand(18, 30);
		const w2 = rand(16, 26);
		const x = cursor + (flip ? w2 : w1);
		houses.push({ x, w1, w2, h: rand(20, 34), r: rand(9, 15), d: rand(8, 60), flip });
		cursor = x + (flip ? w1 : w2) + rand(4, 16);
	}

	return { ridge, stream: [...left, ...right], houses };
}

function shape(points) {
	const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	el.setAttribute('d', pathOf(points));
	housesGroup.append(el);
	return el;
}

// A house seen from one corner: a plain wall on one side, the gable end on the other,
// the roof above the plain wall. Each wall faces the sun at a different time of day.
// The whole house sits d below the hill's edge.
function house(ridge, { x, w1, w2, h, r, d, flip }) {
	const s = flip ? -1 : 1; // side the gable end is on
	const edge = Math.max(ridgeY(ridge, x - s * w1), ridgeY(ridge, x + s * w2));
	const base = edge + r + h + d;
	const top = base - h;
	const peak = x + (s * w2) / 2;
	const wall = shape([
		[x - s * w1, base],
		[x, base],
		[x, top],
		[x - s * w1, top]
	]);
	const gable = shape([
		[x, base],
		[x + s * w2, base],
		[x + s * w2, top],
		[peak, top - r],
		[x, top]
	]);
	const roof = shape([
		[x - s * w1, top],
		[x, top],
		[peak, top - r],
		[peak - s * w1, top - r]
	]);
	return { x, roof, left: flip ? gable : wall, right: flip ? wall : gable };
}

let faces = [];

function show(place) {
	ground.setAttribute(
		'd',
		pathOf([[0, VIEWBOX_HEIGHT], ...place.ridge, [VIEWBOX_WIDTH, VIEWBOX_HEIGHT]])
	);
	ridgeLight.setAttribute('d', linePath(place.ridge));
	stream.setAttribute('d', pathOf(place.stream));
	housesGroup.replaceChildren();
	faces = place.houses.map((spec) => house(place.ridge, spec));
}

let day = -1;
let away = false;

function animate(now) {
	const t = now / 1000;
	const cycle = DAY_SECONDS + NIGHT_SECONDS;
	const today = Math.floor(t / cycle);
	if (today !== day) {
		// Each day starts before sunrise, still black: home, somewhere new, home again.
		day = today;
		away = today % 2 === 1;
		show(away ? newPlace() : HOME);
	}
	const p = Math.min((t - today * cycle) / DAY_SECONDS, 1); // 0 sunrise .. 1 sunset, then night
	const height = Math.sin(p * Math.PI); // 0 below the horizon, 1 at noon

	// Sun: rises from below the bottom-left corner, sets below the bottom-right.
	const visible = getVisibleViewBoxBounds();
	const sunX = lerp(visible.left, visible.right, p);
	const sunY = visible.bottom + SUN_RADIUS - height * (visible.height * 0.67 + SUN_RADIUS);
	sun.setAttribute('cx', sunX.toFixed(2));
	sun.setAttribute('cy', sunY.toFixed(2));

	// Light follows the sun: black only while it is well below the hills, full daylight at noon.
	const light = smoothstep(0.15, 1, height);
	// Away from home, the low sun turns gold: strongest just after sunrise and before sunset.
	const golden = away ? smoothstep(0.3, 0.5, height) * (1 - smoothstep(0.45, 0.9, height)) : 0;

	const sky = mix(NIGHT, SKY_DAY, light);
	skyTop.setAttribute('stop-color', css(sky));
	skyHorizon.setAttribute('stop-color', css(mix(sky, GOLD, golden * 0.8)));
	stream.setAttribute('fill', css(mix(NIGHT, STREAM_DAY, light)));
	ridgeLight.setAttribute('stroke-opacity', golden.toFixed(3));

	// Walls facing the sun catch its light: left walls in the morning, right in the evening.
	const walls = mix(NIGHT, away ? WALLS_AWAY : WALLS_HOME, light);
	const lit = mix(walls, GOLD, golden);
	const shade = mix(NIGHT, walls, 0.35);
	const roof = css(mix(NIGHT, walls, 0.18));
	for (const face of faces) {
		const fromLeft = clamp(0.5 + (face.x - sunX) / 600, 0, 1);
		face.left.setAttribute('fill', css(mix(shade, lit, fromLeft)));
		face.right.setAttribute('fill', css(mix(shade, lit, 1 - fromLeft)));
		face.roof.setAttribute('fill', roof);
	}

	requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
