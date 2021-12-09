import { data_example } from "./data_example.js";
import { data } from "./data.js";

const countLanternFish = (data, days) => {
    let fish = data.split(',').reduce((acc, el) => {
        acc[el] = ++acc[el] || 1;
        return acc;
    }, {});

    const startNewDay = data => {
        const defaultIndex = 6;
        const newbornIndex = 8;
        let res = {};
        res[defaultIndex] = 0;
        res[newbornIndex] = 0;
        for (let i of Object.keys(data)) {
            if (+i !== 0) { res[i - 1] = data[i]; }
        }
        res[defaultIndex] += data[0] ?? 0;
        res[newbornIndex] += data[0] ?? 0;
        return res;
    }

    for (let i = 1; i <= days; i++) { fish = startNewDay(fish); }
    return Object.values(fish).reduce((acc, el) => +acc + +el);    
}

window.onload = () => {
    document.querySelector('.app').innerHTML = countLanternFish(data, 256);
}

export { countLanternFish };