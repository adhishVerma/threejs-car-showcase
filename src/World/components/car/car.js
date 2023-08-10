import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { setupModel } from './setupModel.js';
import { Color, LoadingManager } from 'three';



async function loadCar(progressBarContainer,controls) {
    const loadingManager = new LoadingManager();


    loadingManager.onLoad = function ( ) {
        progressBarContainer.style.display = "none";
        controls.style.display = "block";
    };

    const loader = new GLTFLoader(loadingManager);
    loader.resourcePath = 'public/assets/safari/'
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);
    loader.setResourcePath("public/assets/safari/")
    const carData = await loader.loadAsync('public/assets/safari/model.glb');
    const car = setupModel(carData);

    car.carChange = (meshName, newColor) => {
        car.traverse(function (node) {
            if (node.isMesh) {
                if (node.material.name === meshName) {
                    node.material.color = new Color(newColor);
                }
            }
        })
    }

    car.animateOnce = () => {
        car.openDoors();
    }

    car.resetAnimation = () => {
        car.closeDoors();
    }

    return car;
}

export { loadCar };