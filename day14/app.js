import { data_example } from "./data_example.js";
import { data } from "./data.js";

const parseData = data => {
    let [ template, rules ] = data.split(/\n\n/);
    rules = rules.split(/\n/).map(el => {
        const [ from, to ] = el.split(' -> ');
        return { [from]: to };
    });
    return { template, rules };
}

const findMostCommonElement = data => {
    const { template, rules } = parseData(data);
    console.log(template);
    console.log(rules);
}

window.onload = () => {
    document.querySelector('.app').innerHTML = findMostCommonElement(data_example);
}

export { findMostCommonElement };