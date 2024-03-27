import BaseShape from './baseShape';

export const defaultArrowSpecs = {
	measurements: {
		width: 100,
		height: 10,
	},
};

export default class Arrow extends BaseShape {
	constructor(name, sX, sY) {
		super(name, sX, sY);
		this.name = name;
		this.sX = sX;
		this.sY = sY;
		this.type = 'arrow';
		this.props.borderRadius = 0;
		this.measurements.width = 100;
		this.measurements.height = 10;
	}

	get coordinates() {
		return [
			['M', this.sX, this.sY + this.measurements.height / 2],
			[
				'L',
				this.sX + this.measurements.width,
				this.sY + this.measurements.height / 2,
			],
			[
				'M',
				this.sX + this.measurements.width - this.props.borderWidth / 2,
				this.sY + this.measurements.height / 2,
			],
			['L', this.sX + this.measurements.width - 5, this.sY],
			[
				'M',
				this.sX + this.measurements.width - this.props.borderWidth / 2,
				this.sY + this.measurements.height / 2,
			],
			[
				'L',
				this.sX + this.measurements.width - 5,
				this.sY + this.measurements.height,
			],
		];
	}
}
