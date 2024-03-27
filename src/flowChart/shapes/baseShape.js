export const defaultShapeSpecs = {
	sX: 0,
	sY: 0,
	measurements: {
		width: 150,
		height: 75,
	},
	props: {
		font: '28px serif',
		color: '#000000',
		backgroundColor: '#ffffff',
		borderWidth: 2,
		borderColor: '#000000',
		borderRadius: 0,
		rotateDeg: 0,
		outline: {
			show: false,
			borderWidth: 1,
			borderColor: '#3498DB',
		},
	},
};

export default class BaseShape {
	constructor(
		name,
		type,
		sX = defaultShapeSpecs.sX,
		sY = defaultShapeSpecs.sY,
		measurements = {
			...defaultShapeSpecs.measurements,
		},
		props = {
			...defaultShapeSpecs.props,
		}
	) {
		this.name = name;
		this.type = type;

		this.sX = sX;
		this.sY = sY;

		this.measurements = {
			width: measurements.width,
			height: measurements.height,
		};

		this.props = {
			font: props.font,
			color: props.color,
			backgroundColor: props.backgroundColor,
			borderWidth: props.borderWidth,
			borderColor: props.borderColor,
			borderRadius: props.borderRadius,
			rotateDeg: props.rotateDeg,
			outline: {
				show: props.outline.show,
				borderWidth: props.outline.borderWidth,
				borderColor: props.outline.borderColor,
			},
		};
	}

	get coordinates() {
		return [];
	}

	get values() {
		return {
			name: this.name,
			type: this.type,
			sX: this.sX,
			sY: this.sY,
			coordinates: this.coordinates,
			measurements: {
				width: this.measurements.width,
				height: this.measurements.height,
			},
			props: {
				font: this.props.font,
				color: this.props.color,
				backgroundColor: this.props.backgroundColor,
				borderWidth: this.props.borderWidth,
				borderColor: this.props.borderColor,
				borderRadius: this.props.borderRadius,
				rotateDeg: this.props.rotateDeg,
				outline: {
					show: this.props.outline.show,
					borderWidth: this.props.outline.borderWidth,
					borderColor: this.props.outline.borderColor,
				},
			},
		};
	}
}
