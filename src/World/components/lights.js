import {
  AmbientLight,
  SpotLight,
  DirectionalLight,
  HemisphereLight,
  RectAreaLight,
  DirectionalLightHelper,
  PointLight,
  Object3D
} from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

function createLights() {

  const sceneLight = new HemisphereLight("blue", "white", 0.2)

  const ambientLight = new AmbientLight('white', 0.1)

  const mainLight = new DirectionalLight("white", 4);
  mainLight.position.set(1, 25, 1);
  // mainLight.castShadow = true;

  const lightbulb = new PointLight("#FEFEFE", 10);
  // lightbulb.castShadow = true;
  lightbulb.position.set(8,3,4)

  const lightbulb2 = new PointLight("#FEFEFE", 10);
  // lightbulb2.castShadow = true;
  lightbulb2.position.set(-8,3,4);

  const lightbulb3 = new PointLight("#FEFEFE", 10);
  // lightbulb3.castShadow = true;
  lightbulb3.position.set(-8,3,-4);

  const lightbulb4 = new PointLight("#FEFEFE", 10);
  // lightbulb4.castShadow = true;
  lightbulb4.position.set(8,3,-4);

  const lightbulb5 = new PointLight("#FEFEFE", 10);
  // lightbulb5.castShadow = true;
  lightbulb5.position.set(0,3,-8);


  return {  sceneLight, mainLight, ambientLight, lightbulb, lightbulb2, lightbulb3, lightbulb4 , lightbulb5};
}

export { createLights };