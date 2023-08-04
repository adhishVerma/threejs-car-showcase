import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';
import { MathUtils } from 'three';

const radiansPerSecond = MathUtils.degToRad(3);

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2);

  const spec = {
    color: 'purple'
  }
  // create a default (white) Basic material
  const material = new MeshStandardMaterial(spec);

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);
  cube.rotation.set(-0.5,-0.1,0.8);

  cube.tick = (delta) => {
    cube.rotation.z += radiansPerSecond*delta;
    cube.rotation.x += radiansPerSecond*delta;
    cube.rotation.y += radiansPerSecond*delta;
  }

  return cube;
}

export { createCube };