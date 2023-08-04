import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { loadCar } from './components/car/car.js';
import { Loop } from './systems/Loop.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';


let camera;
let scene;
let renderer;
let loop;
let car;


class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);

        const controls = createControls(camera, renderer.domElement);
        controls.addEventListener('change', () => {
            this.render();
        });

        const {  mainLight, rectLight1, lightbulb } = createLights();

        scene.add( mainLight, rectLight1,  lightbulb);

        const resizer = new Resizer(container, camera, renderer);
    }

    async init(dropdownMenu){
        // loading car models
        car = await loadCar();
        car.dropdown(dropdownMenu);
        scene.add(car);
        loop.updateables.push(car);
    }

    render() {
        renderer.render(scene, camera);  
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }

    carChange(nodeId, newColor){
        car.carChange(nodeId, newColor);
    }
}

export { World };