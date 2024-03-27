export default class baseEngine {
	constructor(wrapper, id, width, height) {
		this.wrapper = wrapper;
		this.id = id;
		this.width = width;
		this.height = height;
		this.selectedShape = undefined;
		this.moveable = false;
		this.createdShapes = new Map();

		this.wrapper.classList.add('flowChartWrapper');
	}
	add(shape) {
		this.createdShapes.set(window.crypto.randomUUID(), shape);
		this.render();
	}
	rotateShape = (deg) => {
		if (this.selectedShape) {
			const shape = this.createdShapes.get(this.selectedShape.key);
			shape.props.rotateDeg += deg;
			this.render();
		}
	};
	deleteShape = () => {
		if (this.selectedShape) {
			this.createdShapes.delete(this.selectedShape.key);
			this.render();
		}
	};
	exportShapes = () => {
		if (this.createdShapes.size > 0) {
			const blobArr = [];
			this.createdShapes.forEach((shape) => {
				blobArr.push(shape.values);
			});
			const blobURL = URL.createObjectURL(
				new Blob([JSON.stringify(blobArr, null, 2)], {
					type: ' application/json',
				})
			);
			const tempLink = document.createElement('a');
			tempLink.href = blobURL;
			tempLink.download = 'shapes.json';
			document.body.appendChild(tempLink);
			tempLink.dispatchEvent(
				new MouseEvent('click', {
					bubbles: true,
					cancelable: true,
					view: window,
				})
			);
			document.body.removeChild(tempLink);
		} else alert('there are any shape on the canvas');
	};
	importShapes = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			const shapes = JSON.parse(reader.result);
			shapes.forEach((shape) => this.add(shape));
		});
		reader.readAsText(file);
	};
	addActions() {
		const actionsButtons = [];
		const actionsContainer = document.createElement('div');
		actionsContainer.classList.add('actions');
		// Importer Button
		const importerLabel = document.createElement('label');
		importerLabel.id = 'import';
		importerLabel.classList.add('button', 'button--icon-start', 'importer');
		importerLabel.setAttribute('for', 'importer');
		const importerIcon = document.createElement('i');
		importerIcon.classList.add('icon', 'icon--import');
		const importerInput = document.createElement('input');
		importerInput.id = 'importer';
		importerInput.setAttribute('type', 'file');
		importerInput.setAttribute('name', 'importer');
		importerInput.setAttribute('accept', '.json');
		importerLabel.appendChild(importerIcon);
		importerLabel.innerHTML += 'import';
		importerLabel.appendChild(importerInput);
		importerInput.addEventListener('change', (e) => this.importShapes(e));
		actionsButtons.push(importerLabel);
		// Export Button
		const exportButton = document.createElement('button');
		exportButton.id = 'export';
		exportButton.classList.add('button', 'button--icon-start');
		const exportButtonIcon = document.createElement('i');
		exportButtonIcon.classList.add('icon', 'icon--export');
		exportButton.appendChild(exportButtonIcon);
		exportButton.innerHTML += 'export';
		exportButton.addEventListener('click', this.exportShapes);
		actionsButtons.push(exportButton);
		// Delete Button
		const deleteButton = document.createElement('button');
		deleteButton.id = 'delete';
		deleteButton.classList.add('button', 'button--icon-start');
		const deleteButtonIcon = document.createElement('i');
		deleteButtonIcon.classList.add('icon', 'icon--garbage');
		deleteButton.appendChild(deleteButtonIcon);
		deleteButton.innerHTML += 'delete';
		deleteButton.addEventListener('click', this.deleteShape);
		actionsButtons.push(deleteButton);
		// Rotate Left Button
		const rotateLeftButton = document.createElement('button');
		rotateLeftButton.id = 'rotateLeft';
		rotateLeftButton.classList.add('button', 'button--icon-start');
		const rotateLeftButtonIcon = document.createElement('i');
		rotateLeftButtonIcon.classList.add('icon', 'icon--rotate-left');
		rotateLeftButton.appendChild(rotateLeftButtonIcon);
		rotateLeftButton.innerHTML += 'Left';
		rotateLeftButton.addEventListener('click', () => this.rotateShape(-15));
		actionsButtons.push(rotateLeftButton);
		// Rotate Right Button
		const rotateRightButton = document.createElement('button');
		rotateRightButton.id = 'rotateRight';
		rotateRightButton.classList.add('button', 'button--icon-start');
		const rotateRightButtonIcon = document.createElement('i');
		rotateRightButtonIcon.classList.add('icon', 'icon--rotate-right');
		rotateRightButton.appendChild(rotateRightButtonIcon);
		rotateRightButton.innerHTML += 'Right';
		rotateRightButton.addEventListener('click', () => this.rotateShape(15));
		actionsButtons.push(rotateRightButton);
		// Add all buttons to the DOM
		actionsButtons.forEach((button) => {
			actionsContainer.appendChild(button);
		});
		this.wrapper.appendChild(actionsContainer);
	}
	selectShape = (pX, pY) => {
		let found = undefined;
		this.createdShapes.forEach((shape, key) => {
			if (
				pX >= shape.sX &&
				pX <= shape.sX + shape.measurements.width &&
				pY >= shape.sY &&
				pY <= shape.sY + shape.measurements.height &&
				!found
			) {
				found = { key, shape };
				shape.props.outline.show = true;
			} else {
				shape.props.outline.show = false;
			}
			this.render();
		});
		return found;
	};
	handlePointerDown = (e) => {
		this.selectedShape = this.selectShape(
			Math.floor(this.wrapper.scrollLeft + e.clientX),
			Math.floor(this.wrapper.scrollTop + e.clientY)
		);
		if (this.selectedShape) {
			this.moveable = true;
		}
	};
	handlePointerUp = (e) => {
		this.moveable = false;
	};
	handlePointerMove = (e) => {
		if (this.selectedShape && this.moveable) {
			const newXPosition = Math.floor(this.wrapper.scrollLeft + e.clientX);
			const newYPosition = Math.floor(this.wrapper.scrollTop + e.clientY);
			this.selectedShape.shape.sX = newXPosition;
			this.selectedShape.shape.sY = newYPosition;
			this.render();
		}
	};
	render() {}
}
