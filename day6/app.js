import { data_example } from "./data_example.js";
import { data } from "./data.js";

const countLanternFish = (data) => {
    
}

window.onload = () => {
    document.querySelector('.app').innerHTML = countLanternFish(data);
}

export { countLanternFish };