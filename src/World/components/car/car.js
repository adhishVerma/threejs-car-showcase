import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { setupModel } from './setupModel.js';
import { Color, LoadingManager, Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader } from 'three';



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
    loader.setResourcePath("public/assets/safari/");
    const carData = await loader.loadAsync('public/assets/safari/model.glb');
    const car = setupModel(carData);

    // car colorchange function
    car.carChange = (meshName, newColor) => {
        car.traverse(function (node) {
            if (node.isMesh) {
                if (node.material.name === meshName) {
                    node.material.color = new Color(newColor);
                    node.material.needsUpdate  = true;
                }
            }
        })
    }   

    // adding shadow to the car
    const shadowPlane = new PlaneGeometry(5,5);
    const shadowTexture = new TextureLoader().load('/public/assets/safari/SHADOW_DM_ALPHA.png');
    const shadowMaterial = new MeshBasicMaterial({map : shadowTexture});
    const shadowMesh = new Mesh(shadowPlane, shadowMaterial);

    // car.traverse(function(node){
    //     if(node.isMesh){
    //         console.log(node);
    //     }
    // })

    car.scale.multiplyScalar(4);

    car.traverse(function(node){
        if (node.isMesh){
            node.castShadow = true;
            node.recieveShadow = true;
        }
    })

    car.animateOnce = () => {
        car.openDoors();
    }

    car.resetAnimation = () => {
        car.closeDoors();
    }

    return car;
}

export { loadCar };