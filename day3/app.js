import { data } from "./data.js";

const prepareData = data => data.split(',').map(el => el.trim());

const generate = data => {
    console.log(data);
    
}

window.onload = () => {
    document.querySelector('.app').innerHTML = generate(prepareData(data));
}

export { generate }; 