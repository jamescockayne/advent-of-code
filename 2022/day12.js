const Queue = require('../utility/queue.js')
const fs = require('fs');
const rawInput = fs.readFileSync('./input12.txt').toString().split("\n").map(row => row.split(''));

const endY = rawInput.findIndex(row => row.includes('E'));
const endX = rawInput[endY].findIndex(col => col === 'E');
rawInput[endY][endX] = 'z';

const bfs = (startY, startX) => {
    const pathArray = [];
    const costArray = [];
    const queue = new Queue();
    queue.add([startY, startX, 0]);
    
    while (!queue.isEmpty()) {
        const test = queue.dequeue();
        const [y, x, runningCost] = test;
        for ([dy, dx] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
            if (
                (rawInput[y+dy]?.[x+dx]) && // in-bounds
                (rawInput[y+dy][x+dx].charCodeAt(0) <= rawInput[y][x].charCodeAt(0) + 1) && // climbable
                (!pathArray[y+dy]?.[x+dx]) // we don't have a path to the node already
            ) {
                queue.add([y+dy, x+dx, runningCost+1]);
                pathArray[y+dy] = pathArray[y+dy] || [];
                pathArray[y+dy][x+dx] = `${y}-${x}`;
                costArray[y+dy] = costArray[y+dy] || [];
                costArray[y+dy][x+dx] = runningCost+1;
            }
        }
    }
    return costArray[endY]?.[endX] ?? null;
}

const part1 = () => {
    const startY = rawInput.findIndex(row => row.includes('S'));
    const startX = rawInput[startY].findIndex(col => col === 'S');
    rawInput[startY][startX] = 'a';
    return bfs(startY, startX);    
}

const part2 = () => {
    const costs = [];
    for (let y=0; y<rawInput.length; y++) {
        for (let x=0; x<rawInput[0].length; x++) {
            if (rawInput[y][x] === 'a') {
                costs.push(bfs(y, x))
            }
            
        }
    }
    return costs.filter(e => e !== null).sort()[0]
}

console.log(part1());
console.log(part2());