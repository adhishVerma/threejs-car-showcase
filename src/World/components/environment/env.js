import { BackSide, EquirectangularReflectionMapping, Mesh, MeshBasicMaterial, SRGBColorSpace, SphereGeometry, TextureLoader, Vector3 } from 'three';


async function createEnv() {
    const geometry = new SphereGeometry( 32, 32, 32 );
    const texture = new TextureLoader().load('/public/assets/env/ulmer_muenster.jpg');
    texture.colorSpace = SRGBColorSpace;
    texture.mapping = EquirectangularReflectionMapping;
    const material = new MeshBasicMaterial({ map: texture, side : BackSide});
    const mesh = new Mesh(geometry, material);

    return mesh;

}

export { createEnv };