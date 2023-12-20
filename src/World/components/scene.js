import { Scene, TextureLoader, EquirectangularReflectionMapping, SRGBColorSpace } from 'three';

function createScene() {
  const scene = new Scene();

  // setting the environment 
  const loader = new TextureLoader();
  const texture = loader.load('public/assets/env/ulmer_muenster.jpg')
  texture.mapping = EquirectangularReflectionMapping;
  texture.colorSpace = SRGBColorSpace;

  scene.environment = texture;
  
  return scene;
}

export { createScene };