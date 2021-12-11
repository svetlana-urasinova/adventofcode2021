import { data_example } from "./data_example.js";
import { data } from "./data.js";
import { data_example2 } from "./data_example2.js";

const parseData = data => data.split(/\n/).map(el => el.split('').map(el => { return { energy: el, flashed: false }}));

const countFlashes = data => {
    const octopuses = parseData(data);
    console.log(octopuses);
    return null;
}

window.onload = () => {
    document.querySelector('.app').innerHTML = countFlashes(data_example2);
}

export { countFlashes };