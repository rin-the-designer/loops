// Constants
const VIEWBOX_WIDTH = 1920;
const VIEWBOX_HEIGHT = 1080;
const ARC_DURATION = 20000; // Sun arc loop duration
const CONDITION_DURATION = 463000; // Long condition cycle

// DOM elements
const svg = document.getElementById("scene");
const elements = {
	sun: document.getElementById("sun"),
	sunAura: document.getElementById("sunAura"),
	hazeLayer: document.getElementById("hazeLayer"),
	turbulence: document.getElementById("turbulence"),
	seamLight: document.getElementById("seamLight"),
	hills: document.getElementById("hills"),
	skyTop: document.getElementById("skyTop"),
	skyBottom: document.getElementById("skyBottom"),
	auraStop1: document.getElementById("auraStop1"),
	auraStop2: document.getElementById("auraStop2"),
	auraStop3: document.getElementById("auraStop3"),
	riverTop: document.getElementById("riverTop"),
	riverBottom: document.getElementById("riverBottom"),
	sunBlur1: document.getElementById("sunBlur1"),
	sunBlur2: document.getElementById("sunBlur2"),
	groundStops: document.querySelectorAll("#groundShade stop")
};

svg.setAttribute("preserveAspectRatio", "xMidYMid slice");

// Mouse/touch tracking
let mouseTarget = 0.5;
let mouseCurrent = 0.5;

window.addEventListener("mousemove", (e) => {
	mouseTarget = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
});

window.addEventListener("touchmove", (e) => {
	if (e.touches?.[0]) {
		mouseTarget = Math.max(0, Math.min(1, e.touches[0].clientX / window.innerWidth));
	}
}, { passive: true });

// Utility functions
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const smoothstep = (edge0, edge1, x) => {
	const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
	return t * t * (3 - 2 * t);
};

// Color utilities (handles hex and rgb() strings)
function parseColor(c) {
	if (typeof c !== "string") return { r: 0, g: 0, b: 0 };
	const rgb = c.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
	if (rgb) return { r: +rgb[1], g: +rgb[2], b: +rgb[3] };
	const clean = c.replace("#", "");
	const bigint = parseInt(clean, 16);
	return {
		r: (bigint >> 16) & 255,
		g: (bigint >> 8) & 255,
		b: bigint & 255
	};
}

function mixColor(c1, c2, t) {
	const a = parseColor(c1);
	const b = parseColor(c2);
	return `rgb(${Math.round(lerp(a.r, b.r, t))}, ${Math.round(lerp(a.g, b.g, t))}, ${Math.round(lerp(a.b, b.b, t))})`;
}

// Viewport calculations
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

// Sun profiles
const sunProfiles = [
	{
		name: "thin",
		sunColorLow: "#f7bf59", sunColorHigh: "#ffcf73",
		auraColor1: "#ffd98a", auraColor2: "#ffcb74", auraColor3: "#ffffff",
		skyTop: "#ffffff", skyBottom: "#eef3f7",
		riverTop: "#5fa8ff", riverBottom: "#0b66d1",
		hillTop: "#161616", hillBottom: "#000000",
		blur1: 8, blur2: 20,
		auraMin: 105, auraMax: 150,
		opacityMin: 0.18, opacityMax: 0.42,
		hazeBase: 0.02, hazeGain: 0.05,
		shimmer: 0.1, seamGain: 0.22, noonBias: 0.1
	},
	{
		name: "white",
		sunColorLow: "#ffe9a6", sunColorHigh: "#fff8df",
		auraColor1: "#fff4cb", auraColor2: "#fff7df", auraColor3: "#ffffff",
		skyTop: "#fffdf6", skyBottom: "#ebeef2",
		riverTop: "#92bfff", riverBottom: "#5a90d8",
		hillTop: "#2a2a2a", hillBottom: "#101010",
		blur1: 12, blur2: 30,
		auraMin: 130, auraMax: 190,
		opacityMin: 0.22, opacityMax: 0.55,
		hazeBase: 0.12, hazeGain: 0.12,
		shimmer: 0.04, seamGain: 0.08, noonBias: 0.22
	},
	{
		name: "returning",
		sunColorLow: "#ffb84e", sunColorHigh: "#ff9300",
		auraColor1: "#ffd27a", auraColor2: "#ffb347", auraColor3: "#ffffff",
		skyTop: "#ffffff", skyBottom: "#f1f1f1",
		riverTop: "#4aa3ff", riverBottom: "#0069da",
		hillTop: "#111111", hillBottom: "#000000",
		blur1: 18, blur2: 42,
		auraMin: 135, auraMax: 220,
		opacityMin: 0.35, opacityMax: 0.7,
		hazeBase: 0.05, hazeGain: 0.1,
		shimmer: 0.08, seamGain: 0.35, noonBias: 0.15
	},
	{
		name: "heavy",
		sunColorLow: "#ff9d3a", sunColorHigh: "#ff7a00",
		auraColor1: "#ffc46a", auraColor2: "#ff9f3f", auraColor3: "#fff3d2",
		skyTop: "#fff7ea", skyBottom: "#e6ecef",
		riverTop: "#2f7de5", riverBottom: "#0052b8",
		hillTop: "#0d0d0d", hillBottom: "#000000",
		blur1: 26, blur2: 58,
		auraMin: 170, auraMax: 280,
		opacityMin: 0.45, opacityMax: 0.9,
		hazeBase: 0.14, hazeGain: 0.18,
		shimmer: 0.03, seamGain: 0.16, noonBias: 0.08
	},
	{
		name: "burning",
		sunColorLow: "#ff9d39", sunColorHigh: "#fff0a3",
		auraColor1: "#ffe08c", auraColor2: "#ffd05e", auraColor3: "#fff8de",
		skyTop: "#fff8ef", skyBottom: "#f4efe4",
		riverTop: "#69c0ff", riverBottom: "#1284ff",
		hillTop: "#17110d", hillBottom: "#030303",
		blur1: 10, blur2: 24,
		auraMin: 120, auraMax: 170,
		opacityMin: 0.28, opacityMax: 0.6,
		hazeBase: 0.04, hazeGain: 0.08,
		shimmer: 0.22, seamGain: 0.5, noonBias: 0.42
	}
];

