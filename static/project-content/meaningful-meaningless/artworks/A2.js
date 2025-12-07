// A2 artwork - Random walk with persistent trail

// Sizing (relative to artwork canvas width)
const A2_STROKE_WIDTH_RATIO = 10 / 100;
const A2_DOT_RADIUS_RATIO = 5 / 100;
const A2_LAP_PERIOD_MS = 10000; // Same as A1: 10 seconds per lap
const A2_SPEED_RATIO = 2.5 / 1000; // Used for free phase only
const A2_TURN_RATE = 0.2;
const A2_TRAIL_FADE_MS = 40000;
const A2_TRAIL_FADE_ENABLED = true;
const A2_DOT_COLOR = '#ff8800';

// Offscreen buffer
let A2Buffer = null;
let A2BufferCtx = null;
let A2BufferW = 0;
let A2BufferH = 0;

// Particle state
let A2PosX = null;
let A2PosY = null;
let A2VelX = 0;
let A2VelY = 0;

// Phase: 'lap' → 'free'
let A2Phase = 'lap';
let A2LapProgress = 0;
let A2LapStartTime = null;
let A2RectFadeStart = null;
let A2LastUpdateTime = null;

// Trail points [{x,y,t}]
let A2Trail = [];

function ensureA2Buffer(width, height) {
	if (!A2Buffer || width !== A2BufferW || height !== A2BufferH) {
		A2Buffer = document.createElement('canvas');
		A2Buffer.width = Math.max(1, Math.floor(width));
		A2Buffer.height = Math.max(1, Math.floor(height));
		A2BufferCtx = A2Buffer.getContext('2d');
		A2BufferW = width;
		A2BufferH = height;

		// Reset
		A2BufferCtx.clearRect(0, 0, A2Buffer.width, A2Buffer.height);
		A2PosX = width / 2;
		A2PosY = height / 2;
		A2VelX = 0;
		A2VelY = 0;
		A2Phase = 'lap';
		A2LapProgress = 0;
		A2LapStartTime = null;
		A2RectFadeStart = null;
		A2LastUpdateTime = null;
		A2Trail = [];
	}
}

