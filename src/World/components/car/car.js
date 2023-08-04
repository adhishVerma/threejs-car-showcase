import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { setupModel } from './setupModel.js';
import { Color, MathUtils } from 'three';



async function loadCar() {
    const loader = new GLTFLoader();

    const carData = await loader.loadAsync('public/assets/free_1975_porsche_911_930_turbo/scene.gltf')


    const car = setupModel(carData);

    car.tick = (delta) => {

    }

    car.dropdown = (dropdown) => {
        car.traverse(function (node) {
            if (node.isMesh) {
                if (dropdown) {
                    const meshoption = document.createElement('option');
                    meshoption.classList.add("option")
                    meshoption.innerText = node.material.name
                    meshoption.setAttribute("value", node.material.uuid)
                    dropdown.appendChild(meshoption);
                }
            }
        })
    }

    car.carChange = (nodeId, newColor) => {
        car.traverse(function(node){
            if(node.isMesh){
                if (node.material.uuid === nodeId){
                    node.material.color = new Color(newColor);
                }
            }
        })
    }



    return car;
}

export { loadCar };