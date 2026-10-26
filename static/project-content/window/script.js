// A light room with a white window. Through the window, a building.
// Through one of its windows, another light room with another white window.
// The view zooms forever. Every building is new, and every room's window has the shape
// of the windows of the building the room is in.

// Room units: the room's window is 1 tall and centered on the origin.
const FRAME = 0.05; // frame thickness relative to window height, for every window
const PANE_H = 1 - 2 * FRAME;
const BACK_WALL_W = 2.4; // the wall the window is in, seen straight on
const BACK_WALL_H = 1.7;

const CYCLE_SECONDS = 20;
// How much a building window's glass hides the room behind it when seen from afar:
// the glass takes on the building's color by this much. At 0.9 over the #ddd room,
// the glass reads as #161616, close to the frame. Lifts to 0 as the glass fills the screen.
const FAR_DIM = 0.9;
// The rooms behind a building's windows are seen from different angles. One column to
// the side, the far window sits this far toward the edge of the glass; one row down,
// toward the top; two rows down, it is hidden.
const PERSPECTIVE = 0.85;

const ROOM = '#ddd';
const ROOM_LINE = '#c8c8c8'; // corners where walls, floor and ceiling meet
const WHITE = '#fff';
const SKY = '#0069DA';
const BUILDING = '#000';
const BUILDING_WINDOW = '#191919';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const SEED = Math.floor(Math.random() * 10000); // a different street every visit
let W, H, unit;

function resize() {
	const dpr = window.devicePixelRatio || 1;
	W = window.innerWidth;
	H = window.innerHeight;
	canvas.width = W * dpr;
	canvas.height = H * dpr;
	canvas.style.width = W + 'px';
	canvas.style.height = H + 'px';
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

	unit = 0.5 * Math.min(W, H); // px per room unit at the start of a cycle
}

const lerp = (a, b, t) => a + (b - a) * t;

// Slow at both ends: the view rests on the room, then on the building.
const ease = (p) => p - Math.sin(2 * Math.PI * p) / (2 * Math.PI);

function smoothstep(a, b, x) {
	const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
	return t * t * (3 - 2 * t);
}

// Stable pseudo-random value in [0, 1) for building n, property k.
function rand(n, k) {
	const v = Math.sin(n * 127.1 + k * 311.7) * 43758.5453;
	return v - Math.floor(v);
}

// Width / height of building n's windows. Room n + 1, inside building n, has one too.
const aspect = (n) => lerp(0.45, 1.4, rand(n, 1));

// Building n in the units of the room looking at it, origin at that room's window center.
// All its windows are alike; the one at the origin leads to the next room.
function building(n) {
	const r = (k) => rand(n, k);
	const winH = lerp(0.1, 0.22, r(0));
	const winW = winH * aspect(n);
	const frame = FRAME * winH;
	const glassW = winW - 2 * frame;
	const glassH = winH - 2 * frame;
	const col = winW * lerp(1.25, 1.9, r(2));
	const row = winH * lerp(1.35, 2, r(3));
	const sideMargin = (col - winW) * lerp(0.5, 1, r(4));
	const topMargin = (row - winH) * lerp(0.5, 1.2, r(5));
	const left = Math.floor(r(6) * 4); // columns left of the origin
	const right = Math.floor(r(7) * 4);
	let up = Math.floor(r(8) * 3); // floors above the origin
	while (up > 0 && up * row + winH / 2 + topMargin > PANE_H / 2 - 0.03) up--; // roof in view
	// Size of the next room's window. Small enough that, once zoomed to full size,
	// the glass around it covers the screen.
	const next = 0.95 * Math.min(0.2 * winH, (glassW * unit) / W, (glassH * unit) / H);
	return {
		winW,
		winH,
		frame,
		glassW,
		glassH,
		col,
		row,
		left,
		right,
		up,
		next,
		x0: -left * col - winW / 2 - sideMargin,
		x1: right * col + winW / 2 + sideMargin,
		roof: -up * row - winH / 2 - topMargin,
		shiftX: (PERSPECTIVE * (glassW - aspect(n) * next)) / 2,
		shiftY: (PERSPECTIVE * (glassH - next)) / 2
	};
}

function intersect(c, x0, y0, x1, y1) {
	const r = {
		x0: Math.max(c.x0, x0),
		y0: Math.max(c.y0, y0),
		x1: Math.min(c.x1, x1),
		y1: Math.min(c.y1, y1)
	};
	return r.x0 < r.x1 && r.y0 < r.y1 ? r : null;
}

function clipTo(r) {
	ctx.beginPath();
	ctx.rect(r.x0, r.y0, r.x1 - r.x0, r.y1 - r.y0);
	ctx.clip();
}