// Profile blending
function blendProfiles(a, b, t) {
	return {
		sunColorLow: mixColor(a.sunColorLow, b.sunColorLow, t),
		sunColorHigh: mixColor(a.sunColorHigh, b.sunColorHigh, t),
		auraColor1: mixColor(a.auraColor1, b.auraColor1, t),
		auraColor2: mixColor(a.auraColor2, b.auraColor2, t),
		auraColor3: mixColor(a.auraColor3, b.auraColor3, t),
		skyTop: mixColor(a.skyTop, b.skyTop, t),
		skyBottom: mixColor(a.skyBottom, b.skyBottom, t),
		riverTop: mixColor(a.riverTop, b.riverTop, t),
		riverBottom: mixColor(a.riverBottom, b.riverBottom, t),
		hillTop: mixColor(a.hillTop, b.hillTop, t),
		hillBottom: mixColor(a.hillBottom, b.hillBottom, t),
		blur1: lerp(a.blur1, b.blur1, t),
		blur2: lerp(a.blur2, b.blur2, t),
		auraMin: lerp(a.auraMin, b.auraMin, t),
		auraMax: lerp(a.auraMax, b.auraMax, t),
		opacityMin: lerp(a.opacityMin, b.opacityMin, t),
		opacityMax: lerp(a.opacityMax, b.opacityMax, t),
		hazeBase: lerp(a.hazeBase, b.hazeBase, t),
		hazeGain: lerp(a.hazeGain, b.hazeGain, t),
		shimmer: lerp(a.shimmer, b.shimmer, t),
		seamGain: lerp(a.seamGain, b.seamGain, t),
		noonBias: lerp(a.noonBias, b.noonBias, t)
	};
}

function getSunProfile(mouseX) {
	const count = sunProfiles.length;
	const scaled = mouseX * (count - 1);
	const index = Math.floor(scaled);
	const nextIndex = Math.min(index + 1, count - 1);
	const localT = smoothstep(0, 1, scaled - index);
	return blendProfiles(sunProfiles[index], sunProfiles[nextIndex], localT);
}

