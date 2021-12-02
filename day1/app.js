import { data } from "./data.js";

export const countIncreases = (data, offset) => {
    const arr = data.split(',').map(el => +el);
    return arr.reduce((acc, el, i) => (i > offset - 1 && el > arr[i - offset]) ? acc + 1 : acc, 0);
}

window.onload = () => {    
    document.querySelector('.app').innerHTML = countIncreases(data, 1);
}