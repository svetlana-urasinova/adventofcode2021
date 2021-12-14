import { data_example } from "./data_example.js";
import { data } from "./data.js";

const parseData = data => {
    let [points, fold] = data.split(/\n\n/).map(el => el.split(/\n/));
    points = points.map(el => {
        const [x, y] = el.split(',').map(el => +el);
        return {x, y};
    });
    fold = fold.map(el => {
        let [coord, val] = el.replace('fold along ', '').split('=');
        val = +val;
        return {coord, val};
    });
    return {points, fold};
}

const countDots = data => {
    const manual = parseData(data);
    console.log(manual);
}

window.onload = () => {
    document.querySelector('.app').innerHTML = countDots(data_example);
}

export { countDots };