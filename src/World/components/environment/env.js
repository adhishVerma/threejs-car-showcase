import { LoadingManager, CircleGeometry, BackSide, TextureLoader, SRGBColorSpace, DoubleSide, RepeatWrapping, MirroredRepeatWrapping, ClampToEdgeWrapping, Vector2 } from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';


async function createEnv(){

    const loadingManager = new LoadingManager();
    const geometryLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    geometryLoader.setDRACOLoader(dracoLoader);
    const geometry  = await geometryLoader.loadAsync('public/assets/env/Dome.glb');
    const envMesh = geometry.scene
    envMesh.translateY(-0.001);

    return envMesh;
    
}

export {createEnv};