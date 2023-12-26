import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(
    45, // fov = Field Of View
    1, // aspect ratio (dummy value)
    1, // near clipping plane
    200, // far clipping plane
  );

  // move the camera back so we can view the scene
  camera.position.set(2, 15, 30);
  
  return camera;
}

export { createCamera };