import { data_example } from "./data_example.js";
import { data } from "./data.js";
import { Canvas } from "./Canvas.js";

const findOverlapPoints = (data, diagonal=false) => {
    const arr = data.split(/\n/);
    const canvas = new Canvas(diagonal);

    const parseCoords = str => {
        const res = str.split(',').map(el => +el);
        return { x: res[0], y: res[1] };
    }

    const getCoords = str => {
        const search = str.match(/^(\d+,\d+) -> (\d+,\d+)$/);
        const start = parseCoords(search[1]);
        const end = parseCoords(search[2]);
        return { x: [start.x, end.x ], y: [ start.y, end.y ]};
    }

    for (let i in arr) {
        const { x, y } = getCoords(arr[i]);
        canvas.adjust(x[0], y[0], x[1], y[1]);
        canvas.draw(x[0], y[0], x[1], y[1]);
    }

    const content = canvas.getContent();
    return content.map(str => str.reduce((count, el) => el > 1 ? ++count : count, 0)).reduce((acc, el) => acc + el);
}

window.onload = () => {
    document.querySelector('.app').innerHTML = findOverlapPoints(data, true);
}

export { findOverlapPoints };