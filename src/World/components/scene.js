import { Color, Scene, TextureLoader, EquirectangularReflectionMapping } from 'three';

function createScene() {
  const scene = new Scene();

  // setting the environment 
  const loader = new TextureLoader();
  const texture = loader.load('public/assets/env/MAGNITE_ENV_DAY_DOME.jpg')
  texture.mapping = EquirectangularReflectionMapping;

  scene.environment = texture

  return scene;
}

export { createScene };