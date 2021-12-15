import { data_example } from "./data_example.js";
import { data } from "./data.js";

const parseData = data => data.split(/\n/);

const findSafePath = data => {
    const chitonMap = parseData(data);
}

window.onload = () => {
    document.querySelector('.app').innerHTML = findSafePath(data_example);
}

export { findSafePath };