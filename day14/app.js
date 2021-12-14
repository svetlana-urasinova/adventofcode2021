import { data_example } from "./data_example.js";
import { data } from "./data.js";

const parseData = data => data.split(/\n/);

const countDots = data => {
    const manual = parseData(data);
}

window.onload = () => {
    document.querySelector('.app').innerHTML = countDots(data, true);
}

export { countDots };