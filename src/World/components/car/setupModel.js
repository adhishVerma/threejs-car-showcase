import { AnimationMixer, AnimationObjectGroup, LoopOnce } from "three";
import { Clock, Color } from "three";

const clock = new Clock();

function setupModel(data) {
    const model = data.scene;
    const clips = data.animations;


    const animationGroup = new AnimationObjectGroup(model);
    const mixer = new AnimationMixer(animationGroup);
    const actions = []

    clips.forEach(clip => {
        const action = mixer.clipAction(clip);
        action.clampWhenFinished = true;
        action.loop = LoopOnce;
        actions.push(action);
    })

    model.openDoors = () => {
        actions.forEach(action => {
            action.play()
        })
    }

    model.closeDoors = () => {
        actions.forEach(action => {
            action.stop();
        })
    }


    model.tick = () => {
        mixer.update(clock.getDelta());
    };

    return model;
}

export { setupModel };