import { data_example } from "./data_example.js";
import { data } from "./data.js";

const countLanternFish = (data, defaultDuration) => {
    const days = 80;
    const startNewDay = data => {
        const newborn = [];
        for (let i in data) {
            if (data[i] === 0) {
                data[i] = defaultDuration - 1;
                newborn.push(defaultDuration + 1);
            } else {
                data[i]--;
            }
        }
        return [...data, ...newborn];
    }
    
    let school = data.split(',').map(el => +el);
    for (let i = 1; i <= days; i++) {
        school = startNewDay(school);
    }

    return school.length;
}

window.onload = () => {
    document.querySelector('.app').innerHTML = countLanternFish(data, 7);
}

export { countLanternFish };