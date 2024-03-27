import baseEngine from './baseEngine';

export default class Svg extends baseEngine {
	constructor(wrapper, id, width, height) {
		super(wrapper, id, width, height);
		this.svgInstance = '';
		this.init();
	}

	clear() {
		this.svgInstance.innerHTML = '';
	}

	render() {
		this.clear();
		let newSvgGroup = [];
		let newPath = '';

		console.log(this.createdShapes);

		this.createdShapes.forEach((shape) => {
			let newSvg = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'svg'
			);
			newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			let newPathD = '';

			newSvg.id = shape.name;
			newPath.setAttribute('fill', shape.props.backgroundColor);
			newPath.setAttribute('stroke', shape.props.borderColor);
			newPath.setAttribute('stroke-width', shape.props.borderWidth);

			shape.coordinates.forEach((coordinate) => {
				switch (coordinate[0]) {
					case 'M':
						newPathD += ` M ${coordinate[1]} ${coordinate[2]} `;
						break;
					case 'L':
						newPathD += ` L ${coordinate[1]} ${coordinate[2]} `;
						break;
					case 'Q':
						newPathD += ` Q ${coordinate[1]},${coordinate[2]} ${coordinate[3]} ${coordinate[4]} `;
				}
			});

			newPath.setAttribute('d', newPathD);

			// Rotation
			newPath.setAttribute(
				'transform',
				`rotate(${shape.props.rotateDeg} ${
					shape.sX + shape.measurements.width / 2
				} ${shape.sY + shape.measurements.height / 2})`
			);

			if (shape.props.outline.show)
				newPath.style.outline = `${shape.props.outline.borderWidth}px solid ${shape.props.outline.borderColor}`;

			newSvg.appendChild(newPath);
			newSvgGroup.push(newSvg);
		});

		newSvgGroup.forEach((svgEl) => {
			this.svgInstance.appendChild(svgEl);
		});
	}

	init() {
		const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svgEl.id = this.id;
		svgEl.setAttribute('width', this.width);
		svgEl.setAttribute('height', this.height);

		this.wrapper.appendChild(svgEl);
		this.svgInstance = svgEl;
		this.svgInstance.addEventListener('pointerdown', this.handlePointerDown);
		this.svgInstance.addEventListener('pointerup', this.handlePointerUp);
		this.svgInstance.addEventListener('pointermove', this.handlePointerMove);
		this.addActions();
	}
}
