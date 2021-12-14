import { data_example } from "./data_example.js";
import { data } from "./data.js";
import { data_example2 } from "./data_example2.js";

const parseData = data => {
    const parsedData = data.split(/\n/).map(el => el.split('-'));
    const vertices = {};
    const pushVertice = (a, b) => {
        vertices[a] = {
            connections: [...(vertices[a]?.connections || []), b],
            repeatable: a.toUpperCase() === a,
        }
    }

    for (let i in parsedData) {
        const [from, to] = parsedData[i];
        pushVertice(from, to);
        pushVertice(to, from);
    }
    return vertices;
}

const findPaths = (paths, vertices) => {
    const newPaths = [];
    let done = true;

    paths.forEach(path => {
        const last = path[path.length - 1];
        if (last === 'end') {
            newPaths.push(path);
        } else {
            vertices[last].connections.forEach(con => {
                if (con === 'start') return;
                if (vertices[con].repeatable || !path.includes(con)) {
                    vertices[con] = {...vertices[con], visited: true};
                    newPaths.push([...path, con]);
                    done = false;
                }
            });
        }
    });

    return done === true ? newPaths : findPaths(newPaths, vertices);
}

const findPathsWithSecondChance = (paths, vertices, k=0) => {
    k++;
    const newPaths = [];
    let done = true;

    paths.forEach(path => {
        const last = path.content.slice(-1)[0];
        if (last === 'end') {
            newPaths.push(path);
        } else {
            vertices[last].connections.forEach(con => {
                let double = path.double;
                if (con === 'start') return;
                if (!vertices[con].repeatable && path.content.includes(con)) {
                    if (double) { return; }
                    double = true;
                } 

                vertices[con] = {...vertices[con], visited: true};
                newPaths.push({content: [...path.content, con], double});
                done = false;
            });
        }
    });

    return done === true ? newPaths : findPathsWithSecondChance(newPaths, vertices, k);
}

const findPossiblePaths = (data, secondChance=false) => {
    const vertices = parseData(data);
    let res;
    if (secondChance) {
        res = findPathsWithSecondChance([{content: ['start'], double: false}], vertices);
    } else {
        res = findPaths([['start']], vertices);
    }
    return res.length;
}

window.onload = () => {
    document.querySelector('.app').innerHTML = findPossiblePaths(data, true);
}

export { findPossiblePaths };