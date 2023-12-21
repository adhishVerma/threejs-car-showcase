import { EquirectangularReflectionMapping, SRGBColorSpace,  TextureLoader } from 'three';
import { GroundProjectedSkybox } from 'three/addons/objects/GroundProjectedSkybox.js';

async function createEnv() {
    const texture = new TextureLoader().load('/public/assets/env/ulmer_muenster.jpg');
    texture.colorSpace = SRGBColorSpace;
    texture.mapping = EquirectangularReflectionMapping;
    // const material = new MeshBasicMaterial({ map: texture, side : BackSide});
    // const mesh = new Mesh(geometry, material);
    const mesh = new GroundProjectedSkybox(texture);
    mesh.scale.multiplyScalar(100);

    return mesh;

}

export { createEnv };