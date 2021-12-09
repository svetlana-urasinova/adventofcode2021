import { data_example } from "./data_example.js";
import { data_example2 } from "./data_example2.js";
import { data } from "./data.js";

const parseData = data => data.split(/\n/)
                                .map(el => el.split(/\s\|\s/))
                                .map(el => el.map(str => str.split(/\s+/)))
                                .map(arr => { return { patterns: arr[0] , output: arr[1]}});

const countUniqueDigits = data => {
    const parsedData = parseData(data);
    console.log(parsedData);
    const props = {
        2: 1,
        3: 7,
        4: 4,
        7: 8
    }

    const res = {};
    
    parsedData.forEach(el => el.output.forEach(str => {
        const l = str.length;
        if (props[l] !== undefined) { res[l] = res[l] ? ++res[l] : 1; }
    }));

    const vals = Object.values(res);
    return vals.length > 0 ? vals.reduce((acc, el) => acc + el) : 0;
}

const countAllDigits = data => {

}

window.onload = () => {
    document.querySelector('.app').innerHTML = countUniqueDigits(data);
}

export { countUniqueDigits, countAllDigits };