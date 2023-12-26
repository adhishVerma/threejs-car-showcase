import { Clock } from "three";
import { nonBloomed, restoreMaterial } from "./postprocessing.js";

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer, controls, bloomComposer, finalComposer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updateables = [];
    this.controls = controls;
    this.bloomComposer = bloomComposer;
    this.finalComposer = finalComposer;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
        this.tick();
        this.controls.update();
        this.scene.traverse(nonBloomed);
        // this.renderer.render(this.scene, this.camera);
        this.bloomComposer.render();
        this.scene.traverse(restoreMaterial);
        this.finalComposer.render();
    })
  }


  stop() {
    this.renderer.setAnimationLoop(null);
  }

  animateOnce() {
    this.updateables.forEach((object) => {
      object.animateOnce();
    })
  }

  resetAnimation(){
    this.updateables.forEach((object) => {
      object.resetAnimation();
    })
  }


  tick(){
    const delta = clock.getDelta();

    for(const object of this.updateables){
        object.tick(delta);
    }
  }
}

export { Loop };