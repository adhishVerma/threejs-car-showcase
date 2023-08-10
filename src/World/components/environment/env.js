import { LoadingManager, CircleGeometry, BackSide, TextureLoader,Mesh, MeshBasicMaterial, SphereGeometry } from 'three';

async function createEnv(){

    const loadingManager = new LoadingManager();
    const loader  = new TextureLoader(loadingManager);
    const envTexture = await loader.loadAsync('public/assets/env/MAGNITE_ENV_DAY_DOME.jpg')
    const material = new MeshBasicMaterial({map : envTexture});
    material.side = BackSide;
    const phiStart = 0;
    const phiEnd = Math.PI*2;
    const thetaStart = 0;
    const thetaEnd = Math.PI
    const geometry = new SphereGeometry(20, 32, 32, phiStart, phiEnd, thetaStart, thetaEnd);
    const envMesh = new Mesh(geometry,material);


    return envMesh;
    
}

export {createEnv};