import { data_example } from "./data_example.js";
import { data } from "./data.js";

const parseData = data => {

}

const findCorruptedChunks = data => {

}

window.onload = () => {
    document.querySelector('.app').innerHTML = findCorruptedChunks(data);
}

export { findCorruptedChunks };