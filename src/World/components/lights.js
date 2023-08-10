import {
  AmbientLight,
  SpotLight,
  DirectionalLight,
  HemisphereLight,
  RectAreaLight,
  DirectionalLightHelper
} from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

function createLights() {
  const sceneLight = new HemisphereLight(0x0000ff, '#878787', 0 );

  const ambientLight = new AmbientLight('#878787', 0.7)

  const mainLight = new DirectionalLight("white", 0);
  mainLight.position.set(10, 10, 10);

  const lightbulb = new DirectionalLight("#ffffff", 1);
  lightbulb.position.set(3,3,3)

  const lightbulb2 = new DirectionalLight("#ffffff", 1);
  lightbulb2.position.set(-3,3,3);

  const lightbulb3 = new DirectionalLight("#ffffff", 1);
  lightbulb3.position.set(-3,3,-3);

  const lightbulb4 = new DirectionalLight("#ffffff", 1);
  lightbulb4.position.set(3,3,-3);

  return { sceneLight, mainLight, ambientLight, lightbulb, lightbulb2, lightbulb3, lightbulb4};
}

export { createLights };