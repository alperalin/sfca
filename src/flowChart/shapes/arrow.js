import BaseShape, { defaultShapeSpecs } from './baseShape';
export default class Arrow extends BaseShape {
	constructor({
		sX = defaultShapeSpecs.sX,
		sY = defaultShapeSpecs.sY,
		width = 100,
		height = 10,
		text = 'Arrow',
		backgroundColor = defaultShapeSpecs.backgroundColor,
		color = defaultShapeSpecs.color,
		borderWidth = defaultShapeSpecs.borderWidth,
		borderColor = defaultShapeSpecs.borderColor,
		angle = defaultShapeSpecs.angle,
	}) {
		super(
			sX,
			sY,
			width,
			height,
			text,
			backgroundColor,
			color,
			borderWidth,
			borderColor,
			angle
		);

		this.type = 'arrow';
		this.sX = sX;
		this.sY = sY;
		this.text = text;
		this.width = width;
		this.height = height;
		this.backgroundColor = backgroundColor;
		this.color = color;
		this.borderWidth = borderWidth;
		this.borderColor = borderColor;
		this.borderRadius = 0;
		this.angle = angle;
	}

	get coordinates() {
		return [
			['M', this.sX, this.sY + this.height / 2],
			['L', this.sX + this.width, this.sY + this.height / 2],
			[
				'M',
				this.sX + this.width - this.borderWidth / 2,
				this.sY + this.height / 2,
			],
			['L', this.sX + this.width - 5, this.sY],
			[
				'M',
				this.sX + this.width - this.borderWidth / 2,
				this.sY + this.height / 2,
			],
			['L', this.sX + this.width - 5, this.sY + this.height],
		];
	}
}
