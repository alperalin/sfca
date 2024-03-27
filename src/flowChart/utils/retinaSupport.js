function addRetinaSupport({ canvas, ctx, width, height }) {
	// Set display width, height (css pixels).
	canvas.style.width = `${width}px`;
	canvas.style.height = `${height}px`;

	// Set actual width, height in memory (scaled to account for extra pixel density).
	const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
	canvas.width = Math.floor(width * scale);
	canvas.height = Math.floor(height * scale);

	// Normalize coordinate system to use CSS pixels.
	ctx.scale(scale, scale);
}

export default addRetinaSupport;
