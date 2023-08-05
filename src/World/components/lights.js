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
  const sceneLight = new HemisphereLight(0x0000ff, '#878787', 1 );
  sceneLight.position.set(0, 20, 0);

  const ambientLight = new AmbientLight('#878787', 3)

  const mainLight = new SpotLight(0xffffff, 1000);
  mainLight.position.set(5, 25, 7.5);

  const lightbulb = new DirectionalLight(0xffffff, 1);
  lightbulb.position.set(3,3,3)

  const lightbulb2 = new DirectionalLight(0xffffff, 1);
  lightbulb2.position.set(-3,3,3);

  const lightbulb3 = new DirectionalLight(0xffffff, 1);
  lightbulb3.position.set(-3,3,-3);

  const lightbulb4 = new DirectionalLight(0xffffff, 1);
  lightbulb4.position.set(3,3,-3);

  return { sceneLight, mainLight, ambientLight, lightbulb, lightbulb2, lightbulb3, lightbulb4};
}

export { createLights };