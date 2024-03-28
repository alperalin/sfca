import {
	Decision,
	StartEnd,
	Process,
	InputOutput,
	Arrow,
} from '../flowChart/shapes';
import Engine from '../flowChart';

const app = document.getElementById('app');
const buttons = document.querySelectorAll('.tools .button');
let engine = undefined;

function createShape({ type, pointerX, pointerY }) {
	switch (type) {
		case 'startEnd':
			engine.renderer.add(new StartEnd({ sX: pointerX, sY: pointerY }));
			break;
		case 'decision':
			engine.renderer.add(new Decision({ sX: pointerX, sY: pointerY }));
			break;
		case 'process':
			engine.renderer.add(new Process({ sX: pointerX, sY: pointerY }));
			break;
		case 'inputOutput':
			engine.renderer.add(new InputOutput({ sX: pointerX, sY: pointerY }));
			break;
		case 'arrow':
			engine.renderer.add(new Arrow({ sX: pointerX, sY: pointerY }));
			break;
		default:
			console.log(`FlowChart does not have a shape with this ${type} type.`);
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
	engine = new Engine('canvas', '#wrapper', 'cnvs', 2500, 2500);

	buttons.forEach((button) =>
		button.addEventListener('click', (e) => handleButtonClick(e))
	);
}

init();
