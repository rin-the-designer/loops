// A1 artwork

// Sizing (relative to artwork canvas width)
const A1_STROKE_WIDTH_RATIO = 10 / 100;
const A1_DOT_RADIUS_RATIO = 5 / 100;
const A1_DOT_COLOR = '#ff8800';

function drawA1(ctx, canvasX, canvasY, canvasWidth, canvasHeight) {
	const baseSize = canvasWidth;
	const strokeWidth = baseSize * A1_STROKE_WIDTH_RATIO;
	const dotRadius = baseSize * A1_DOT_RADIUS_RATIO;

	// Capsule stroke
	const rectWidth = canvasWidth * 0.6;
	const rectHeight = canvasHeight * 0.3;
	const rectX = canvasX + (canvasWidth - rectWidth) / 2;
	const rectY = canvasY + (canvasHeight - rectHeight) / 2;

	const x = rectX;
	const y = rectY;
	const w = rectWidth;
	const h = rectHeight;
	const r = Math.min(w, h) / 2;

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

	// Orange dot moving along the stroke
	const now = performance.now();
	const periodMs = 10000;
	const t = (now % periodMs) / periodMs;

	const isHorizontal = w >= h;
	const straightLen = (isHorizontal ? w : h) - 2 * r;
	const arcLen = Math.PI * r;
	const totalLen = 2 * straightLen + 2 * arcLen;
	const dist = t * totalLen;

	function pointOnCapsule(distance) {
		let d = distance;
		if (isHorizontal) {
			if (d <= straightLen) return { px: x + r + d, py: y };
			d -= straightLen;
			if (d <= arcLen) {
				const cx = x + w - r,
					cy = y + r;
				const ang = -Math.PI / 2 + (d / arcLen) * Math.PI;
				return { px: cx + r * Math.cos(ang), py: cy + r * Math.sin(ang) };
			}
			d -= arcLen;
			if (d <= straightLen) return { px: x + w - r - d, py: y + h };
			d -= straightLen;
			const cx = x + r,
				cy = y + r;
			const ang = Math.PI / 2 + (d / arcLen) * Math.PI;
			return { px: cx + r * Math.cos(ang), py: cy + r * Math.sin(ang) };
		} else {
			if (d <= straightLen) return { px: x + w, py: y + r + d };
			d -= straightLen;
			if (d <= arcLen) {
				const cx = x + r,
					cy = y + h - r;
				const ang = (d / arcLen) * Math.PI;
				return { px: cx + r * Math.cos(ang), py: cy + r * Math.sin(ang) };
			}
			d -= arcLen;
			if (d <= straightLen) return { px: x, py: y + h - r - d };
			d -= straightLen;
			const cx = x + w - r,
				cy = y + r;
			const ang = Math.PI + (d / arcLen) * Math.PI;
			return { px: cx + r * Math.cos(ang), py: cy + r * Math.sin(ang) };
		}
	}

	const { px, py } = pointOnCapsule(dist);
	ctx.beginPath();
	ctx.arc(px, py, dotRadius, 0, Math.PI * 2);
	ctx.fillStyle = A1_DOT_COLOR;
	ctx.fill();
}
