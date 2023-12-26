import {
  AmbientLight,
  DirectionalLight,
} from 'three';

function createLights() {


  const ambientLight = new AmbientLight(0x404040, 0.1)

  const mainLight = new DirectionalLight('white', 4);
  mainLight.castShadow = true;
  mainLight.shadow.bias = -0.0001;
  mainLight.shadow.mapSize.height = 1024*4;
  mainLight.shadow.mapSize.width = 1024*4;

  return { mainLight, ambientLight};
}

export { createLights };