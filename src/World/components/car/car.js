import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { setupModel } from './setupModel.js';
import { LoadingManager, MultiplyBlending, RepeatWrapping, TextureLoader } from 'three';



async function loadCar(progressBarContainer, controls) {
    const loadingManager = new LoadingManager();

    loadingManager.onProgress = (url, itemsload, itemstotal) => {
        // console.log(`start loading : ${url}`)
    }
    loadingManager.addHandler(/\.png$/i, new TextureLoader());

    loadingManager.onLoad = function () {
        progressBarContainer.style.display = "none";
        controls.style.display = "flex";
    };


    const loader = new GLTFLoader(loadingManager);
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);
    loader.setResourcePath("public/assets/safari");
    const carData = await loader.loadAsync('public/assets/safari/model.glb');
    const car = setupModel(carData);

    // car colorchange function
    car.carChange = (newColor) => {
        car.carExtPaint.forEach((element) => {
            element.material.color.set(newColor);
        });
        car.carIntPaint.forEach((element) => {
            element.material.color.set(newColor);
        });
    }

    car.scale.multiplyScalar(4);

    // loading Car Shadow
    loadShadow(car);

    // load Car Flakes
    loadFlakes(car);

    car.animateOnce = () => {
        car.openDoors();
    }

    car.resetAnimation = () => {
        car.closeDoors();
    }

    return car;
}

async function loadShadow(car) {
    // adding shadow to the car
    const shadowLoader = new TextureLoader();
    const shadowalphaMap = await shadowLoader.loadAsync('/public/assets/safari/SHADOW_DM_ALPHA.png');
    shadowalphaMap.offset.set(0, -0.09);
    car.ground.material.map = shadowalphaMap;
    car.ground.material.alphaTest = 0.5;
    car.ground.material.blending = MultiplyBlending;
    car.ground.material.toneMapped = false;
    car.ground.material.transparent = true;
    car.ground.renderOrder = 2;
}

async function loadFlakes(car) {
    const flakeLoader = new TextureLoader();
    const carPaintFlakes = await flakeLoader.loadAsync('/public/assets/safari/CARPAINT_FLAKES_NM.jpg');
    carPaintFlakes.wrapS = RepeatWrapping;
    carPaintFlakes.wrapT = RepeatWrapping;
    carPaintFlakes.repeat.set(64, 64);
    car.carExtPaint.forEach(element => {
        element.material.normalMap = carPaintFlakes;
        element.material.normalScale.set(0.2, 0.2);
    });
}

export { loadCar };