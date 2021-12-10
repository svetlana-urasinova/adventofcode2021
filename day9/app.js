import { data_example } from "./data_example.js";
import { data } from "./data.js";

const parseData = data => data.split(/\n/).map(el => el.split('').map(n => +n));

const findLowPoints = heights => {
    const lowPoints = heights.map(el => new Array(el.length).fill(1));

    for (let i in lowPoints) {
        for (let j in lowPoints[i]) {
            const left = heights[i][j - 1] ?? null;
            const top = heights[i - 1] ? heights[i - 1][j] ?? null : null;
            if (lowPoints[i][j] === 1) {
                if (left !== null) {
                    if (heights[i][j] >= left) {
                        lowPoints[i][j] = 0;
                    } else {
                        lowPoints[i][j - 1] = 0;
                    }
                }
                if (top !== null) {
                    if (heights[i][j] >= top) {
                        lowPoints[i][j] = 0;
                    } else {
                        lowPoints[i - 1][j] = 0;
                    }
                }
            }
        }
    }

    const res = [];
    lowPoints.forEach((el, i) => el.forEach((point, j) => {
        if (point === 1) { res.push({x: i, y: j}); }
    }));
    return res;
}

const findLowPointsRiskLevels = data => {
    const heights = parseData(data);
    const lowPoints = findLowPoints(heights);
    return lowPoints.reduce((acc, el) => acc + heights[el.x][el.y] + 1, 0);

}

const findBasins = (heights, lowPoints) => {
    const findBasin = (coords, heights, basin=null) => {
        const {x, y} = coords;
        if (basin === null) {
            basin = heights.map(el => new Array(el.length).fill(0));
        }
        basin[x][y] = 1;
        const new_neighbors = [
            {x: x - 1, y},
            {x: x + 1, y},
            {x, y: y - 1},
            {x, y: y + 1}
        ].filter(el => heights[el.x] !== undefined 
                    && heights[el.x][el.y] !== undefined 
                    && heights[el.x][el.y] !== 9
                    && basin[el.x][el.y] === 0);
        if (new_neighbors.length > 0) {
            new_neighbors.forEach(el => {
                basin = findBasin(el, heights, basin);
            });
        }
        return basin;
    } 

    const basins = [];
    lowPoints.forEach(coords => {
        basins.push(findBasin(coords, heights));
    });
    return basins;
}

const findBasinsAreas = data => {
    const heights = parseData(data);
    const lowPoints = findLowPoints(heights);
    const basins = findBasins(heights, lowPoints);
    const basins_sums = basins.map(el => el.reduce((acc, str) => 
                                    acc + str.reduce((sum, num) => sum + num, 0)
                                , 0));

    return basins_sums.sort((a, b) => b - a)
                        .slice(0, 3)
                        .reduce((acc, el) => acc * el);
}

window.onload = () => {
    document.querySelector('.app').innerHTML = findBasinsAreas(data);
}

export { findLowPointsRiskLevels, findBasinsAreas };