import { data_example } from "./data_example.js";
import { data_example2 } from "./data_example2.js";
import { data } from "./data.js";

const parseData = data => {}

const countUniqueDigits = data => {
    
}

window.onload = () => {
    document.querySelector('.app').innerHTML = countUniqueDigits(data);
}

export { countUniqueDigits };