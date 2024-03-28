import Canvas from './engine/canvas';
import Svg from './engine/svg';
import './styles/style.css';

export default class FlowChart {
	constructor(rType, wrapper, id, width, height) {
		if (!wrapper) {
			throw new Error('wrapper cannot be empty.');
		}

		const wrapperEl = document.querySelector(wrapper);

		this.renderer = undefined;
		this.rType = rType;
		this.wrapper = wrapperEl;
		this.id = id;
		this.width = width;
		this.height = height;

		if (this.rType === 'canvas') {
			this.renderer = new Canvas(
				this.wrapper,
				this.id,
				this.width,
				this.height
			);
		}

		if (this.rType === 'svg') {
			this.renderer = new Svg(this.wrapper, this.id, this.width, this.height);
		}
	}
}
