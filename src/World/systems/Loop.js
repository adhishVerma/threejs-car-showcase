import { Clock } from "three";

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer, controls) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updateables = [];
    this.controls = controls;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
        this.tick();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick(){
    const delta = clock.getDelta();

    for(const object of this.updateables){
        object.tick(delta);
    }
  }
}

export { Loop };