import { data_example } from "./data_example.js";
import { data } from "./data.js";

const parseData = data => data.split(/\n\s+/);

countFlashes = data => {
    const octopuses = parseData(data);
    return null;
}

window.onload = () => {
    document.querySelector('.app').innerHTML = countFlashes(data_example);
}

export { countFlashes };