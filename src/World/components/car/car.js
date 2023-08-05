import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { setupModel } from './setupModel.js';
import { Color } from 'three';



async function loadCar() {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);

    const carData = await loader.loadAsync('public/assets/Tata Safari Adventure (GLB)(imaginator-cars.tatamotors.com)/model.glb')

    const car = setupModel(carData);

    car.carChange = (meshName, newColor) => {
        console.log("car-change", newColor)
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

    return car;
}

export { loadCar };