// Animation
function animate(now) {
	mouseCurrent = lerp(mouseCurrent, mouseTarget, 0.03);

	const arcT = (now % ARC_DURATION) / ARC_DURATION;
	const longT = (now % CONDITION_DURATION) / CONDITION_DURATION;
	const visible = getVisibleViewBoxBounds();

	// Sun position
	const x = lerp(visible.left, visible.right, arcT);
	const edgeY = visible.bottom;
	const arcHeight = visible.height * 0.67;
	const yBase = edgeY - Math.sin(arcT * Math.PI) * arcHeight;
	const placeTilt = (mouseCurrent - 0.5) * 80;
	const y = yBase + placeTilt * (arcT - 0.5);

	elements.sun.setAttribute("cx", x.toFixed(2));
	elements.sun.setAttribute("cy", y.toFixed(2));
	elements.sunAura.setAttribute("cx", x.toFixed(2));
	elements.sunAura.setAttribute("cy", y.toFixed(2));

	// Hills
	elements.hills.setAttribute(
		"d",
		`M649.5 780.168L${visible.left} 905V${visible.bottom}H${visible.right}V754H1445.5L1055 832.5L649.5 780.168Z`
	);

	// Profile and waves
	const profile = getSunProfile(mouseCurrent);
	const noonFactor = Math.sin(arcT * Math.PI);
	const longWaveA = 0.5 + 0.5 * Math.sin(longT * Math.PI * 2);
	const longWaveB = 0.5 + 0.5 * Math.sin(longT * Math.PI * 2 * 0.61 + 1.3);
	const longWaveC = 0.5 + 0.5 * Math.sin(longT * Math.PI * 2 * 1.37 + 2.1);

	const warmth = clamp(noonFactor * (0.65 + profile.noonBias) + longWaveA * 0.25, 0, 1);
	const haze = clamp(profile.hazeBase + profile.hazeGain * longWaveB, 0, 1);
	const bloom = clamp(noonFactor * 0.7 + longWaveC * 0.3, 0, 1);
	const shimmerAmount = profile.shimmer * (0.35 + noonFactor * 0.65);
	const seamGlow = clamp(
		0.04 + profile.seamGain * Math.max(0, 1 - Math.abs(x - 1040) / 240) * (0.45 + haze + noonFactor * 0.35),
		0,
		1
	);

	// Sun
	elements.sun.setAttribute("fill", mixColor(profile.sunColorLow, profile.sunColorHigh, warmth));
	elements.sunBlur1.setAttribute("stdDeviation", lerp(profile.blur1, profile.blur1 * 1.35, bloom).toFixed(2));
	elements.sunBlur2.setAttribute("stdDeviation", lerp(profile.blur2, profile.blur2 * 1.45, bloom).toFixed(2));

	// Aura
	const auraR = lerp(profile.auraMin, profile.auraMax, bloom);
	elements.sunAura.setAttribute("r", auraR.toFixed(2));
	elements.auraStop1.setAttribute("stop-color", mixColor(profile.auraColor1, "#ffffff", haze * 0.2));
	elements.auraStop2.setAttribute("stop-color", mixColor(profile.auraColor2, profile.sunColorHigh, bloom * 0.35));
	elements.auraStop3.setAttribute("stop-color", profile.auraColor3);
	elements.sunAura.setAttribute("opacity", lerp(profile.opacityMin, profile.opacityMax, bloom).toFixed(3));

	// Sky
	elements.skyTop.setAttribute("stop-color", mixColor(profile.skyTop, "#ffffff", longWaveA * 0.08));
	elements.skyBottom.setAttribute("stop-color", mixColor(profile.skyBottom, "#eef3f7", haze * 0.18));

	// River
	elements.riverTop.setAttribute("stop-color", mixColor(profile.riverTop, "#ffffff", shimmerAmount * 0.18));
	elements.riverBottom.setAttribute("stop-color", mixColor(profile.riverBottom, profile.riverTop, warmth * 0.15));

	// Ground
	elements.groundStops[0].setAttribute("stop-color", mixColor(profile.hillTop, "#3b3127", noonFactor * 0.08));
	elements.groundStops[1].setAttribute("stop-color", profile.hillBottom);

	// Haze
	elements.hazeLayer.setAttribute("opacity", (haze + shimmerAmount * 0.16).toFixed(3));
	const baseX = lerp(0.0012, 0.0035, haze) + shimmerAmount * 0.0025;
	const baseY = lerp(0.005, 0.014, haze) + shimmerAmount * 0.006;
	elements.turbulence.setAttribute("baseFrequency", `${baseX.toFixed(4)} ${baseY.toFixed(4)}`);
	elements.turbulence.setAttribute("seed", String(7 + Math.floor(longWaveC * 30) + Math.floor(mouseCurrent * 9)));
	elements.turbulence.setAttribute("numOctaves", (haze > 0.18 || shimmerAmount > 0.08) ? "3" : "2");

	// Seam
	elements.seamLight.setAttribute("stroke-opacity", seamGlow.toFixed(3));

	requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
