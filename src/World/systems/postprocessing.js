import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { MeshBasicMaterial, Layers, Raycaster, Vector2, Color } from 'three';
import { ACESFilmicToneMappingShader } from 'three/addons/shaders/ACESFilmicToneMappingShader.js'


function createComposer(renderer) {
    const composer = new EffectComposer(renderer);
    return composer;
}

const BLOOM_SCENE = 1;
const bloomLayer = new Layers();
bloomLayer.set(BLOOM_SCENE);
const darkMaterial = new MeshBasicMaterial({ color: 0x000000 });
const materials = {};



function nonBloomed(obj) {
    if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
        materials[obj.uuid] = obj.material;
        obj.material = darkMaterial;
    }
}

function restoreMaterial(obj) {
    if (materials[obj.uuid]) {
        obj.material = materials[obj.uuid];
        delete materials[obj.uuid];
    }
}


const rayCaster = new Raycaster();
const mouse = new Vector2();

function onPointerDown(event, scene, camera) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    rayCaster.setFromCamera(mouse, camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const object = intersects[0].object;
        object.layers.toggle(BLOOM_SCENE);
    }
}

let lightOn = false;
function toggleLights(scene) {
    // find the meshes.
    scene.traverse(function (node) {
        // DRL change
        if (node.isMesh && node.name === 'SAFARI_MESH106') {
            node.material = node.material.clone();
            if (!lightOn) {
                node.material.emissive = new Color(0xffffff);
                // node.material.color = new Color(0xffffff);
                node.material.emissiveIntensity = 100;
            } else {
                node.material.emissive = new Color(0x000000);
                node.material.emissiveIntensity = 0;
            }
            lightOn = !lightOn
        }

        if (node.isMesh && node.name === 'SAFARI_MESH101') {
            node.layers.toggle(BLOOM_SCENE);
        }
    })
}

function toggleLamps(car) {
    const { projectors, lamps, halogen, tailLightBulb } = car
    projectors.forEach(element => {
        element.material.emissive.set(0xffffff);
        element.material.emissiveIntensity = 5;
    });
    lamps.forEach(lamp => {
        lamp.material.emissive.set(0xffffff);
        lamp.material.emissiveIntensity = 5;
    })
    halogen.emissive.set(0xffffff);
    halogen.emissiveIntensity = 5;
    tailLightBulb.emissiveIntensity = 5;
    tailLightBulb.emissive.copy(tailLightBulb.color);
    console.log(tailLightBulb);
}

const ToneMappingShader = ACESFilmicToneMappingShader;

export { createComposer, nonBloomed, restoreMaterial, toggleLights, onPointerDown, toggleLamps, ToneMappingShader };

