import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.maxDistance = 40;
    controls.minDistance = 30;
    controls.maxPolarAngle = Math.PI/2.14

    // controls.autoRotate = true;
    return controls;
}

export { createControls };