import { data_example } from "./data_example.js";
import { data } from "./data.js";
import { data_example2 } from "./data_example2.js";

const parseData = data => data.split(/\n/).map(el => el.split('').map(el => { return { energy: el, flashed: false }}));

const update = octopus => {
    let createFlash = false;
    if (octopus.energy < 9) {
        octopus.energy++;
    } else {
        if (octopus.flashed === false) {
            octopus.energy = 0;
            octopus.flashed = true;
            createFlash = true;
        }
    }
    return { octopus, createFlash }
}

const makeStep = octopuses => {
    
}

const countFlashes = data => {
    const octopuses = parseData(data);
    console.log(octopuses);

    return null;
}

window.onload = () => {
    document.querySelector('.app').innerHTML = countFlashes(data_example2);
}

export { countFlashes };