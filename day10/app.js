import { data_example } from "./data_example.js";
import { data } from "./data.js";

const parseData = data => data.split(/\n\s+/);

const legal = [
    {   open: '(',
        closed: ')',
        corrupted_points: 3,
        incomplete_points: 1
    },  
    {
        open: '[',
        closed: ']', 
        corrupted_points: 57,
        incomplete_points: 2
    },
    {   open: '{',
        closed: '}',
        corrupted_points: 1197,
        incomplete_points: 3
    },  
    {
        open: '<',
        closed: '>', 
        corrupted_points: 25137,
        incomplete_points: 4
    },
    
];

const clearChunk = str => {
    const re = new RegExp(legal.map(el => `\\${el.open}\\${el.closed}`).join('|'), 'g'); // \(\)|\[\]|\<\>|\{\}
    str = str.replace(re, '');
    return re.test(str) ? clearChunk(str) : str;
}

const findCorruptedBracket = str => {
    const re = new RegExp(legal.map(el => `\\${el.closed}`).join('|')); // \)|\]|\>|\}
    const res = re.exec(str);
    return res ? res[0] : false;
}
 
const sortChunks = chunks => {
    const res = { corrupted: [], incomplete: []};
    chunks.forEach(chunk => {
        chunk = clearChunk(chunk);
        const corruptedBracket = findCorruptedBracket(chunk);
        if (corruptedBracket) {
            res.corrupted.push({ chunk, bracket: corruptedBracket });
        } else res.incomplete.push({ chunk });
    });
    return res;
}

const countCorruptedChunksScore = data => {
    const chunks = parseData(data);
    const corrupted = sortChunks(chunks)['corrupted'];
    const scores = corrupted.map(el => {
        const search = legal.find(bracket => bracket.closed === el.bracket);
        return search.corrupted_points;
    });
    return scores.reduce((acc, el) => acc + el);
}

const countIncompleteChunksScore = data => {
    const chunks = parseData(data);
    const incomplete = sortChunks(chunks)['incomplete'];
    const scores = incomplete.map(el => el.chunk.split('')
                                                .reduceRight((acc, el) => {
                                                    const search = legal.find(bracket => bracket.open === el);
                                                    return acc * 5 + search.incomplete_points;
                                                }, 0)
                                ).sort((a, b) => a - b);
    return scores[(scores.length - 1) / 2];
}

window.onload = () => {
    document.querySelector('.app').innerHTML = countIncompleteChunksScore(data);
}

export { countCorruptedChunksScore, countIncompleteChunksScore };