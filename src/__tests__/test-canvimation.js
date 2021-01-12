import Canvimation from "../Canvimation";

let testCanvas = null;
beforeEach(() => {
  testCanvas = document.createElement("canvas");
  testCanvas.width = "100%";
  testCanvas.height = "100%";
  document.body.appendChild(testCanvas);
});

afterEach(() => {
  testCanvas.parentNode.removeChild(testCanvas);
  testCanvas = null;
});

describe("Canvimation", function () {
  it("should work", async function () {
    const tickPromise = createControlledPromise();
    const renderPromise = createControlledPromise();
    const animationScene = {
      tick: jest.fn(tickPromise.resolve()),
      render: jest.fn(renderPromise.resolve),
    };
    const canvimation = new Canvimation({
      animationScene,
      canvas: testCanvas,
    });
    canvimation.play();
    await Promise.all([tickPromise, renderPromise]);
    canvimation.pause();
    expect(animationScene.tick).toBeCalledTimes(1);
    expect(animationScene.render).toBeCalledTimes(1);
  });
});

function createControlledPromise() {
  let resolvePromise;
  let rejectPromise;
  const controlledPromise = new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });
  controlledPromise.resolve = resolvePromise;
  controlledPromise.reject = rejectPromise;

  return controlledPromise;
}
