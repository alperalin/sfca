function addRetinaSupport({ canvas, ctx, size }) {
	// Set display size (css pixels).
	canvas.style.width = `${size}px`;
	canvas.style.height = `${size}px`;

	// Set actual size in memory (scaled to account for extra pixel density).
	const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
	canvas.width = Math.floor(size * scale);
	canvas.height = Math.floor(size * scale);

	// Normalize coordinate system to use CSS pixels.
	ctx.scale(scale, scale);
}

export default addRetinaSupport;
