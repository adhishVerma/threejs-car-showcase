import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { loadCar } from './components/car/car.js';
import { Loop } from './systems/Loop.js';
import { createEnv } from './components/environment/env.js'

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';






class World {
    constructor(container) {
        this.camera = createCamera();
        this.scene = createScene();
        this.renderer = createRenderer();
        container.append(this.renderer.domElement);

        const controls = createControls(this.camera, this.renderer.domElement);

        this.loop = new Loop(this.camera, this.scene, this.renderer, controls);

        const { sceneLight, ambientLight, mainLight, lightbulb, lightbulb2, lightbulb3, lightbulb4, lightbulb5 } = createLights();

        this.scene.add( sceneLight, ambientLight, mainLight, lightbulb, lightbulb2, lightbulb3, lightbulb4, lightbulb5);

        const resizer = new Resizer(container, this.camera, this.renderer);
    }

    async init(progressBarContainer, controls) {
        // loading car models
        this.car = await loadCar(progressBarContainer, controls);
        this.scene.add(this.car);
        // this.car.scale.set(1,1,1)
        const env = await createEnv();
        this.scene.add(env);
        this.loop.updateables.push(this.car);
    }

    render() {
        this.renderer.render(scene, camera);
    }

    start() {
        this.loop.start();
    }

    stop() {
        this.loop.stop();
    }

    animateOnce() {
        this.loop.animateOnce();
    }

    resetAnimation() {
        this.loop.resetAnimation();
    }


    carChange(meshName, newColor) {
        this.car.carChange(meshName, newColor);
    }
}

export { World };