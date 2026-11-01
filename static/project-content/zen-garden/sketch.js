let strokeW,
	gap,
	patterns = [],
	currentY = 0;
let speedFactor = 1080; // Lower number = Faster Speed
const arcSizes = [8, 4, 0.5];
// More cycles = thinner strokes and gaps. The pattern is 8 × cycles + 13 strokes tall, so it always
// fills the screen, starting top left and ending bottom right.
const numCompleteCycles = 4;

// Fade and reset variables
let completionTime = null,
	isFading = false,
	resetTime = null;
const waitDuration = 3000;
const fadeInDuration = 3000;
const restartWaitDuration = 3000;

// Rocks are placed during the blank pause and stay across loops; only the sand is re-raked
let rocks = [],
	garden = [],
	ringTravel = 0;
const rockSize = 2.2; // rock radius in stroke widths

function setup() {
	createCanvas(windowWidth, windowHeight);
	strokeW = windowHeight / (8 * numCompleteCycles + 13);
	gap = strokeW * 2;
	strokeWeight(strokeW);
	strokeCap(ROUND);
	strokeJoin(ROUND);
	angleMode(DEGREES);
	noFill();
	stroke(0);
	resetTime = millis(); // open on the blank pause so rocks can be placed first
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
	patterns = []; // the first band starts once every rock is ringed
	ringTravel = 0;
	traceGarden();
	currentY = 0;
	completionTime = null;
	isFading = false;
	resetTime = null;
	stroke(0);
}

// Ring k's centre line; the sand between the rock and the first ring is as wide as between rings
function ringRadius(k) {
	return strokeW * rockSize + gap * k - strokeW / 2;
}

// Rocks whose outer rings would overlap are raked as one group
function rockGroups() {
	let groups = [];
	for (let rock of rocks) {
		let near = groups.filter((group) =>
			group.some((r) => dist(r.x, r.y, rock.x, rock.y) < 2 * ringRadius(3))
		);
		groups = groups.filter((group) => !near.includes(group)).concat([[...near.flat(), rock]]);
	}
	return groups;
}

// Signed distance-like field of a group's shape grown to radius r (negative inside): a disc per
// rock, plus a bridge between close rocks whose sides curve inward around two fixed centres, so
// every ring bends through the waist in parallel (an 8 without its crossing). The centres sit far
// enough out to keep the innermost waist open.
function groupField(group, r) {
	let a = ringRadius(1) - strokeW;
	let bridges = [];
	group.forEach((p, i) => {
		for (let q of group.slice(i + 1)) {
			let d = dist(p.x, p.y, q.x, q.y);
			if (d >= 2 * ringRadius(3)) continue;
			let c = max(ringRadius(4), (a * a + (d * d) / 4) / (2 * a));
			let h = Math.sqrt(c * c - (d * d) / 4);
			let mid = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
			let f1 = { x: mid.x + (h * (p.y - q.y)) / d, y: mid.y + (h * (q.x - p.x)) / d };
			let f2 = { x: 2 * mid.x - f1.x, y: 2 * mid.y - f1.y };
			// the bridge is the rhombus p, f1, q, f2 minus the fillet discs around f1 and f2
			let corners = [p, f1, q, f2];
			let edges = corners.map((u, j) => {
				let w = corners[(j + 1) % 4];
				let nx = w.y - u.y,
					ny = u.x - w.x,
					len = Math.hypot(nx, ny);
				if (nx * (mid.x - u.x) + ny * (mid.y - u.y) > 0) len = -len;
				return { u, nx: nx / len, ny: ny / len };
			});
			bridges.push({ f1, f2, fillet: c - r, edges });
		}
	});
	return (x, y) => {
		let value = Infinity;
		for (let rock of group) value = Math.min(value, Math.hypot(x - rock.x, y - rock.y) - r);
		for (let b of bridges) {
			let inside = Math.max(...b.edges.map((e) => e.nx * (x - e.u.x) + e.ny * (y - e.u.y)));
			let fillets =
				b.fillet - Math.min(Math.hypot(x - b.f1.x, y - b.f1.y), Math.hypot(x - b.f2.x, y - b.f2.y));
			value = Math.min(value, Math.max(inside, fillets));
		}
		return value;
	};
}

