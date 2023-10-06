import { Color } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';


async function createEnv() {

    const geometryLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    geometryLoader.setDRACOLoader(dracoLoader);
    const geometry = await geometryLoader.loadAsync('public/assets/env/Dome.glb');
    const envMesh = geometry.scenes[0];
    envMesh.traverse(function (node) {
        if (node.isMesh) {
            const colorWhite = new Color('white');
            node.material.emissive = colorWhite;
            node.material.emissiveIntensity = 0.18;
        }
    })
    envMesh.translateY(-0.001);




    return envMesh;

}

export { createEnv };