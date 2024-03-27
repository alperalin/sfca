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
				shape.sX + shape.measurements.width / 2,
				shape.sY + shape.measurements.height / 2
			); // translate to center
			this.ctx.rotate((Math.PI / 180) * shape.props.rotateDeg); // rotate
			this.ctx.translate(
				-(shape.sX + shape.measurements.width / 2),
				-(shape.sY + shape.measurements.height / 2)
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
			this.ctx.fillStyle = shape.props.backgroundColor;
			this.ctx.fill();
			this.ctx.lineWidth = shape.props.borderWidth;
			this.ctx.strokeStyle = shape.props.borderColor;
			this.ctx.stroke();
			this.ctx.closePath();
			if (shape.props.outline.show) {
				this.ctx.beginPath();
				this.ctx.lineWidth = shape.props.outline.borderWidth;
				this.ctx.strokeStyle = shape.props.outline.borderColor;
				this.ctx.strokeRect(
					shape.sX,
					shape.sY,
					shape.measurements.width,
					shape.measurements.height
				);
				this.ctx.closePath();
			}
			this.ctx.restore();
		});
		// this.ctx.font = this.props.font;
		// this.ctx.fillStyle = this.props.color;
		// this.ctx.fillText(
		// 	'Start/End',
		// 	this.coordinates.x + this.props.borderRadius,
		// 	this.coordinates.y + this.measurements.height / 2,
		// 	this.measurements.width
		// );
	}

	init() {
		const canvasEl = document.createElement('canvas');
		canvasEl.id = this.id;
		canvasEl.width = this.width;
		canvasEl.height = this.height;
		canvasEl.textContent =
			'This is a canvas element. If you see this probably your browser does not support canvas element.';
		this.wrapper.appendChild(canvasEl);
		this.canvasInstance = canvasEl;
		this.ctx = this.canvasInstance.getContext('2d');
		this.canvasInstance.addEventListener('pointerdown', this.handlePointerDown);
		this.canvasInstance.addEventListener('pointerup', this.handlePointerUp);
		this.canvasInstance.addEventListener('pointermove', this.handlePointerMove);
		addRetinaSupport({
			canvas: this.canvasInstance,
			ctx: this.ctx,
			size: this.width,
		});
		this.addActions();
	}
}
