const fs = require('fs');
const instructions = fs.readFileSync('./input10.txt').toString().split("\n");
let x = 1;
let cycle = 0;
const cyclesToInspect = [20, 60, 100, 140, 180, 220];
const signalStrengths = [];
const spritePosition = new Array(240);
const crt = new Array(240);

const updateSpritePosition = () => {
    for (let i=0; i<spritePosition.length; i++) {
       spritePosition[i] = undefined; 
    }
    spritePosition[x-1] = true;
    spritePosition[x] = true;
    spritePosition[x+1] = true;
}

const drawSprite = (cycle) => {
    if (spritePosition[cycle%40]) {
        crt[cycle] = '#';
    } else {
        crt[cycle] = ' ';
    }
}

const drawCrt = (crt) => {
    crtRows = 6;
    crtWidth = 40;

    let display = [];

    for (let y=0; y<crtRows; y++) {
        for (let x=0; x<crtWidth; x++) {
            display[y] = display[y] || [];
            display[y][x] = crt[crtWidth * y + x]
        }
    }
    console.log(display.map(line => line.join('')).join('\n'));
}
const inspectCycle = (currentCycle) => {
    if (cyclesToInspect.includes(currentCycle)) {
        signalStrengths.push(x*currentCycle)
    }
}

updateSpritePosition();

for (const instruction of instructions) {
    inspectCycle(cycle+1)
    drawSprite(cycle);
    cycle++;
    
    if (instruction === 'noop') {
        continue;
    }
    if (instruction.startsWith('addx')) {
        const valueToAdd = Number(instruction.split(' ')[1]);
        inspectCycle(cycle+1)
        drawSprite(cycle);

        cycle++;
        drawSprite(cycle);

        x += valueToAdd;
        updateSpritePosition();
    }
}


console.log('Part 1: ' + signalStrengths.reduce((prev, curr) => prev + curr))
drawCrt(crt)
