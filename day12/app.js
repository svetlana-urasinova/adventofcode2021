import { data_example } from "./data_example.js";
import { data } from "./data.js";
import { data_example2 } from "./data_example2.js";

const parseData = data => data.split(/\n/).map(el => el.split('-').map(el => { return { from: el[0], to: el[1] }}));

const findPossiblePaths = data => {
    const directions = parseData(data);
    console.log(directions);
}

window.onload = () => {
    document.querySelector('.app').innerHTML = findPossiblePaths(data);
}

export { findPossiblePaths };