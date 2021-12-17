import { data_example } from "./data_example.js";
import { data } from "./data.js";
import { data_example2 } from "./data_example2.js";

const parseData = data => data.split(/\n/).map(el => el.split('').map(val => +val));

const generateComponents = data => {
    const components = {1: data};
    for (let i = 0; i < 8; i++) {
        let tmp = [];
        for (let j in data) {
            tmp.push([...data[j].map(el => {
                return (el + i) % 9 + 1;
            })]);
        };
        components[i + 2] = tmp;
    }
    return components;
}

const parseEnlargedData = data => {
    const dataSource = parseData(data);
    const components = generateComponents(dataSource);
    const dataParsed = [];
    
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < dataSource.length; j++) {
            dataParsed.push([]);
            const n = i * dataSource.length + j;
            for (let k = 1; k <= 5; k++) {
                dataParsed[n] = dataParsed[n].concat(components[i + k][j]);
            }
        }
    }

    return dataParsed;    
}

const generateEmptyGraph = (chitonMap) => {
    let graph = [];
    for (let i = 0; i < chitonMap.length; i++) {
        graph[i] = [];
        for (let j = 0; j < chitonMap[0].length; j++) {
            graph[i][j] = { val: Number.MAX_VALUE, weight: chitonMap[i][j], visited: false, parent: null };
        }
    }

    graph[0][0].val = 0;
    graph[0][0].visited = true;
    return graph;
}

const findNeighbors = (current, graph) => {
    const {x, y} = current;
    const neighbors = [{x: x - 1, y},
                        {x: x + 1, y},
                        {x, y: y - 1},
                        {x, y: y + 1}];
    return neighbors
                .filter(el => graph[el.x]?.[el.y]?.weight !== undefined && !graph[el.x][el.y].visited)
                .sort((a, b) => graph[a.x][a.y].weight - graph[b.x][b.y].weight);
}

const buildGraph = chitonMap => {
    const graph = generateEmptyGraph(chitonMap);
    let queue = [{x: 0, y: 0}];
    while (queue.length > 0){
        let currentIndex = 0;
        for (let i = 1; i < queue.length; i++) {
            const {x, y} = queue[i];
            const {x: currentX, y: currentY} = queue[currentIndex];
            if (graph[x][y].val < graph[currentX][currentY].val) {
                currentIndex = i;
            } 
        }
        const current = queue[currentIndex];
        queue.splice(currentIndex, 1);

        findNeighbors(current, graph).forEach(coords => {        
            const {x, y} = coords;
            const possiblePath = chitonMap[x][y] + graph[current.x][current.y].val;
            if (possiblePath < graph[x][y].val) {
                graph[x][y].val = possiblePath;
                graph[x][y].parent = current;
            }
            graph[x][y].visited = true;
            queue.push(coords);
        });
    }
    return graph;
}

const findSafePath = (data, enlarged=false) => {
    const chitonMap = enlarged ? parseEnlargedData(data) : parseData(data);
    const graph = buildGraph(chitonMap);
    
    // let res = '';
    // for (let i = 0; i < graph.length; i++) {
    //     for (let j = 0; j < graph[0].length; j++) {
    //         res += (graph[i][j].val === Math.MAX_VALUE ? '--' : graph[i][j].val).toString().padStart(2, '0') + ' ';
    //     }
    //     res += '\n';
    // }
    // console.log(res);    

    return graph[graph.length - 1][graph[0].length - 1].val;
}

window.onload = () => {
    document.querySelector('.app').innerHTML = findSafePath(data, true);
}

export { findSafePath };