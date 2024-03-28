import { StartEnd, Decision, InputOutput, Process, Arrow } from '../shapes';

export default class baseEngine {
	constructor(wrapper, id, width, height) {
		this.wrapper = wrapper;
		this.id = id;
		this.width = width;
		this.height = height;
		this.selectedShape = undefined;
		this.moveable = false;
		this.createdShapes = new Map();
		this.actionsButtons = [];

		const sceneWrapperEl = document.createElement('div');
		sceneWrapperEl.classList.add('flowChartSceneWrapper');
		sceneWrapperEl.style.width = `${this.width}px`;
		sceneWrapperEl.style.height = `${this.height}px`;
		this.sceneWrapper = sceneWrapperEl;

		this.wrapper.style.width = `${this.width}px`;
		this.wrapper.style.height = `${this.height}px`;
		this.wrapper.classList.add('flowChartWrapper');
	}
	add(shape) {
		this.createdShapes.set(window.crypto.randomUUID(), shape);
		this.render();
	}
	rotateShape = (angle) => {
		if (this.selectedShape) {
			const shape = this.createdShapes.get(this.selectedShape.key);
			shape.angle += angle;
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
			shapes.forEach((shape) => {
				switch (shape.type) {
					case 'startEnd':
						this.add(new StartEnd({ ...shape }));
						break;
					case 'decision':
						this.add(new Decision({ ...shape }));
						break;
					case 'process':
						this.add(new Process({ ...shape }));
						break;
					case 'inputOutput':
						this.add(new InputOutput({ ...shape }));
						break;
					case 'arrow':
						this.add(new Arrow({ ...shape }));
						break;
					default:
						console.log(
							`FlowChart does not have a shape with this ${shape?.type} type.`
						);
				}
			});
		});
		reader.readAsText(file);
	};
	addActions() {
		const actionsContainer = document.createElement('div');
		actionsContainer.classList.add('actions');

		// Delete Button
		const deleteButton = document.createElement('button');
		deleteButton.id = 'delete';
		deleteButton.classList.add('button', 'button--icon-start');
		const deleteButtonIcon = document.createElement('i');
		deleteButtonIcon.classList.add('icon', 'icon--garbage');
		deleteButton.appendChild(deleteButtonIcon);
		deleteButton.innerHTML += 'delete';
		deleteButton.setAttribute('disabled', true);
		deleteButton.addEventListener('click', this.deleteShape);
		this.actionsButtons.push(deleteButton);
		// Rotate Left Button
		const rotateLeftButton = document.createElement('button');
		rotateLeftButton.id = 'rotateLeft';
		rotateLeftButton.classList.add('button', 'button--icon-start');
		const rotateLeftButtonIcon = document.createElement('i');
		rotateLeftButtonIcon.classList.add('icon', 'icon--rotate-left');
		rotateLeftButton.appendChild(rotateLeftButtonIcon);
		rotateLeftButton.innerHTML += 'Left';
		rotateLeftButton.setAttribute('disabled', true);
		rotateLeftButton.addEventListener('click', () => this.rotateShape(-15));
		this.actionsButtons.push(rotateLeftButton);
		// Rotate Right Button
		const rotateRightButton = document.createElement('button');
		rotateRightButton.id = 'rotateRight';
		rotateRightButton.classList.add('button', 'button--icon-start');
		const rotateRightButtonIcon = document.createElement('i');
		rotateRightButtonIcon.classList.add('icon', 'icon--rotate-right');
		rotateRightButton.appendChild(rotateRightButtonIcon);
		rotateRightButton.innerHTML += 'Right';
		rotateRightButton.setAttribute('disabled', true);
		rotateRightButton.addEventListener('click', () => this.rotateShape(15));
		this.actionsButtons.push(rotateRightButton);
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
		// Export Button
		const exportButton = document.createElement('button');
		exportButton.id = 'export';
		exportButton.classList.add('button', 'button--icon-start');
		const exportButtonIcon = document.createElement('i');
		exportButtonIcon.classList.add('icon', 'icon--export');
		exportButton.appendChild(exportButtonIcon);
		exportButton.innerHTML += 'export';
		exportButton.addEventListener('click', this.exportShapes);

		// Add all buttons to the DOM
		this.actionsButtons.forEach((button) => {
			actionsContainer.appendChild(button);
		});
		actionsContainer.appendChild(importerLabel);
		actionsContainer.appendChild(exportButton);

		this.wrapper.appendChild(actionsContainer);
	}
	selectShape = (pX, pY) => {
		let found = undefined;
		this.createdShapes.forEach((shape, key) => {
			if (
				pX >= shape.sX &&
				pX <= shape.sX + shape.width &&
				pY >= shape.sY &&
				pY <= shape.sY + shape.height &&
				!found
			) {
				found = { key, shape };
				shape.outline = true;
			} else {
				shape.outline = false;
			}
			this.render();
		});

		if (found) this.toggleActionButtons(true);
		else this.toggleActionButtons(false);

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
	toggleActionButtons = (toggle) => {
		this.actionsButtons.forEach((button) => {
			if (toggle) button.removeAttribute('disabled');
			else button.setAttribute('disabled', true);
		});
	};
	render() {}
}
