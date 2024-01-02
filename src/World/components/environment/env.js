import { EquirectangularReflectionMapping, SRGBColorSpace,  TextureLoader } from 'three';
import { GroundProjectedSkybox } from 'three/addons/objects/GroundProjectedSkybox.js';

async function createEnv() {
    const textureLoader = new TextureLoader();
    const texture = await textureLoader.loadAsync('/public/assets/env/ulmer_muenster.jpg');
    texture.colorSpace = SRGBColorSpace;
    texture.mapping = EquirectangularReflectionMapping;
    const mesh = new GroundProjectedSkybox(texture);
    mesh.scale.multiplyScalar(100);

    return mesh;

}

export { createEnv };