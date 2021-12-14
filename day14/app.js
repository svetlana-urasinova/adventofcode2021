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

const partOne = data => {
    const { template, rules } = parseData(data);
    const polymer = getPolymer(template, rules, 10);

}

window.onload = () => {
    document.querySelector('.app').innerHTML = partOne(data_example);
}

export { partOne };