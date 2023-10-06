import {
  AmbientLight,
  SpotLight,
  DirectionalLight,
  HemisphereLight
} from 'three';

function createLights() {


  const sceneLight = new HemisphereLight(0xffffff, 0x0000ff, 0.2);
  sceneLight.position.set(0,100,0);

  const ambientLight = new AmbientLight('white', 0.07)

  const mainLight = new DirectionalLight("white", 1);
  mainLight.position.set(3, 16, 2);
  mainLight.color.setHSL( 0.1, 1, 0.95 );
  mainLight.castShadow = true;

  return { sceneLight, mainLight, ambientLight};
}

export { createLights };