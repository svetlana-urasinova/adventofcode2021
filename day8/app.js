import { data_example } from "./data_example.js";
import { data_example2 } from "./data_example2.js";
import { data } from "./data.js";

const props = {
    2: 1,
    3: 7,
    4: 4,
    7: 8
}

const parseData = data => data.split(/\n/)
                                .map(el => el.split(/\s\|\s/))
                                .map(el => el.map(str => str.split(/\s+/)))
                                .map(arr => { return { patterns: arr[0] , output: arr[1]}});

const countUniqueDigits = data => {
    const parsedData = parseData(data);
    const res = {};
    
    parsedData.forEach(el => el.output.forEach(str => {
        const l = str.length;
        if (props[l] !== undefined) { res[l] = res[l] ? ++res[l] : 1; }
    }));

    const vals = Object.values(res);
    return vals.length > 0 ? vals.reduce((acc, el) => acc + el) : 0;
}

const parseDigits = patterns => {
    const findDiff = (str1, str2) => str1.split('').filter(letter => !str2.includes(letter))[0];
    const findMatch = (arr, str) => arr.filter(el => str.split('').every(letter => el.includes(letter))); 
    const filterByLength = (arr, n) => arr.filter(str => str.length === n);

    const digits = [];

    Object.keys(props).forEach(i => { digits[props[i]] = patterns.find(str => str.length === +i); });

    const l6 = filterByLength(patterns, 6);
    digits[9] = findMatch(l6, digits[4])[0];
    digits[0] = findMatch(l6, digits[1]).find(el => el !== digits[9]);
    digits[6] = l6.find(el => el !== digits[9] && el !== digits[0]);

    const l5 = filterByLength(patterns, 5);
    digits[2] = l5.find(el => el.includes(findDiff(digits[8], digits[9])));        
    digits[3] = l5.find(el => digits[1].split('').every(letter => el.includes(letter)));
    digits[5] = l5.find(el => el !== digits[2] && el !== digits[3]);

    return digits.map(el => el.split('').sort().join(''));
}

const decodeOutput = (patterns, output) => {
    const digits = parseDigits(patterns);
    let val = '';
    for (let i in output) {
        val += digits.findIndex(digit => digit === output[i].split('').sort().join(''));
    }                
    return +val;
}

const decode = data => {
    const parsedData = parseData(data);
    return parsedData.reduce((acc, el) => acc + decodeOutput(el.patterns, el.output), 0);
}

window.onload = () => {
    document.querySelector('.app').innerHTML = decode(data);
}

export { countUniqueDigits, decode };