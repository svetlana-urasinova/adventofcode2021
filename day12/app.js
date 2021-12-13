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

const findPaths = (paths, vertices, smallCavesVisitTwice, k=0) => {
    k++;
        const newPaths = [];
        let done = true;

        paths.forEach(path => {
            const last = path[path.length - 1];
            if (last === 'end') {
                newPaths.push(path);
            } else {
                vertices[last].connections.forEach(con => {
                    if (con !== 'start' && 
                        (vertices[con].repeatable || !path.includes(con))) {
                        vertices[con] = {...vertices[con], visited: true};
                        newPaths.push([...path, con]);
                        done = false;
                    }
                });
            }
        });

        return (done === true || k > 50) ? newPaths : findPaths(newPaths, vertices, smallCavesVisitTwice, k);
}

const findPossiblePaths = (data, smallCavesVisitTwice=false) => {
    const vertices = parseData(data);
    const res = findPaths([['start']], vertices, smallCavesVisitTwice);
    //console.log(res.sort((a, b) => a.length - b.length));
    return res.length;
}

window.onload = () => {
    document.querySelector('.app').innerHTML = findPossiblePaths(data_example, false);
}

export { findPossiblePaths };