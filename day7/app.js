import { data_example } from "./data_example.js";
import { data } from "./data.js";

const getSortedData = data => data.split(',').sort((a, b) => a - b);

const calculateSum = arr => arr.reduce((acc, el) => +acc + +el);

const getMedian = arr => Math.floor(arr.length / 2);

const calculateFuel = data => {
    const crabs = getSortedData(data);
    const median = crabs[getMedian(crabs)];
    return calculateSum(crabs.map(el => Math.abs(median - el)));
}

const calculateFuelPlus = data => {

    const findFuelAmount = (point, arr) => {
        let res = 0;
        for (let i = 0; i < arr.length; i++) {
            const distance = Math.abs(arr[i] - point);
            res += distance * (distance + 1) / 2;
        }
        return res;
    }
 
    const crabs = getSortedData(data);
    for (let i = crabs[0]; i <= crabs[crabs.length - 1]; i++) {
        findFuelAmount(i, crabs);
    }

    const median = getMedian(crabs);
    let current = findFuelAmount(median, crabs);
    let left = findFuelAmount(median - 1, crabs);
    let right = findFuelAmount(median + 1, crabs);

    if (current >= left) {
        let i = median;
        while (left !== undefined && left <= current) {
            i--;
            current = left;
            left = findFuelAmount(i, crabs);
        }
    }
    if (current >= right) {
        let i = median;
        while (right !== undefined && right <= current) {
            i++;
            current = right;
            right = findFuelAmount(i, crabs);
        }
    }

    return current;
}

window.onload = () => {
    document.querySelector('.app').innerHTML = calculateFuelPlus(data);
}

export { calculateFuel, calculateFuelPlus };