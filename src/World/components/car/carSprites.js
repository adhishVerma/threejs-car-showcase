import { Sprite, SpriteMaterial, Vector3 } from "three";
import * as TWEEN from '@tweenjs/tween.js'

const annotation1 = document.querySelector(".annotation1");
const annotation2 = document.querySelector(".annotation2");

let spriteBehindObject1;
let spriteBehindObject2;

const center = new Vector3(0,3,0);


const spriteMaterial = new SpriteMaterial({
    alphaTest: 0.5,
    transparent: true,
    depthTest: false,
    depthWrite: false
})

const sprite1 = new Sprite(spriteMaterial);
sprite1.scale.set(30, 30, 1);
sprite1.position.set(-4,3,1);

const sprite2 = new Sprite(spriteMaterial);
sprite2.scale.set(30, 30, 1);
sprite2.position.set(4,3,-10);


function updateAnnotationOpacity(camera) {
    const meshDistance = camera.position.distanceTo(center);
    const spriteDist1 = camera.position.distanceTo(sprite1.position);
    spriteBehindObject1 = spriteDist1 > meshDistance;
    sprite1.material.opacity = 0;

    const spriteDist2 = camera.position.distanceTo(sprite2.position);
    spriteBehindObject2 = spriteDist2 > meshDistance;
    sprite2.material.opacity = 0;
}

function updateScreenPosition(renderer, camera) {
    const vector_1 = new Vector3(-4, 3, 5);
    const vector_2 = new Vector3(4, 3, -10);

    const canvas = renderer.domElement;

    vector_1.project(camera);
    vector_1.x = Math.round((0.5 + vector_1.x / 2) * (canvas.width / window.devicePixelRatio));
    vector_1.y = Math.round((0.5 - vector_1.y / 2) * (canvas.height / window.devicePixelRatio));

    annotation1.style.top = `${vector_1.y}px`;
    annotation1.style.left = `${vector_1.x}px`;
    annotation1.style.opacity = spriteBehindObject1 ? 0 : 1;
    annotation1.style.pointerEvents = spriteBehindObject1 ? 'none' : 'auto';

    vector_2.project(camera);
    vector_2.x = Math.round((0.5 + vector_2.x / 2) * (canvas.width / window.devicePixelRatio));
    vector_2.y = Math.round((0.5 - vector_2.y / 2) * (canvas.height / window.devicePixelRatio));
    annotation2.style.top = `${vector_2.y}px`;
    annotation2.style.left = `${vector_2.x}px`;
    annotation2.style.opacity = spriteBehindObject2 ? 0 : 1;
    annotation2.style.pointerEvents = spriteBehindObject2 ? 'none' : 'auto';
}

function moveCameraTo(position, controls, camera){
    const enableTransition = true;
    const tween = new TWEEN.Tween(camera.position).to({x:position.x, y:position.y, z:position.z},1000).easing(TWEEN.Easing.Quadratic.Out).onUpdate(() => {
        controls.update()
    }).start();
}

export { sprite1, sprite2, updateScreenPosition, updateAnnotationOpacity, moveCameraTo};