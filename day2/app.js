import { data } from "./data.js";

const parsePath = (str) => {
    const [direction, lng] = str.split(' ');
    return {direction, lng: Number(lng)};
}

const findPosition = (data) => {
    const res = data.split(',').reduce((acc, el) => {
        const path = parsePath(el);
        path.direction === 'forward' ? acc.x += path.lng
            : acc.y += path.direction === 'down' ? path.lng : -1 * path.lng;
        return acc;
    }, {x: 0, y: 0});

    return res.x * res.y;
}

const findAimedPosition = (data) => {
    const res = data.split(',').reduce((acc, el) => {
        const path = parsePath(el);
        if (path.direction === 'forward') {
            acc.x += path.lng;
            acc.y += acc.aim * path.lng;
        } else {
            acc.aim += path.direction === 'down' ? path.lng : -1 * path.lng;
        }
        return acc;
    }, {x: 0, y: 0, aim: 0});

    return res.x * res.y;
}


window.onload = () => {
    document.querySelector('.app').innerHTML = findAimedPosition(data);
}

export { findPosition, findAimedPosition }; 