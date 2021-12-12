import { data_example } from "./data_example.js";
import { data } from "./data.js";
import { data_example2 } from "./data_example2.js";

const parseData = data => data.split(/\n/).map(el => el.split('').map(el => { return { energy: +el, canFlash: true }}));

const update = octopus => {
    let createFlash = false;
    if (octopus.canFlash === true) {
        if (octopus.energy < 9) {
            octopus.energy++;
        } else {
            octopus.energy = 0;
            octopus.canFlash = false;
            createFlash = true;
        }
    }
    return { octopus, createFlash }
}

const iterate = (octopuses, flashes, x=null, y=null) => {
    const i_min = x === null ? 0 : Math.max(x - 1, 0);
    const i_max = x === null ? octopuses.length : Math.min(x + 2, octopuses.length);
    const j_min = y === null ? 0 : Math.max(y - 1, 0);
    const j_max = y === null ? octopuses[0].length : Math.min(y + 2, octopuses[0].length);
    for (let i = i_min; i < i_max; i++) {
        for (let j = j_min; j < j_max; j++) {
            const res = update(octopuses[i][j]);
            if (res.createFlash) {
                //console.log(`FLASH: [${i}][${j}]`);
                flashes++;
                flashes = iterate(octopuses, flashes, i, j);
            }
        }
    }

    return flashes;
}

const makeStep = (octopuses, flashes, x=null, y=null) => {
    octopuses = octopuses.map(str => str.map((el, i) => {
        return {...el, canFlash: true };
    }));
    flashes = iterate(octopuses, flashes);    
    return { octopuses, flashes };
}

const render = octopuses => console.log(octopuses.map(el => el.map(octopus => octopus.energy).join('')).join('\n'));

const countFlashes = data => {
    let octopuses = parseData(data);
    let flashes = 0;
    for (let i = 0; i < 100; i++) {
        const res = makeStep(octopuses, flashes);
        octopuses = res.octopuses;
        flashes = res.flashes;
    }
//    render(octopuses);

    return flashes;
}

const isSynchronized = octopuses => octopuses.every(str => str.every(el => el.energy === 0)); 

const findSynchronizing = data => {
    let octopuses = parseData(data);
    let flashes = 0;
    let i = 0;
    while (1 === 1) {
        const res = makeStep(octopuses, flashes);
        octopuses = res.octopuses;
        i++;
        if (isSynchronized(octopuses)) { return i; }
    }
}

window.onload = () => {
    document.querySelector('.app').innerHTML = findSynchronizing(data);
}

export { countFlashes, findSynchronizing };