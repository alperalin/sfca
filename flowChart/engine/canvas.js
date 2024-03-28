import { addRetinaSupport } from '../utils';
import baseEngine from './baseEngine';

export default class Canvas extends baseEngine {
	constructor(wrapper, id, width, height) {
		super(wrapper, id, width, height);
		this.canvasInstance = '';
		this.ctx = '';
		this.init();
	}

	clear() {
		this.ctx.clearRect(
			0,
			0,
			this.canvasInstance.offsetWidth,
			this.canvasInstance.offsetHeight
		);
	}

	getContext() {
		return this.canvasInstance.getContext('2d');
	}

	render() {
		this.clear();
		this.createdShapes.forEach((shape) => {
			this.ctx.save();
			this.ctx.beginPath();

			// Rotation
			this.ctx.translate(
				shape.sX + shape.width / 2,
				shape.sY + shape.height / 2
			); // translate to center
			this.ctx.rotate((Math.PI / 180) * shape.angle); // rotate
			this.ctx.translate(
				-(shape.sX + shape.width / 2),
				-(shape.sY + shape.height / 2)
			); // translate back

			shape.coordinates.forEach((coordinate) => {
				switch (coordinate[0]) {
					case 'M':
						this.ctx.moveTo(coordinate[1], coordinate[2]);
						break;
					case 'L':
						this.ctx.lineTo(coordinate[1], coordinate[2]);
						break;
					case 'Q':
						this.ctx.quadraticCurveTo(
							coordinate[1],
							coordinate[2],
							coordinate[3],
							coordinate[4]
						);
						break;
				}
			});
			this.ctx.fillStyle = shape.backgroundColor;
			this.ctx.fill();
			this.ctx.lineWidth = shape.borderWidth;
			this.ctx.strokeStyle = shape.borderColor;
			this.ctx.stroke();
			this.ctx.closePath();
			if (shape.outline) {
				this.ctx.beginPath();
				this.ctx.lineWidth = shape.outlineBorderWidth;
				this.ctx.strokeStyle = shape.outlineBorderColor;
				this.ctx.strokeRect(shape.sX, shape.sY, shape.width, shape.height);
				this.ctx.closePath();
			}

			if (shape.text) {
				this.ctx.font = shape.font;
				this.ctx.fillStyle = shape.color;
				if (shape.type !== 'arrow') this.ctx.textBaseline = 'middle';
				this.ctx.fillText(
					shape.text,
					shape.sX + shape.width / 4,
					shape.sY + shape.height / 2
				);
			}

			this.ctx.restore();
		});
	}

	init() {
		const canvasEl = document.createElement('canvas');

		canvasEl.id = this.id;
		canvasEl.width = this.width;
		canvasEl.height = this.height;
		canvasEl.textContent =
			'This is a canvas element. If you see this probably your browser does not support canvas element.';

		this.canvasInstance = canvasEl;
		this.ctx = this.canvasInstance.getContext('2d');
		this.canvasInstance.addEventListener('pointerdown', this.handlePointerDown);
		this.canvasInstance.addEventListener('pointerup', this.handlePointerUp);
		this.canvasInstance.addEventListener('pointermove', this.handlePointerMove);

		this.sceneWrapper.appendChild(canvasEl);
		this.wrapper.appendChild(this.sceneWrapper);

		addRetinaSupport({
			canvas: this.canvasInstance,
			ctx: this.ctx,
			width: this.width,
			height: this.height,
		});

		this.addActions();
	}
}
