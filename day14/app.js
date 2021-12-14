import { data_example } from "./data_example.js";
import { data } from "./data.js";

const parseData = data => {
    let [ template, rulesArr ] = data.split(/\n\n/);
    const rules = {};
    rulesArr.split(/\n/).forEach(el => {
        const [ from, to ] = el.split(' -> ');
        rules[from] = to;
    });
    return { template, rules };
}

const grow = (polymer, rules) => {
    let newPolymer = polymer[0];
    for (let i = 1; i < polymer.length; i++) {
        const str = polymer.slice(i - 1, i + 1);
        if (rules[str] === undefined) {
        } else {
            newPolymer += `${rules[str]}${str[1]}`;
        }
    }
    return newPolymer;
}

const getPolymer = (template, rules, steps) => {
    let polymer = template;  
    for (let i = 0; i < steps; i++) {
        polymer = grow(polymer, rules);
    }
    return polymer;
}

const getFrequency = polymer => {
    const frequencies = polymer.split('').reduce((acc, el) => {
        acc[el] = acc[el] ? ++acc[el] : 1;
        return acc;
    }, {});
    return Object.entries(frequencies).sort((a, b) => a[1] - b[1]).map(arr => {return {el: arr[0], val: arr[1]}});
}

const partOne = data => {
    const { template, rules } = parseData(data);
    const polymer = getPolymer(template, rules, 10);
    const frequencies = getFrequency(polymer);
    return frequencies[frequencies.length - 1].val - frequencies[0].val;    
}

window.onload = () => {
    document.querySelector('.app').innerHTML = partOne(data);
}

export { partOne };