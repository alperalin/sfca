export default function randomColor() {
	return `rgb(${Math.floor(Math.random() * 255 + 1)}, ${Math.floor(
		Math.random() * 255 + 1
	)}, ${Math.floor(Math.random() * 255 + 1)})`;
}
