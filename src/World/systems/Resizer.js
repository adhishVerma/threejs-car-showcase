const setSize = (container, camera, renderer, bloomComposer, finalComposer) => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    bloomComposer.setSize(container.clientWidth, container.clientHeight);
    finalComposer.setSize(container.clientWidth, container.clientHeight);
}

class Resizer {
    constructor(container, camera, renderer, bloomComposer, finalComposer) {
        setSize(container, camera, renderer, bloomComposer, finalComposer);
        window.addEventListener("resize", () => {
            setSize(container, camera, renderer);

            this.onResize();
        })
    }

    onResize() {

    }
}

export { Resizer };