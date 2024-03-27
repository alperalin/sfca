import BaseShape from './baseShape';

export default class InputOutput extends BaseShape {
	constructor(name, sX, sY) {
		super(name, sX, sY);
		this.name = name;
		this.sX = sX;
		this.sY = sY;
		this.type = 'inputOutput';
		this.props.borderRadius = 4;
	}

	get coordinates() {
		return [
			['M', this.sX + 20 + this.props.borderRadius, this.sY],
			[
				'L',
				this.sX + this.measurements.width - this.props.borderRadius,
				this.sY,
			],
			[
				'Q',
				this.sX + this.measurements.width,
				this.sY,
				this.sX + this.measurements.width,
				this.sY + this.props.borderRadius,
			],
			[
				'L',
				this.sX + this.measurements.width - 20,
				this.sY + this.measurements.height - this.props.borderRadius,
			],
			[
				'Q',
				this.sX + this.measurements.width - 20,
				this.sY + this.measurements.height,
				this.sX + this.measurements.width - 20 - this.props.borderRadius,
				this.sY + this.measurements.height,
			],
			[
				'L',
				this.sX + this.props.borderRadius,
				this.sY + this.measurements.height,
			],
			[
				'Q',
				this.sX,
				this.sY + this.measurements.height,
				this.sX,
				this.sY + this.measurements.height - this.props.borderRadius,
			],
			['L', this.sX + 20, this.sY + this.props.borderRadius],
			[
				'Q',
				this.sX + 20,
				this.sY,
				this.sX + 20 + this.props.borderRadius,
				this.sY,
			],
		];
	}
}
