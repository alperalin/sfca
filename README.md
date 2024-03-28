# Simple Flowchart App

This is a simple flowchart app. It has five predefined shapes and two render engines (canvas and SVG). You can move, edit text, rotate, delete, import, and export the shapes. The demo is [here.](https://sfca.vercel.app/)

## Features

- Five predefined shapes.
  - `StartEnd`
  - `Process`
  - `Decision`
  - `InputOutput`
  - `Arrow`
- Interactions move, edit text, rotate, delete.
- Canvas and SVG engines support.
- Import / Export the created shapes.

## How To Use

Import the engine and shapes from the flowchart. Create a new engine based on your configurations. And then add the shapes to the engine's renderer.

```js
import { StartEnd } from '../flowChart/shapes';
import Engine from '../flowChart';

engine = new Engine('canvas', '#wrapper', 'cnvs', 2500, 2500);

engine.renderer.add(new StartEnd({ sX: 800, sY: 600 }));
```

## API

### Engine

Creates new engine. Based on your configurations.

```js
new Engine(type, wrapper, id, width, height);
```

| Parameter | Type          | Description                             |
| --------- | ------------- | --------------------------------------- |
| `type`    | canvas OR svg | The engine type                         |
| `wrapper` | id OR class   | The main wrapper element                |
| `id`      | string        | The id of the engine's html element     |
| `width`   | number        | The width of the engine's html element  |
| `height`  | number        | The height of the engine's html element |

### Shapes

You can use five predefined shapes. Their parameters are the same.

- `StartEnd`
- `Process`
- `Decision`
- `InputOutput`
- `Arrow`

```js
new StartEnd({
	sX,
	sY,
	width,
	height,
	text,
	backgroundColor,
	color,
	borderWidth,
	borderColor,
	borderRadius,
	angle,
});
```

| Parameter         | Type               | Description                    |
| ----------------- | ------------------ | ------------------------------ |
| `sX`              | number             | The horizontal start point     |
| `sY`              | number             | The vertical start point       |
| `width`           | number             | The width of shape             |
| `height`          | number             | The height of shape            |
| `text`            | string             | The text in the shape          |
| `backgroundColor` | string(HEX or RGB) | The background of the shape    |
| `color`           | string(HEX or RGB) | The color of the shape's text  |
| `borderWidth`     | number             | The border width of the shape  |
| `borderColor`     | number             | The border color of the shape  |
| `borderRadius`    | number             | The border radius of the shape |
| `angle`           | number             | The rotate degree of the shape |
