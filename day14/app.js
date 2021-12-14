import { data_example } from "./data_example.js";
import { data } from "./data.js";

const parseData = data => data.split(/\n/);

const findMostCommonElement = data => {
    const { template, rules } = parseData(data);
}

window.onload = () => {
    document.querySelector('.app').innerHTML = findMostCommonElement(data);
}

export { findMostCommonElement };