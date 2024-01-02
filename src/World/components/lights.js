import {
  AmbientLight,
  DirectionalLight,
} from 'three';

function createLights() {


  const ambientLight = new AmbientLight(0xffffff, 0)

  const mainLight = new DirectionalLight(0xffffff, 3);

  return { mainLight, ambientLight};
}

export { createLights };