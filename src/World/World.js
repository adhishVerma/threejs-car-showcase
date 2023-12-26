import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { loadCar } from './components/car/car.js';
import { Loop } from './systems/Loop.js';
import { createEnv } from './components/environment/env.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';


// PostProcessing
import { createComposer } from './systems/postprocessing.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { TAARenderPass } from 'three/addons/postprocessing/TAARenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { onPointerDown } from './systems/postprocessing.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { ShaderMaterial, Vector2 } from 'three';


import { createControls } from './systems/controls.js';
import { toggleLights } from './systems/postprocessing.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { gui } from './systems/gui.js';


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

        const renderScene = new RenderPass(this.scene, this.camera);
        this.bloomComposer.addPass(renderScene);

        const bloomPass = new UnrealBloomPass(
            new Vector2(window.innerHeight, window.innerWidth),
            1, //intensity
            1, //radius
            0, //threshold
        );
        this.bloomComposer.addPass(bloomPass);
        this.bloomComposer.renderToScreen = false;

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

        const outputPass = new OutputPass();

        this.finalComposer = createComposer(this.renderer);
        this.finalComposer.addPass(renderScene);

        this.finalComposer.addPass(mixPass);


        // const fxaaPass = new ShaderPass(FXAAShader);
        // this.finalComposer.addPass(fxaaPass);
        
        // const taaPass = new TAARenderPass(this.scene, this.camera, 0xffffff, 1);
        // this.finalComposer.addPass(taaPass);
        
        this.finalComposer.addPass(outputPass);
        
        // window.addEventListener('pointerdown',(event) => {return onPointerDown(event, this.scene, this.camera)});


        // Resizer
        const resizer = new Resizer(container, this.camera, this.renderer, this.bloomComposer, this.finalComposer);

        // animation loop
        this.loop = new Loop(this.camera, this.scene, this.renderer, controls, this.bloomComposer, this.finalComposer);

        // GUI
        const folder1 = gui.addFolder('renderer');
        folder1.add(this.renderer, 'toneMapping');
        folder1.add(this.renderer, 'toneMappingExposure', 0,10,0.01);

        const folder2 = gui.addFolder('bloom');
        folder2.add(bloomPass, 'radius',0,10,0.01);
        folder2.add(bloomPass, 'strength',0,10,0.01);
        folder2.add(bloomPass, 'threshold',0,10,0.1);
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

    toggleLights(){
        toggleLights(this.scene);
    }
}

export { World };