import { AnimationMixer, AnimationObjectGroup, LoopOnce } from "three";
import { Clock } from "three";

const clock = new Clock();

function setupModel(data) {

    const model = data.scene;
    const clips = data.animations;

    const animationGroup = new AnimationObjectGroup(model);
    const mixer = new AnimationMixer(animationGroup);
    const actions = []

    // model.traverse(function(node){
    //     if (node.isMesh){
    //         if(node.material.name == 'NUMBERPLATE'){
    //             console.log(node)
    //         }
    //     }
    // })


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


    model.tick = () => {
        mixer.update(clock.getDelta());
    };

    return model;
}

export { setupModel };