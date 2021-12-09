import { data_example } from "./data_example.js";
import { data } from "./data.js";

const calculateSum = data => data.reduce((acc, el) => +acc + +el);

const calculateFuel = (data, inc=false) => {
    const crabs = data.split(',').sort((a, b) => a - b);
    const median = crabs[Math.floor(crabs.length / 2)]
    return calculateSum(crabs.map(el => Math.abs(median - el)));
}

window.onload = () => {
    document.querySelector('.app').innerHTML = calculateFuel(data);
}

export { calculateFuel };