const DEFAULT_TICK_TIME = 20;
const DEFAULT_CANVAS_CONTEXT_TYPE = "2d";

export default function Canvimation({
  canvas,
  virtualCanvas = document.createElement("canvas"),
  animationScene,
  tickTime = DEFAULT_TICK_TIME,
  canvasContextType = DEFAULT_CANVAS_CONTEXT_TYPE,
} = {}) {
  if (!canvas) {
    throw new Error("Animation: option canvas is Required");
  }
  if (!animationScene) {
    throw new Error("Animation: option animationScene is Required");
  }
  this.isRunning = false;
  this.renderHandle = null;
  this.animationScene = animationScene;
  this.tickTime = tickTime;

  this.canvas = canvas;
  this.canvasContextType = canvasContextType;
  this.virtualCanvas = virtualCanvas;
  this.virtualCanvas.width = this.canvas.width * 2;
  this.virtualCanvas.height = this.canvas.height * 2;
}

Canvimation.prototype = {
  play() {
    this.isRunning = true;
    this.tick();
  },

  pause() {
    window.cancelAnimationFrame(this.renderHandle);
    this.renderHandle = null;
    this.isRunning = false;
  },

  tick() {
    this.animationScene.tick();
    this.requestRender();

    if (this.isRunning) {
      setTimeout(this.tick.bind(this), this.tickTime);
    }
  },

  requestRender() {
    if (!this.renderHandle) {
      this.renderHandle = window.requestAnimationFrame(() => {
        this.render();
        this.renderHandle = null;
      });
    }
  },

  render() {
    const virtualContext = this.virtualCanvas.getContext(
      this.canvasContextType
    );
    virtualContext.clearRect(
      0,
      0,
      this.virtualCanvas.width,
      this.virtualCanvas.height
    );
    virtualContext.fillStyle = "black";

    this.animationScene.render(virtualContext);

    const canvasContext = this.canvas.getContext(this.canvasContextType);
    canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    canvasContext.drawImage(
      this.virtualCanvas,
      0,
      0,
      this.virtualCanvas.width,
      this.virtualCanvas.height,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  },
};