// Window centered at (x, y), w × h px, frame f px thick in `color`. `view` paints what is
// seen through it into the region it is given. The view runs under the frame, so the two
// never share an antialiased edge.
function drawWindow(x, y, w, h, f, color, clip, view) {
	const x0 = x - w / 2;
	const y0 = y - h / 2;
	if (!intersect(clip, x0, y0, x0 + w, y0 + h)) return;
	const under = intersect(clip, x0 + f / 2, y0 + f / 2, x0 + w - f / 2, y0 + h - f / 2);
	if (under) {
		ctx.save();
		clipTo(under);
		view(under);
		ctx.restore();
	}
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.rect(x0, y0, w, h);
	ctx.rect(x0 + f, y0 + f, w - 2 * f, h - 2 * f);
	ctx.fill('evenodd');
}

// Room n centered at (x, y), s px per room unit, visible region `clip`. It sits inside
// building n - 1 and looks out at building n. Caller has already painted the region in
// the room color.
function room(x, y, s, clip, n) {
	if (s < 1) return;

	// Back wall outline, and the corners running from it toward the viewer.
	// Skipped once the back wall fills the whole view and no corner is in sight.
	const bw = (BACK_WALL_W / 2) * s;
	const bh = (BACK_WALL_H / 2) * s;
	if (!(x - bw <= clip.x0 && x + bw >= clip.x1 && y - bh <= clip.y0 && y + bh >= clip.y1)) {
		ctx.strokeStyle = ROOM_LINE;
		ctx.lineWidth = 0.004 * s;
		ctx.beginPath();
		ctx.rect(x - bw, y - bh, 2 * bw, 2 * bh);
		for (const [dx, dy] of [
			[-1, -1],
			[1, -1],
			[1, 1],
			[-1, 1]
		]) {
			ctx.moveTo(x + dx * bw, y + dy * bh);
			ctx.lineTo(x + dx * bw * 40, y + dy * bh * 40);
		}
		ctx.stroke();
	}

	drawWindow(x, y, aspect(n - 1) * s, s, FRAME * s, WHITE, clip, (view) => facade(x, y, s, view, n));
}

function facade(x, y, s, clip, n) {
	const b = building(n);
	ctx.fillStyle = SKY;
	ctx.fillRect(clip.x0, clip.y0, clip.x1 - clip.x0, clip.y1 - clip.y0);
	const body = intersect(clip, x + b.x0 * s, y + b.roof * s, x + b.x1 * s, clip.y1);
	if (!body) return;
	ctx.fillStyle = BUILDING;
	ctx.fillRect(body.x0, body.y0, body.x1 - body.x0, body.y1 - body.y0);

	// Only the windows that overlap the visible part of the building.
	const hw = (b.winW / 2) * s;
	const hh = (b.winH / 2) * s;
	const i0 = Math.max(-b.left, Math.ceil((body.x0 - hw - x) / (b.col * s)));
	const i1 = Math.min(b.right, Math.floor((body.x1 + hw - x) / (b.col * s)));
	const j0 = Math.max(-b.up, Math.ceil((body.y0 - hh - y) / (b.row * s)));
	const j1 = Math.floor((body.y1 + hh - y) / (b.row * s));
	const cover = Math.min((b.glassW * s) / W, (b.glassH * s) / H); // 1 = glass fills screen
	const veil = FAR_DIM * (1 - smoothstep(0.2, 1, cover));
	for (let j = j0; j <= j1; j++) {
		for (let i = i0; i <= i1; i++) {
			const wx = x + i * b.col * s;
			const wy = y + j * b.row * s;
			drawWindow(wx, wy, b.winW * s, b.winH * s, b.frame * s, BUILDING_WINDOW, clip, (view) => {
				ctx.fillStyle = ROOM;
				ctx.fillRect(view.x0, view.y0, view.x1 - view.x0, view.y1 - view.y0);
				// Seen at an angle. The window at the origin is seen straight on: the next room.
				room(wx - i * b.shiftX * s, wy - j * b.shiftY * s, b.next * s, view, n + 1);
				if (veil > 0) {
					ctx.globalAlpha = veil;
					ctx.fillStyle = BUILDING;
					ctx.fillRect(view.x0, view.y0, view.x1 - view.x0, view.y1 - view.y0);
					ctx.globalAlpha = 1;
				}
			});
		}
	}
}

function draw(now) {
	// Cycle n zooms from room n to room n + 1: first until room n's window fills the
	// screen, then on into building n. Stage lengths follow how far each one zooms.
	const t = now / 1000 / CYCLE_SECONDS;
	const n = SEED + Math.floor(t);
	const u = t - Math.floor(t);
	const paneW = aspect(n - 1) - 2 * FRAME;
	const zoomToFacade = Math.log(Math.max(W / (paneW * unit), H / (PANE_H * unit)));
	const zoomToRoom = -Math.log(building(n).next);
	const split = zoomToFacade / zoomToRoom;
	const logZoom =
		u < split
			? ease(u / split) * zoomToFacade
			: zoomToFacade + ease((u - split) / (1 - split)) * (zoomToRoom - zoomToFacade);

	ctx.fillStyle = ROOM;
	ctx.fillRect(0, 0, W, H);
	room(W / 2, H / 2, unit * Math.exp(logZoom), { x0: 0, y0: 0, x1: W, y1: H }, n);
	requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(draw);
