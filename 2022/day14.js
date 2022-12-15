const fs = require('fs');
const { Reset, Bright, FgYellow, FgBlue } = require('../utility/ansiCodes');
const rawInput = fs.readFileSync('./input14.txt').toString().split("\n");
const airChar = ' ';
let maxDepth = 0;
let maxWidth = 0;
let minWidth = Infinity;
let totalGrains = {
    part1: 0,
    part2: 0
}

const makeCave = (input, includeFloor) => {
    const cave = [];
    const linePairs = [];
    for (const line of input) {
        const split = line.split(' -> ');
        for (let i=0; i<split.length - 1; i++) {
            linePairs.push([split[i], split[i+1]]);
        }
    }
    for (const pair of linePairs) {
        const [point1, point2] = pair;
        const [point1x, point1y] = point1.split(',').map(Number);
        const [point2x, point2y] = point2.split(',').map(Number);
    
        maxDepth = Math.max(maxDepth, point1y, point2y);
        maxWidth = Math.max(maxWidth, point1x, point2x);
        minWidth = Math.min(minWidth, point1x, point2x);
    
        if (point1x === point2x) {
            const from = Math.min(point1y, point2y);
            const to = Math.max(point1y, point2y) +1;
            for (let i=from; i<to; i++) {
                cave[i] = cave[i] || [];
                cave[i][point1x] = '#';
            }
        }
        if (point1y === point2y) {
            const from = Math.min(point1x, point2x);
            const to = Math.max(point1x, point2x) +1
            for (let i=from; i<to; i++) {
                cave[point1y] = cave[point1y] || [];
                cave[point1y][i] = '#';
            }
        }
    }
    if (includeFloor) {
        cave[maxDepth+2] = [];
        for (let i=-1000; i<2000; i++) {
            cave[maxDepth+2][i] = '#';
        }
        maxWidth = 2000;
        minWidth = -1000;
    }
    for (let i=0; i<(includeFloor ? maxDepth+3 : maxDepth+1); i++) {
        cave[i] = cave[i] || [];
        for (let j=minWidth-10; j<maxWidth+10; j++) {
            if (cave[i]?.[j] !== '#') {
                cave[i][j] = airChar;
            }
        }
    }
    return cave;
}

const dropSand = (cave, part) => {
    let x = 500;
    let y = 0;
    while (true) {
        if (cave[y+1]?.[x] === undefined) {
            return false;
        }
        if (cave[y+1]?.[x] === airChar) {
            y++;
        } else if (cave[y+1]?.[x-1] === airChar)  {
            y++;
            x--;
        } else if (cave[y+1]?.[x+1] === airChar) {
            y++;
            x++;
        } else {
            break;
        }
    }
    cave[y][x] = 'o';
    totalGrains[part]++;
    return y === 0 ? false : true;
}

const printCave = (cave) => {
    for (const line of cave.map(e => e.slice(minWidth - 10, maxWidth + 10).join(''))) {
        for (const char of line) {
            if (char === 'o') {
                process.stdout.write(`${Bright}${FgYellow}${char}${Reset}`)
            } else if (char === '#') {
                process.stdout.write(`${Bright}${FgBlue}${char}${Reset}`)
            } else {
                process.stdout.write(Buffer.from(char ?? airChar)) 
            }
        }
        process.stdout.write('\n');
    }
}

const part1 = async (animate) => {
    const cave = makeCave(rawInput);
    let lastDropSuccessful = true;
    while (lastDropSuccessful) {
        animate && process.stdout.write('\u001B[?25l');
        animate && process.stdout.cursorTo(0,0);
        lastDropSuccessful = dropSand(cave, 'part1');
        animate && printCave(cave);
    }
    console.log(totalGrains.part1);
}

const part2 = () => {
    const cave = makeCave(rawInput, true);
    let lastDropSuccessful = true;
    while (lastDropSuccessful) {
        lastDropSuccessful = dropSand(cave, 'part2');
    }
    console.log(totalGrains.part2); 
}

part1();
part2();