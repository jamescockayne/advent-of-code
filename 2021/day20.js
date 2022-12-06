const fs = require('fs');
const rawInput = fs.readFileSync('./input20.txt').toString().split("\n");

const algorithm = rawInput[0];
let inputImage = rawInput.slice(2).map(line => line.split(''));

const enhanceImage = (steps) => {
    for (let step = 1; step <= steps; step++) {
        const isEvenIteration = step % 2 === 0;
        addBorderSpace(inputImage, isEvenIteration);
        const [yLength, xLength] = [inputImage.length, inputImage[0].length];
        const output = [];
        
        for (let y = 0; y < yLength; y++) {
            output[y] = output[y] || [];
            for (let x = 0; x < xLength; x++) {
                let gridPixels = '';
                for (let y2 = y-1; y2 <= y+1; y2++) {
                    if (!inputImage[y2]) {
                        inputImage[y2] = [];
                    }
                    for (let x2 = x-1; x2 <= x+1; x2++) {
                        if (!inputImage[y2][x2]) {
                            inputImage[y2][x2] = isEvenIteration ? '#' : '.';
                        }
                        gridPixels += inputImage[y2][x2] === '.' ? '0' : '1'
                    }
                }
                output[y][x] = algorithm[parseInt(gridPixels, 2)];
            }
        }
        inputImage = output;
    }
    return inputImage;
}

const addBorderSpace = (array, isEven) => {
    const char = isEven ? '#' : '.';
    let newLine = [char, char];
    array.forEach(line => {
        line.unshift(char);
        line.push(char);
        newLine.push(char)
    })
    array.push([...newLine])
    array.unshift([...newLine])
}

const countLightPixels = (input) => {
    let count = 0;
    input.forEach(line => line.forEach(char => char === '#' ? count++ : null))
    return count;
}

const part1 = () => countLightPixels(enhanceImage(2));
const part2 = () => countLightPixels(enhanceImage(50));

console.log(part2())