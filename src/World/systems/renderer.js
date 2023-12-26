import { LinearToneMapping, WebGLRenderer, PMREMGenerator, DefaultLoadingManager, ReinhardToneMapping, CineonToneMapping, SRGBColorSpace } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({
    powerPreference: "high-performance",
    antialias: false,
    stencil: false,
    depth: false
  });

  renderer.setClearColor(0x000000, 0); // the default
  renderer.autoClear = false;
  renderer.toneMapping = CineonToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = SRGBColorSpace;


  const pmremgen = new PMREMGenerator(renderer);
  pmremgen.compileEquirectangularShader();

  DefaultLoadingManager.onLoad = function () {
    pmremgen.dispose();
  }

  // renderer.setAnimationLoop(() => {
  //   renderer.render(scene,camera);
  // })

  return renderer;
}

export { createRenderer };