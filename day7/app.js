import { data_example } from "./data_example.js";
import { data } from "./data.js";

const calculateFuel = () => {
    
}

window.onload = () => {
    document.querySelector('.app').innerHTML = calculateFuel(data_example);
}

export { calculateFuel };