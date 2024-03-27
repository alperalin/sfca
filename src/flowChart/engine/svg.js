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

		this.createdShapes.forEach((shape) => {
			let newSvg = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'svg'
			);
			newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			let newPathD = '';

			newPath.setAttribute('fill', shape.backgroundColor);
			newPath.setAttribute('stroke', shape.borderColor);
			newPath.setAttribute('stroke-width', shape.borderWidth);

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
				`rotate(${shape.angle} ${shape.sX + shape.width / 2} ${
					shape.sY + shape.height / 2
				})`
			);

			// Outline
			if (shape.outline)
				newPath.style.outline = `${shape.outlineBorderWidth}px solid ${shape.outlineBorderColor}`;

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
