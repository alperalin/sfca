import BaseShape, { defaultShapeSpecs } from './baseShape';

export default class StartEnd extends BaseShape {
	constructor({
		sX = defaultShapeSpecs.sX,
		sY = defaultShapeSpecs.sY,
		width = 150,
		height = 75,
		text = 'Start/End',
		backgroundColor = defaultShapeSpecs.backgroundColor,
		color = defaultShapeSpecs.color,
		borderWidth = defaultShapeSpecs.borderWidth,
		borderColor = defaultShapeSpecs.borderColor,
		borderRadius = 25,
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
			borderRadius,
			angle
		);

		this.type = 'startEnd';
		this.sX = sX;
		this.sY = sY;
		this.text = text;
		this.width = width;
		this.height = height;
		this.backgroundColor = backgroundColor;
		this.color = color;
		this.borderWidth = borderWidth;
		this.borderColor = borderColor;
		this.borderRadius = borderRadius;
		this.angle = angle;
	}

	get coordinates() {
		return [
			['M', this.sX + this.borderRadius, this.sY],
			['L', this.sX + this.width - this.borderRadius, this.sY],
			[
				'Q',
				this.sX + this.width,
				this.sY,
				this.sX + this.width,
				this.sY + this.borderRadius,
			],
			['L', this.sX + this.width, this.sY + this.height - this.borderRadius],
			[
				'Q',
				this.sX + this.width,
				this.sY + this.height,
				this.sX + this.width - this.borderRadius,
				this.sY + this.height,
			],
			['L', this.sX + this.borderRadius, this.sY + this.height],
			[
				'Q',
				this.sX,
				this.sY + this.height,
				this.sX,
				this.sY + this.height - this.borderRadius,
			],
			['L', this.sX, this.sY + this.borderRadius],
			['Q', this.sX, this.sY, this.sX + this.borderRadius, this.sY],
		];
	}
}
