import { data_example } from "./data_example.js";
import { data } from "./data.js";

const parseData = data => {

}

const findLowPoints = data => {

}

window.onload = () => {
    document.querySelector('.app').innerHTML = findLowPoints(data_example);
}

export { findLowPoints };