import { data_example } from "./data_example.js";
import { data } from "./data.js";

const parseData = data => data.split(/\n/);

const decode = data => {
    const transmission = parseData(data);
}

window.onload = () => {
    document.querySelector('.app').innerHTML = decode(data_example);
}

export { decode };