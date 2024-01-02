import { AnimationMixer, AnimationObjectGroup, LoopOnce } from "three";

function setupModel(data) {

    const model = data.scene;
    const clips = data.animations;

    const animationGroup = new AnimationObjectGroup(model);
    const mixer = new AnimationMixer(animationGroup);
    const actions = []
    model.carExtPaint = []
    model.carIntPaint = []
    model.lights = {};
    model.projectors = [];
    model.lamps = [];


    clips.forEach(clip => {
        const action = mixer.clipAction(clip);
        actions.push(action);
    })

    model.openDoors = () => {
        actions.forEach(action => {
            action.reset();
            action.clampWhenFinished = true;
            action.timeScale = 1;
            action.loop = LoopOnce
            action.play();
        })
    }

    model.closeDoors = () => {
        actions.forEach(action => {
            action.timeScale = -1;
            action.paused = false;
        })
    }


    model.tick = (delta) => {
        mixer.update(delta);
    };

    // finding the nodes
    model.traverse((node) => {
        if (node.isMesh) {
            switch (node.name) {
                case 'ground':
                    model.ground = node;
                    break;
                case 'Prjecter_Glass001':
                    model.projectors.push(node);
                    break;
                case 'Prjecter_Glass002':
                    model.projectors.push(node);
                    break;
                case 'SAFARI_MESH014':
                    model.lamps.push(node);
                    break;
                case 'SAFARI_MESH147':
                    model.lamps.push(node);
                    break;
            }

            switch (node.material.name) {
                case "EXT_COLORBODY":
                    model.carExtPaint.push(node);
                    break;
                case "INT_COLORBODY":
                    model.carIntPaint.push(node);
                    break;
                case 'EXT_HALOGEN_LIGHT_GLOW':
                    model.halogen = node.material;
                    break;
                case 'EXT_TAILLIGHT_INDICATOR_BULB':
                    model.tailLightBulb = node.material;
                    break;
            }
        }
    });

    return model;
}

export { setupModel };