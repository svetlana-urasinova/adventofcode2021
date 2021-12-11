import { data_example } from "./data_example.js";
import { data } from "./data.js";
import { data_example2 } from "./data_example2.js";

const parseData = data => data.split(/\n\s+/);

const countFlashes = data => {
    const octopuses = parseData(data);
    return null;
}

window.onload = () => {
    document.querySelector('.app').innerHTML = countFlashes(data_example2);
}

export { countFlashes };