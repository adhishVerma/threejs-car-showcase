import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera,canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    // controls.autoRotate = true;
    
    return controls;
}

export { createControls };