// Closed loops where field = 0 inside the box, traced by marching squares. Each loop runs clockwise
// on screen from its topmost point, so it can be drawn progressively like the rake moving along it.
function traceLoops(field, x0, y0, x1, y1, step) {
	let cols = Math.ceil((x1 - x0) / step),
		rows = Math.ceil((y1 - y0) / step);
	let v = [];
	for (let j = 0; j <= rows; j++) {
		v.push([]);
		for (let i = 0; i <= cols; i++) v[j].push(field(x0 + i * step, y0 + j * step));
	}
	// crossing points are keyed by the grid edge they sit on, so neighbouring cells share them
	let points = new Map(),
		links = new Map();
	let crossing = (i, j, horizontal) => {
		let key = (horizontal ? 'h' : 'v') + i + ',' + j;
		if (!points.has(key)) {
			let a = v[j][i],
				b = horizontal ? v[j][i + 1] : v[j + 1][i],
				t = a / (a - b);
			points.set(key, {
				x: x0 + (i + (horizontal ? t : 0)) * step,
				y: y0 + (j + (horizontal ? 0 : t)) * step
			});
		}
		return key;
	};
	let link = (p, q) => {
		links.set(p, [...(links.get(p) || []), q]);
		links.set(q, [...(links.get(q) || []), p]);
	};
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let tl = v[j][i] < 0,
				tr = v[j][i + 1] < 0,
				br = v[j + 1][i + 1] < 0,
				bl = v[j + 1][i] < 0;
			let edges = [
				tl !== tr && crossing(i, j, true),
				tr !== br && crossing(i + 1, j, false),
				bl !== br && crossing(i, j + 1, true),
				tl !== bl && crossing(i, j, false)
			];
			let crossed = edges.filter(Boolean);
			if (crossed.length === 2) link(...crossed);
			if (crossed.length === 4) {
				let centre = v[j][i] + v[j][i + 1] + v[j + 1][i + 1] + v[j + 1][i] < 0;
				let [top, right, bottom, left] = edges;
				if (centre === tl) {
					link(top, right);
					link(bottom, left);
				} else {
					link(left, top);
					link(right, bottom);
				}
			}
		}
	}
	let loops = [],
		seen = new Set();
	for (let start of links.keys()) {
		if (seen.has(start)) continue;
		let loop = [],
			prev = null,
			cur = start;
		do {
			seen.add(cur);
			loop.push(points.get(cur));
			let [a, b] = links.get(cur);
			[prev, cur] = [cur, a !== prev ? a : b];
		} while (cur !== start && !seen.has(cur));
		let area = loop.reduce((sum, p, i) => {
			let q = loop[(i + 1) % loop.length];
			return sum + p.x * q.y - q.x * p.y;
		}, 0);
		if (area < 0) loop.reverse();
		let top = loop.reduce((best, p, i) => (p.y < loop[best].y ? i : best), 0);
		loops.push(loop.slice(top).concat(loop.slice(0, top)));
	}
	return loops;
}

// For each group, the three rings of one lap of the rake, traced once per loop of the piece when
// the rocks are settled, and again on resize.
function traceGarden() {
	garden = rockGroups().map((group) => {
		let pad = ringRadius(3) + gap;
		let xs = group.map((r) => r.x),
			ys = group.map((r) => r.y);
		let levels = [3, 2, 1].map((k) =>
			traceLoops(
				groupField(group, ringRadius(k)),
				min(xs) - pad,
				min(ys) - pad,
				max(xs) + pad,
				max(ys) + pad,
				strokeW / 3
			)
		);
		return rake(levels);
	});
}

// The three spikes move as one rake. The middle ring is resampled evenly, and the outer and inner
// rings are built from it by stepping one gap out and in along its normal, point for point, so all
// three share the same distance travelled and their heads stay side by side across the path.
function rake(levels) {
	let main = levels.map((loops) => loops.reduce((a, b) => (b.length > a.length ? b : a)));
	let middle = resample(main[1], strokeW / 3);
	let n = middle.length;
	let along = [0];
	for (let i = 1; i <= n; i++) {
		let a = middle[i - 1],
			b = middle[i % n];
		along.push(along[i - 1] + dist(a.x, a.y, b.x, b.y));
	}
	// loops run clockwise on screen, so (dy, -dx) points outward
	let normals = middle.map((p, i) => {
		let a = middle[(i + n - 1) % n],
			b = middle[(i + 1) % n];
		let len = dist(a.x, a.y, b.x, b.y);
		return { x: (b.y - a.y) / len, y: (a.x - b.x) / len };
	});
	let spikes = [gap, 0, -gap].map((offset) => {
		let points = middle.map((p, i) => ({
			x: p.x + normals[i].x * offset,
			y: p.y + normals[i].y * offset
		}));
		points.push(points[0]); // closed, back to the start
		return { points, t: along };
	});
	// holes left inside wide groups are raked on their own, alongside
	let holes = levels.flatMap((loops, k) => loops.filter((loop) => loop !== main[k]));
	return { outer: levels[0], spikes, holes, length: along[n] };
}

