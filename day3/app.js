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

const generatePower = data => {
    const gamma = data[0].split('').map((_, i) => findMostCommonBit(data, i)).join('');
    const epsilon = invert(gamma);
    return {gamma, epsilon};    
}

const generateLifeSupport = data => {
    const gamma = findRating(data, 'max');
    const epsilon = findRating(data, 'min');    
    return {gamma, epsilon};
}

const generate = (str, mode) => {
    const data = prepareData(str);
    const {gamma, epsilon} = mode === 'power' ? generatePower(data) : generateLifeSupport(data);
    return binToDec(gamma) * binToDec(epsilon);
}

window.onload = () => {
    document.querySelector('.app').innerHTML = generate(data, 'lifesupport');
}

export { generate }; 