export const defaultShapeSpecs = {
	type: '',
	sX: 0,
	sY: 0,
	width: 150,
	height: 75,
	backgroundColor: '#ffffff',
	color: '#000000',
	borderWidth: 2,
	borderColor: '#000000',
	borderRadius: 0,
	angle: 0,
	text: '',
	font: '28px serif',
	outline: false,
	outlineBorderWidth: 1,
	outlineBorderColor: '#3498DB',
};

export default class BaseShape {
	constructor({
		sX = defaultShapeSpecs.sX,
		sY = defaultShapeSpecs.sY,
		width = defaultShapeSpecs.width,
		height = defaultShapeSpecs.height,
		text = defaultShapeSpecs.text,
		backgroundColor = defaultShapeSpecs.backgroundColor,
		color = defaultShapeSpecs.color,
		borderWidth = defaultShapeSpecs.borderWidth,
		borderColor = defaultShapeSpecs.borderColor,
		borderRadius = defaultShapeSpecs.borderRadius,
		angle = defaultShapeSpecs.angle,
	}) {
		this.type = defaultShapeSpecs.type;
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
		this.font = defaultShapeSpecs.font;
		this.outline = defaultShapeSpecs.outline;
		this.outlineBorderWidth = defaultShapeSpecs.outlineBorderWidth;
		this.outlineBorderColor = defaultShapeSpecs.outlineBorderColor;
	}

	get values() {
		return {
			type: this.type,
			sX: this.sX,
			sY: this.sY,
			width: this.width,
			height: this.height,
			backgroundColor: this.backgroundColor,
			color: this.color,
			borderWidth: this.borderWidth,
			borderColor: this.borderColor,
			borderRadius: this.borderRadius,
			angle: this.angle,
			font: this.font,
			outline: this.outline,
			outlineBorderWidth: this.outlineBorderWidth,
			outlineBorderColor: this.outlineBorderColor,
		};
	}
}
