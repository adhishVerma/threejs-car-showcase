import { World } from "./src/World/World.js";

const dropdown = document.getElementById('mesh-select');
const colorHex = document.getElementById('set-color');



async function main() {
    // setup world

    // get container
    const container = document.querySelector('#scene-container');

    // 1. Create an instance of the World app
    const world = new World(container);

    // load car model
    await world.init(dropdown);

    // 2. Render the scene
    world.start();

    colorHex.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            // check if valid hex value
            const reg = /^#([0-9a-f]{3}){1,2}$/i
            if(reg.test(e.target.value)){
                // trigger world with mesh change option
                world.carChange(dropdown.value, colorHex.value);
            }
            e.target.value = "Enter correct Hex val"
        }
    })
}

main().catch((err) => {
    console.log(err);
});



colorHex.addEventListener('keydown', (e) => {
    if (e.target.value == '' && e.key === 'Backspace') {
        e.target.value = e.target.dataset.input
    }
})





