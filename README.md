A simple library to make interactive animation on html5 canvas element

### Usage

```javascript
import Canvimation from "canvimation";

const canvas = document.createElement("canvas");
canvas.width = "100%";
canvas.height = "100%";
document.body.appendChild(canvas);

const animationScene = {
  tick: () => {},
  render: (virtualContext) => {},
};

new Canvimation({
  canvas,
  virtualCanvas: document.createElement("canvas"), // optional, created atomatically by default
  animationScene,
  tickTime: 20, // optional, 20 is default value
  canvasContextType: "2d", // optional, "2d" is default value
});
```

### AnimationScene

AnimationScene param is an object (it may be class instance), with two attributes tick and render, where:

- tick is a function that is called on each tick. No params
- render is a function which be called when needed to render. Accept only one param: virtualContext

### VirtualCanvas and VirtualContext

- virtualCanvas is a hidden element, which used to optimize the rendering process. Typically, render goes step by step, drawing primitive figures one by one. When there is a lot of primitives to draw, the user may see some blinking. To solve that problem it is possible to render the whole frame on a hidden (virtual) canvas first, and then copy it on a real (visible) one. Canvimation does this step. So all you need is to render everything at virtual canvas context, that passed to render function
- virtualContext is virtualCanvas context of contextType that passed in `contextType` option ("2d" by default)
