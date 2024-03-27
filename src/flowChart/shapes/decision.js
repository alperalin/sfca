import BaseShape, { defaultShapeSpecs } from './baseShape';

export default class Decision extends BaseShape {
	constructor({
		sX = defaultShapeSpecs.sX,
		sY = defaultShapeSpecs.sY,
		width = 150,
		height = 150,
		text = 'Decision',
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

		this.type = 'decision';
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
			['M', this.sX + this.width / 2, this.sY],
			['L', this.sX, this.sY + this.width / 2],
			['L', this.sX + this.width / 2, this.sY + this.height],
			['L', this.sX + this.width, this.sY + this.width / 2],
			['L', this.sX + this.width / 2, this.sY],
		];
	}
}
