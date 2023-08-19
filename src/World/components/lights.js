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


  const sceneLight = new HemisphereLight(0xffffff, 0xffffff, 0.3);
  sceneLight.position.set(0,24,0);

  const ambientLight = new AmbientLight('white', 0.2)

  const mainLight = new DirectionalLight("white", 3.1);
  mainLight.position.set(- 0.2, 1.75, 0.4);
  mainLight.color.setHSL( 0.1, 1, 0.95 );
  mainLight.position.multiplyScalar(30);
  mainLight.castShadow = true;

  const lightbulb = new SpotLight("white", 8);
  lightbulb.castShadow = true;
  lightbulb.position.set(8,2,4)

  const lightbulb2 = new SpotLight("white", 8);
  lightbulb2.castShadow = true;
  lightbulb2.position.set(-8,3,4);

  const lightbulb3 = new SpotLight("white", 8);
  lightbulb3.castShadow = true;
  lightbulb3.position.set(-8,3,-4);

  const lightbulb4 = new SpotLight("white", 8);
  lightbulb4.castShadow = true;
  lightbulb4.position.set(8,3,-4);

  const lightbulb5 = new SpotLight("white", 8);
  lightbulb5.castShadow = true;
  lightbulb5.position.set(0,3,-8);


  return { sceneLight, mainLight, ambientLight, lightbulb, lightbulb2, lightbulb3, lightbulb4 , lightbulb5};
}

export { createLights };