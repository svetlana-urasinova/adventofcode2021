import { data_example } from "./data_example.js";
import { data } from "./data.js";

const parseData = data => {
    let [coords, instructions] = data.split(/\n\n/).map(el => el.split(/\n/));
    
    coords = coords.map(el => {
        const [x, y] = el.split(',').map(el => +el);
        return {x, y};
    });
    const points = parseCoords(coords);
    instructions = parseInstructions(instructions);

    return { points, instructions };
}

const parseCoords = coords => {
    const getMax = (axis, coords) => Math.max.apply(null, coords.map(el => el[axis])); 

    let points = [];
    for (let i = 0; i <= getMax('y', coords); i++) {
        points[i] = new Array(getMax('x', coords) + 1).fill('.');
    }
    
    for (let i = 0; i < coords.length; i++) {
        const {x, y} = coords[i];
        points[y][x] = '#';
    }

    return points;
}

const parseInstructions = instructions => {
    return instructions.map(el => {
        let [axis, val] = el.replace('fold along ', '').split('=');
        val = +val;
        return {axis, val};
    });

}

const render = points => {
    let output = '';
    for (let i in points) {
        for (let j = 0; j < points[0].length; j++) {
            output += points[i][j];
        } 
        output += "\n";
    }
    console.log(output);
}

const foldAlong = (points, instruction) => {
    let newPoints = [];
    const x_max = instruction.axis === 'x' ? instruction.val : points[0].length;
    const y_max = instruction.axis === 'y' ? instruction.val : points.length;
    for (let i = 0; i < y_max; i++) {
        newPoints[i] = [];
        for (let j = 0; j < x_max; j++) {
            const i_diff = instruction.axis === 'y' ? points.length - i - 1 : i;
            const j_diff = instruction.axis === 'x' ? points[0].length - j - 1 : j;
            newPoints[i][j] = points[i][j] === '#' || points[i_diff][j_diff] === '#' ? '#' : '.'; 
        }
    }
    return newPoints;
}

const countPoints = points => {
    return points.reduce((acc, str) => acc + str.filter(point => point === '#').length, 0);
}

const countVisibleDots = data => {
    let { points, instructions } = parseData(data);
    points = foldAlong(points, instructions[0]);
    return countPoints(points);
}

const findCode = data => {
    let { points, instructions } = parseData(data);
    for (let i in instructions) {
        points = foldAlong(points, instructions[i]);
    }
    render(points);
}

window.onload = () => {
    document.querySelector('.app').innerHTML = findCode(data);
}

export { countVisibleDots };