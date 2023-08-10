import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    // controls.autoRotate = true;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = (Math.PI/2.3);
    controls.maxDistance = 20;
    controls.enablePan = false;
    return controls;
}

export { createControls };