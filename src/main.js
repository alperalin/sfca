import {
	Decision,
	StartEnd,
	Process,
	InputOutput,
	Arrow,
	defaultShapeSpecs,
	defaultArrowSpecs,
	defaultDecisionSpecs,
} from './flowChart/shapes';
import Engine from './flowChart';

const app = document.getElementById('app');
const buttons = document.querySelectorAll('.tools .button');
let engine = undefined;

function createShape({
	type,
	pointerX,
	pointerY,
	measurements = { ...defaultShapeSpecs.measurements },
	props = { ...defaultShapeSpecs.props },
}) {
	switch (type) {
		case 'startEnd':
			engine.renderer.add(new StartEnd('startEnd', pointerX, pointerY));
			break;
		case 'decision':
			engine.renderer.add(new Decision('decision', pointerX, pointerY));
			break;
		case 'process':
			engine.renderer.add(new Process('process', pointerX, pointerY));
			break;
		case 'inputOutput':
			engine.renderer.add(new InputOutput('inputOutput', pointerX, pointerY));
			break;
		case 'arrow':
			engine.renderer.add(new Arrow('arrow', pointerX, pointerY));
			break;
		default:
			console.log("There isn't a shape with this type.");
	}
}

function handleButtonClick(e) {
	const type = e.currentTarget.id;
	const pointerX = Math.floor(app.scrollLeft + app.clientWidth / 2);
	const pointerY = Math.floor(app.scrollTop + app.clientHeight / 2);

	createShape({
		type,
		pointerX,
		pointerY,
	});
}

function init() {
	engine = new Engine('canvas', '.wrapper', 'cnvs', 2500, 2500);

	buttons.forEach((button) =>
		button.addEventListener('click', (e) => handleButtonClick(e))
	);
}

init();
