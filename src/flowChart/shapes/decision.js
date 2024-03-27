import BaseShape from './baseShape';

export const defaultDecisionSpecs = {
	measurements: {
		width: 150,
		height: 150,
	},
};

export default class Decision extends BaseShape {
	constructor(name, sX, sY) {
		super(name, sX, sY);
		this.name = name;
		this.sX = sX;
		this.sY = sY;
		this.type = 'decision';
		this.props.borderRadius = 0;
		this.measurements.width = 150;
		this.measurements.height = 150;
	}

	get coordinates() {
		return [
			['M', this.sX + this.measurements.width / 2, this.sY],
			['L', this.sX, this.sY + this.measurements.width / 2],
			[
				'L',
				this.sX + this.measurements.width / 2,
				this.sY + this.measurements.height,
			],
			[
				'L',
				this.sX + this.measurements.width,
				this.sY + this.measurements.width / 2,
			],
			['L', this.sX + this.measurements.width / 2, this.sY],
		];
	}
}
