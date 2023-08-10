import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(
    45, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    10000, // far clipping plane
  );

  // move the camera back so we can view the scene
  camera.position.set(6, 3, 8);
  
  return camera;
}

export { createCamera };