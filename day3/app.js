import { data } from "./data.js";
import { data_example } from "./data_example.js";

const prepareData = str => str.split(',').map(el => el.trim());

const invert = str => str.split('').map(el => 1 - el).join('');

const binToDec = str => parseInt(str, 2);

const findMostCommonBit = (data, pos) => {
    const rates = data.reduce((acc, item) => {
        acc[+item[pos]]++;
        return acc;    
    }, [0, 0]);
    return rates[0] > rates[1] ? 0 : 1;
}

const findRating = (data, mode) => {
    let i = 0;
    while (data.length > 1) {
        const bit = findMostCommonBit(data, i);
        const modifier = mode === 'max' ? bit : 1 - bit;
        data = data.filter(el => +el[i] === modifier);
        i++;
    }
    return data[0];
}

const generate = (str, mode) => {
    const data = prepareData(str);
    let gamma, epsilon;
    if (mode === 'power') {
        gamma = data[0].split('').map((_, i) => findMostCommonBit(data, i)).join('');
        epsilon = invert(gamma);    
    } else if (mode === 'lifesupport') {
        gamma = findRating(data, 'max');
        epsilon = findRating(data, 'min');
    }
    return binToDec(gamma) * binToDec(epsilon);
}

window.onload = () => {
    document.querySelector('.app').innerHTML = generate(data, 'lifesupport');
}

export { generate }; 