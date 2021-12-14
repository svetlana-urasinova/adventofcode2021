import { data_example } from "./data_example.js";
import { data } from "./data.js";

const parseData = data => {
    let [ template, rules ] = data.split(/\n\n/);
    return { template, rules: parseRules(rules) };
}

const parseTemplate = template => {
    const res = {};
    for (let i = 0; i < template.length - 1; i++) {
        const current = template[i];
        const next = template[i + 1];
        if (res[current] === undefined) { res[current] = {}};
        res[current][next] = res[current][next] === undefined ? 1 : ++res[current][next];
    }
    return res;
}

const parseRules = rules => {
    const res = {};
    rules.split(/\n/).forEach(el => {
        const [ from, to ] = el.split(' -> ');
        res[from] = to;
    });
    return res;
}

const grow = (polymer, rules) => {
    let res = {};
    for (let current in polymer) {
        for (let next in polymer[current]) {
            const insert = rules[`${current}${next}`];
            const count = polymer[current][next];
            res[current] = res[current] || {};
            res[current][insert] = res[current][insert] + count || count;
            res[insert] = res[insert] || {};
            res[insert][next] = res[insert][next] + count || count;
        }
    }
    return res;
}

const getPolymer = (template, rules, steps) => {
    let polymer = parseTemplate(template);
    for (let i = 0; i < steps; i++) {
        polymer = grow(polymer, rules);
    }
    return polymer;
}

const getFrequency = (polymer, template) => {
    const frequencies = {}; 
    Object.values(polymer).forEach(obj => { 
        Object.keys(obj).forEach(key => {
            frequencies[key] = frequencies[key] ? frequencies[key] + obj[key] : obj[key];
        });
    });
    frequencies[template[0]]++;
    return Object.entries(frequencies).sort((a, b) => a[1] - b[1]).map(el => { return {el: [el[0]], val: el[1]}});
}

const countDiff = (data, steps) => {
    const { template, rules } = parseData(data);
    const polymer = getPolymer(template, rules, steps);
    const frequencies = getFrequency(polymer, template);
    return frequencies[frequencies.length - 1].val - frequencies[0].val;    
}

window.onload = () => {
    document.querySelector('.app').innerHTML = countDiff(data, 40);
}

export { countDiff };