function drawA2(ctx, canvasX, canvasY, canvasWidth, canvasHeight) {
	const baseSize = canvasWidth;
	const strokeWidth = Math.max(1, baseSize * A2_STROKE_WIDTH_RATIO);
	const dotRadius = Math.max(1.5, baseSize * A2_DOT_RADIUS_RATIO);
	const speed = baseSize * A2_SPEED_RATIO;

	ensureA2Buffer(canvasWidth, canvasHeight);

	// Capsule (lap only)
	const rectWidth = canvasWidth * 0.6;
	const rectHeight = canvasHeight * 0.3;
	const x = canvasX + (canvasWidth - rectWidth) / 2;
	const y = canvasY + (canvasHeight - rectHeight) / 2;
	const w = rectWidth;
	const h = rectHeight;
	const r = Math.min(w, h) / 2;

	if (A2Phase === 'lap') {
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(x + r, y);
		ctx.arcTo(x + w, y, x + w, y + h, r);
		ctx.arcTo(x + w, y + h, x, y + h, r);
		ctx.arcTo(x, y + h, x, y, r);
		ctx.arcTo(x, y, x + w, y, r);
		ctx.closePath();
		ctx.strokeStyle = '#000000';
		ctx.lineWidth = strokeWidth;
		ctx.stroke();
		ctx.restore();
	}

	// Parametric capsule path
	const isHorizontal = w >= h;
	const straightLen = (isHorizontal ? w : h) - 2 * r;
	const arcLen = Math.PI * r;
	const totalLen = 2 * straightLen + 2 * arcLen;
	function pointOnCapsule(distance) {
		let d = distance;
		if (isHorizontal) {
			if (d <= straightLen) return { px: x + r + d, py: y };
			d -= straightLen;
			if (d <= arcLen) {
				const cx = x + w - r,
					cy = y + r;
				const a = -Math.PI / 2 + (d / arcLen) * Math.PI;
				return { px: cx + r * Math.cos(a), py: cy + r * Math.sin(a) };
			}
			d -= arcLen;
			if (d <= straightLen) return { px: x + w - r - d, py: y + h };
			d -= straightLen;
			const cx = x + r,
				cy = y + r;
			const a = Math.PI / 2 + (d / arcLen) * Math.PI;
			return { px: cx + r * Math.cos(a), py: cy + r * Math.sin(a) };
		} else {
			if (d <= straightLen) return { px: x + w, py: y + r + d };
			d -= straightLen;
			if (d <= arcLen) {
				const cx = x + r,
					cy = y + h - r;
				const a = (d / arcLen) * Math.PI;
				return { px: cx + r * Math.cos(a), py: cy + r * Math.sin(a) };
			}
			d -= arcLen;
			if (d <= straightLen) return { px: x, py: y + h - r - d };
			d -= straightLen;
			const cx = x + w - r,
				cy = y + r;
			const a = Math.PI + (d / arcLen) * Math.PI;
			return { px: cx + r * Math.cos(a), py: cy + r * Math.sin(a) };
		}
	}

	// Motion + trail
	const trailWidth = dotRadius * 2;
	const now = performance.now();

	if (A2Phase === 'lap') {
		// Initialize lap start time on first frame
		if (A2LapStartTime === null) {
			A2LapStartTime = now;
		}

		// Calculate progress based on elapsed time (same as A1: 10 seconds per lap)
		const elapsed = now - A2LapStartTime;
		const prevProgress = A2LapProgress;
		A2LapProgress = Math.min(1, elapsed / A2_LAP_PERIOD_MS);

		const prevDist = prevProgress * totalLen;
		const currDist = A2LapProgress * totalLen;

		const prevP = pointOnCapsule(prevDist);
		const currP = pointOnCapsule(currDist);

		A2PosX = currP.px - canvasX;
		A2PosY = currP.py - canvasY;

		A2Trail.push({ x: A2PosX, y: A2PosY, t: now });

		if (A2LapProgress >= 1) {
			A2Phase = 'free';
			A2RectFadeStart = now;
			A2LastUpdateTime = now;
			const dx = currP.px - prevP.px || speed;
			const dy = currP.py - prevP.py || 0;
			const mag = Math.hypot(dx, dy) || 1;
			// Convert speed from pixels per frame (at 60fps) to pixels per millisecond
			// Original: speed pixels/frame * 60 frames/sec / 1000 ms/sec = speed * 0.06 pixels/ms
			const speedPerMs = speed * 0.06;
			A2VelX = (dx / mag) * speedPerMs;
			A2VelY = (dy / mag) * speedPerMs;
		}
	} else {
		// Initialize last update time on first frame of free phase
		if (A2LastUpdateTime === null) {
			A2LastUpdateTime = now;
		}

		// Calculate delta time for frame-rate independent movement
		const deltaTime = now - A2LastUpdateTime;
		A2LastUpdateTime = now;

		const a = Math.atan2(A2VelY, A2VelX) || 0;
		const turn = (Math.random() - 0.5) * 2 * A2_TURN_RATE;
		const na = a + turn;
		// Convert speed from pixels per frame (at 60fps) to pixels per millisecond
		// Original: speed pixels/frame * 60 frames/sec / 1000 ms/sec = speed * 0.06 pixels/ms
		const speedPerMs = speed * 0.06;
		A2VelX = Math.cos(na) * speedPerMs;
		A2VelY = Math.sin(na) * speedPerMs;

		A2PosX += A2VelX * deltaTime;
		A2PosY += A2VelY * deltaTime;

		const minX = dotRadius,
			minY = dotRadius;
		const maxX = canvasWidth - dotRadius,
			maxY = canvasHeight - dotRadius;

		let bounced = false;
		if (A2PosX < minX) {
			A2PosX = minX;
			A2VelX *= -1;
			bounced = true;
		}
		if (A2PosX > maxX) {
			A2PosX = maxX;
			A2VelX *= -1;
			bounced = true;
		}
		if (A2PosY < minY) {
			A2PosY = minY;
			A2VelY *= -1;
			bounced = true;
		}
		if (A2PosY > maxY) {
			A2PosY = maxY;
			A2VelY *= -1;
			bounced = true;
		}
		if (bounced) {
			const ba = Math.atan2(A2VelY, A2VelX) + (Math.random() - 0.5) * 0.2;
			const speedPerMs = speed * 0.06;
			A2VelX = Math.cos(ba) * speedPerMs;
			A2VelY = Math.sin(ba) * speedPerMs;
		}

		A2Trail.push({ x: A2PosX, y: A2PosY, t: now });
	}

	// Fade + redraw trail
	if (A2_TRAIL_FADE_ENABLED) {
		const cutoff = now - A2_TRAIL_FADE_MS;
		while (A2Trail.length && A2Trail[0].t < cutoff) A2Trail.shift();
	}

	A2BufferCtx.clearRect(0, 0, A2Buffer.width, A2Buffer.height);
	A2BufferCtx.lineCap = 'round';
	A2BufferCtx.lineWidth = trailWidth;
	for (let i = 1; i < A2Trail.length; i++) {
		const p0 = A2Trail[i - 1];
		const p1 = A2Trail[i];
		const age = now - p1.t;
		const alpha = A2_TRAIL_FADE_ENABLED ? Math.max(0, Math.min(1, 1 - age / A2_TRAIL_FADE_MS)) : 1;
		if (alpha <= 0) continue;
		A2BufferCtx.strokeStyle = `rgba(0,0,0,${alpha})`;
		A2BufferCtx.beginPath();
		A2BufferCtx.moveTo(p0.x, p0.y);
		A2BufferCtx.lineTo(p1.x, p1.y);
		A2BufferCtx.stroke();
	}

	// Render
	ctx.drawImage(A2Buffer, canvasX, canvasY);
	ctx.beginPath();
	ctx.arc(canvasX + A2PosX, canvasY + A2PosY, dotRadius, 0, Math.PI * 2);
	ctx.fillStyle = A2_DOT_COLOR;
	ctx.fill();
}
