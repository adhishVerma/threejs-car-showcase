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
  const sceneLight = new HemisphereLight(0xffffff, 0x8d8d8d, 3);
  sceneLight.position.set(0, 20, 0);

  const rectLight1 = new RectAreaLight(0xffffff, 17, 3, 2);
  rectLight1.position.set(0, 1, -5);
  rectLight1.lookAt(0, 0, 0);


  const rectLight2 = new RectAreaLight(0xffffff, 17, 3, 2)

  rectLight2.position.set(-3, 1, 0)
  rectLight2.lookAt(0, 0, 0);


  const rectLight3 = new RectAreaLight(0xffffff, 117, 3, 2)
  rectLight3.position.set(3, 1, 0)
  rectLight3.lookAt(0, 0, 0);

  const ambientLight = new AmbientLight(0x404040, 5)

  const mainLight = new DirectionalLight(0xffffff, 11);
  mainLight.position.set(2, 2, 6);

  const lightbulb = new DirectionalLight(0xffffff, 25);
  lightbulb.position.set(0,3,0)

  return { sceneLight, mainLight, ambientLight, rectLight1, rectLight2, rectLight3 , lightbulb};
}

export { createLights };