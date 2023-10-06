import { WebGLRenderer, ACESFilmicToneMapping } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({alpha : true , antialiasing: true});

  // turn on the physically correct lighting model

  renderer.setClearColor( 0x000000, 0 ); // the default
  renderer.autoClear = true;
  
  renderer.toneMapping = ACESFilmicToneMapping;

  // renderer.setAnimationLoop(() => {
  //   renderer.render(scene,camera);
  // })

  return renderer;
}

export { createRenderer };