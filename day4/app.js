import { data_example } from "./data_example.js";
import { data } from "./data.js";

const size = 5;

const checkRow = (arr, x) => {
    const filtered = [];
    for (let i = size * x; i < size * (x + 1); i++) { 
        filtered.push(arr[i]); 
    }
    return filtered.every(el => el === null);
}

const checkColumn = (arr, y) => {
    const filtered = [];
    for (let i = y; i < arr.length; i += size) {
        filtered.push(arr[i]);
    }
    return filtered.every(el => el === null);
}

const findWinners = (data) => {
    const boards = data.boards.split(/\n\n/).map(str => str.trim().split(/\n|\s+/).map(el => +el));
    const winners = new Array(boards.length).fill(null);
    const numbers = data.numbers.split(',').map(el => +el);
    let winnersCount = 0;
    let k = 0;
    while (k < numbers.length) {
        for (let i = 0; i < boards.length; i++) {
            if (winners[i] === null) {
                const n = boards[i].findIndex(el => el === numbers[k]);
                boards[i][n] = null;
                const x = Math.floor(n / size);
                const y = n % size;
                if (checkRow(boards[i], x) || checkColumn(boards[i], y)) {
                    winnersCount++;
                    winners[i] = { board: boards[i], num: numbers[k], place: winnersCount };
                }
            }
            //if (winners.every(el => el !== null)) { return winners; }
            if (winnersCount === boards.length) { return winners; }
        }
        k++;
    }    
} 

const countScore = (board, num) => board.reduce((acc, el) => el === null ? acc : acc + el) * num;

const findWinner = (data, mode='first') => {
    const winners = findWinners(data);
    const place = mode === 'first' ? 1 : winners.length;
    const {board, num} = winners.find(el => el.place === place);
    return countScore(board, num);
}

window.onload = () => {
    document.querySelector('.app').innerHTML = findWinner(data, 'last');
}

export { findWinner };