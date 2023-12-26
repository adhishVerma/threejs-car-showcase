import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { MeshBasicMaterial, Layers, Raycaster, Vector2, Color } from 'three';


function createComposer(renderer){
    const composer = new EffectComposer(renderer);
    return composer;
}

const BLOOM_SCENE = 1;
const bloomLayer = new Layers();
bloomLayer.set(BLOOM_SCENE);
const darkMaterial = new MeshBasicMaterial({color : 0x000000});
const materials = {};

function nonBloomed(obj){
    if(obj.isMesh && bloomLayer.test(obj.layers) === false){
        materials[obj.uuid] = obj.material;
        obj.material = darkMaterial;
    }
}

function restoreMaterial(obj){
    if(materials[obj.uuid]){
        obj.material = materials[obj.uuid];
        delete materials[obj.uuid];
    }
}


const rayCaster = new Raycaster();
const mouse = new Vector2();

function onPointerDown(event, scene, camera){
    mouse.x = (event.clientX/window.innerWidth)*2 - 1;
    mouse.y = -(event.clientY/window.innerHeight)*2 + 1;

    rayCaster.setFromCamera(mouse,camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    if(intersects.length > 0){
        const object = intersects[0].object;
        object.layers.toggle(BLOOM_SCENE);
    }
    
}

let lightOn = false;
function toggleLights(scene){
    // find the meshes.
    scene.traverse(function(node){
        //SAFARI_MESH101 DRL glass
        if (node.isMesh && node.name === 'SAFARI_MESH101'){
            node.material = node.material.clone();
            if(!lightOn){
                node.material.emissive = new Color(0xffffff);
            }else{
                node.material.emissive = new Color(0x000000);
            }            
            node.layers.toggle(BLOOM_SCENE);
            lightOn = !lightOn
        }
    })
}

export {createComposer, nonBloomed, restoreMaterial, toggleLights, onPointerDown};