// Points every `spacing` along a closed loop
function resample(loop, spacing) {
	let out = [loop[0]],
		left = spacing;
	for (let i = 0; i < loop.length; i++) {
		let a = loop[i],
			b = loop[(i + 1) % loop.length];
		let seg = dist(a.x, a.y, b.x, b.y),
			at = 0;
		while (seg - at >= left) {
			at += left;
			out.push({ x: lerp(a.x, b.x, at / seg), y: lerp(a.y, b.y, at / seg) });
			left = spacing;
		}
		left -= seg - at;
	}
	let last = out[out.length - 1];
	if (dist(last.x, last.y, out[0].x, out[0].y) < spacing / 2) out.pop();
	return out;
}

function perimeter(loop) {
	return loop.reduce((sum, p, i) => {
		let q = loop[(i + 1) % loop.length];
		return sum + dist(p.x, p.y, q.x, q.y);
	}, 0);
}

function polygon(loop) {
	beginShape();
	for (let p of loop) vertex(p.x, p.y);
	endShape(CLOSE);
}

// Stroke a spike's ring up to where the rake has travelled, ending in a round cap
function rakeSpike(spike, travel) {
	let { points, t } = spike;
	beginShape();
	for (let i = 0; i < points.length; i++) {
		if (t[i] > travel) {
			let a = points[i - 1],
				b = points[i],
				f = (travel - t[i - 1]) / (t[i] - t[i - 1]);
			vertex(lerp(a.x, b.x, f), lerp(a.y, b.y, f));
			break;
		}
		vertex(points[i].x, points[i].y);
	}
	endShape();
}

// Stroke the first `fraction` of a loop
function rakeLoop(loop, fraction) {
	if (fraction >= 1) return polygon(loop);
	let left = perimeter(loop) * fraction;
	beginShape();
	for (let i = 0; left > 0 && i < loop.length; i++) {
		let a = loop[i],
			b = loop[(i + 1) % loop.length];
		let seg = dist(a.x, a.y, b.x, b.y);
		vertex(a.x, a.y);
		if (seg >= left) vertex(lerp(a.x, b.x, left / seg), lerp(a.y, b.y, left / seg));
		left -= seg;
	}
	endShape();
}

// Three rings per group (one lap of the three-spike rake), raked group by group from the top.
// The inside of the outer ring is filled white, which cuts the straight lines off under the ring
// so they join it.
function drawRings() {
	let travel = ringTravel;
	for (let group of garden) {
		if (travel <= 0) break;
		push();
		noStroke();
		fill(255);
		for (let loop of group.outer) polygon(loop);
		pop();
		for (let spike of group.spikes) rakeSpike(spike, travel);
		for (let loop of group.holes) rakeLoop(loop, travel / group.length);
		travel -= group.length;
	}
}

function drawRocks() {
	push();
	noStroke();
	fill(255, 136, 0); // same orange as the Sisyphus goal
	for (let rock of rocks) circle(rock.x, rock.y, 2 * strokeW * rockSize);
	pop();
}

// While the sand is blank, click to place a rock or lift one; each click restarts the pause
function mousePressed() {
	if (resetTime === null) return;
	let hit = rocks.findIndex((rock) => dist(mouseX, mouseY, rock.x, rock.y) < strokeW * rockSize);
	if (hit >= 0) rocks.splice(hit, 1);
	else rocks.push({ x: mouseX, y: mouseY });
	resetTime = millis();
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
	let cycleDistance = 2 * turnDistance + 2 * lineDistance;
	let incompleteCycleDistance = turnDistance + lineDistance + turnDistance;

	// Check if fade completes, clear patterns and set resetTime
	if (completionTime && resetTime === null) {
		if (millis() - completionTime >= waitDuration + fadeInDuration) {
			patterns = [];
			resetTime = millis();
		}
	}

	// Check if restart wait is complete, then reset and restart
	if (resetTime !== null && millis() - resetTime >= restartWaitDuration) {
		resetAnimation();
	}

	// Rake the rings around the rocks before the straight lines
	if (patterns.length === 0 && resetTime === null) {
		ringTravel += speed;
		if (ringTravel >= garden.reduce((sum, group) => sum + group.length, 0)) {
			patterns.push({ travelDistance: 0, lineRightX: 0, yOffset: currentY, isFirst: true });
		}
	}

	// Update patterns (only if not fading and not in restart wait)
	if (patterns.length > 0 && !isFading && resetTime === null) {
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

	drawRings();

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
	if (resetTime !== null) {
		push();
		fill(255);
		noStroke();
		rect(0, 0, width, height);
		pop();
	}

	drawRocks(); // rocks stay while the sand fades
}

function windowResized() {
	if (!windowWidth || !windowHeight) return; // hidden: keep the garden as it is until shown again
	for (let rock of rocks) {
		rock.x *= windowWidth / width;
		rock.y *= windowHeight / height;
	}
	resizeCanvas(windowWidth, windowHeight);
	strokeW = windowHeight / (8 * numCompleteCycles + 13);
	gap = strokeW * 2;
	strokeWeight(strokeW);
	traceGarden();
}
