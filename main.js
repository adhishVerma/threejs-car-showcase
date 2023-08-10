import { World } from "./src/World/World.js";

const colorHex = document.getElementById('set-color');
const openDoors = document.getElementById('open-door-icon');
const progressBarContainer = document.querySelector('.progress-bar-container')
const controls = document.querySelector('.controls')


const colors = {
    "blue": "#0065AF",
    "white": "#D7DCE2",
    "grey": "#686F79",
    "mist": "#5b7385",
    "white_adv": "#D8DDE3",
    "black": "#42494F"
}

async function main() {
    // setup world

    // get container
    const container = document.querySelector('#scene-container');

    // 1. Create an instance of the World app
    const world = new World(container);

    // load car model
    await world.init(progressBarContainer, controls);

    // 2. Render the scene
    world.start();

    // setting up color change
    for (const [color, hex] of Object.entries(colors)) {
        const colorOption = document.createElement('div');
        colorOption.addEventListener('click', (e) => {
            world.carChange("EXT_COLORBODY", hex);
        })
        colorOption.classList.add('color-option');
        colorOption.setAttribute('data-color', hex);
        colorOption.style.background = hex
        colorHex.appendChild(colorOption);
    }

    let doors = false;
    openDoors.addEventListener('click', () => {
        if (doors){
            world.resetAnimation();
        }else{
            world.animateOnce();
        }

        doors = !doors;
    })

}

main().catch((err) => {
    console.log(err);
    alert("loading Failed");
});







