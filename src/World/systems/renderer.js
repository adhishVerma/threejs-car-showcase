import {  WebGLRenderer, PMREMGenerator, DefaultLoadingManager,SRGBColorSpace, NoToneMapping } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({
    powerPreference: "high-performance",
    antialias: false,
    stencil: false,
    depth: true
  });

  renderer.setClearColor(0x000000, 0); // the default
  renderer.autoClear = false;
  renderer.toneMapping = NoToneMapping;
  renderer.outputColorSpace = SRGBColorSpace;


  const pmremgen = new PMREMGenerator(renderer);
  pmremgen.compileEquirectangularShader();

  DefaultLoadingManager.onLoad = function () {
    pmremgen.dispose();
  }

  return renderer;
}

export { createRenderer };