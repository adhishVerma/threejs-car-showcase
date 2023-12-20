import { LinearToneMapping, WebGLRenderer, PMREMGenerator, DefaultLoadingManager } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({ alpha: false, antialias: true });

  renderer.setClearColor(0x000000, 0); // the default
  renderer.autoClear = true;
  renderer.toneMapping = LinearToneMapping;
  renderer.toneMappingExposure = 1.1
  
  const pmremgen = new PMREMGenerator(renderer);
  pmremgen.compileEquirectangularShader();

  DefaultLoadingManager.onLoad = function(){
    pmremgen.dispose();
  }

  // renderer.setAnimationLoop(() => {
  //   renderer.render(scene,camera);
  // })

  return renderer;
}

export { createRenderer };