import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { loadCar } from './components/car/car.js';
import { Loop } from './systems/Loop.js';
import { createEnv } from './components/environment/env.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';


// PostProcessing
import { createComposer, toggleLamps } from './systems/postprocessing.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { TAARenderPass } from 'three/addons/postprocessing/TAARenderPass.js';
import { ToneMappingShader } from './systems/postprocessing.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { ShaderMaterial, Vector2, Vector3 } from 'three';


import { createControls } from './systems/controls.js';
import { toggleLights } from './systems/postprocessing.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { gui } from './systems/gui.js';
import { moveCameraTo, sprite1, sprite2 } from './components/car/carSprites.js';


class World {
    constructor(container) {
        this.camera = createCamera();
        this.scene = createScene();
        this.renderer = createRenderer();

        container.append(this.renderer.domElement);

        const controls = createControls(this.camera, this.renderer.domElement);

        const { ambientLight, mainLight } = createLights();

        this.scene.add(ambientLight, mainLight);


        // Postprocessing
        this.bloomComposer = createComposer(this.renderer);
        
        const renderPass = new RenderPass(this.scene, this.camera);
        const outputPass = new OutputPass();

        this.bloomComposer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new Vector2(window.innerHeight, window.innerWidth),
            0.33, //intensity
            0, //radius
            2, //threshold
        );
        this.bloomComposer.addPass(bloomPass);
        this.bloomComposer.renderToScreen = false;
        this.bloomComposer.addPass(outputPass);

        const mixPass = new ShaderPass(
            new ShaderMaterial({
                uniforms: {
                    baseTexture: { value: null },
                    bloomTexture: { value: this.bloomComposer.renderTarget2.texture }
                },
                vertexShader: document.getElementById('vertexshader').innerText,
                fragmentShader: document.getElementById('fragmentshader').innerText,
                defines: {}
            }), 'baseTexture'
        );
        mixPass.needsSwap = true;


        this.finalComposer = createComposer(this.renderer);
        this.finalComposer.addPass(renderPass);

        this.finalComposer.addPass(mixPass);

        const acesPass = new ShaderPass(ToneMappingShader);
        this.finalComposer.addPass(acesPass);

        this.finalComposer.addPass(outputPass);


        // Resizer
        const resizer = new Resizer(container, this.camera, this.renderer, this.bloomComposer, this.finalComposer);

        // animation loop
        this.loop = new Loop(this.camera, this.scene, this.renderer, controls, this.bloomComposer, this.finalComposer);

        const annotation2 = document.querySelector(".annotation2");

        annotation2.addEventListener('click', () => {
            console.log('click');
              const newCameraPosition = new Vector3(3, 7, -15);  
              moveCameraTo(newCameraPosition, controls, this.camera);  
          });
    }

    async init(progressBarContainer, controls) {
        // loading car models
        this.car = await loadCar(progressBarContainer, controls);
        this.scene.add(this.car);
        const env = await createEnv();
        this.scene.add(env);
        this.loop.updateables.push(this.car);
    }

    render() {
        this.renderer.render(scene, camera);
    }

    start() {
        // this.loop.start();
        this.loop.animate();
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


    carChange(newColor) {
        this.car.carChange(newColor);
    }

    toggleLights() {
        toggleLights(this.scene);
        toggleLamps(this.car);
    }

    addAnnotations(){
        this.scene.add(sprite1);
        this.scene.add(sprite2);
    }
}

export { World };