const fs = require('fs');
const rawInput = fs.readFileSync('./input13.txt').toString().split("\n");

let index = 1;
const correctPacketIndicies = [];
let pairs = [];

const isNumber = (value) => {
    return typeof value === 'number';
}

const isPacketOrderCorrect = (leftPacket, rightPacket) => {
    for (let i=0; i<leftPacket.length; i++) {
        const leftValue = leftPacket[i];
        const rightValue = rightPacket[i];

        if (rightValue === undefined) {
            return false;
        }

        if (isNumber(leftValue) && isNumber(rightValue)) {
            if (leftValue !== rightValue) {
                return leftValue < rightValue ? true : false
            }
        } else {
            const correct = isPacketOrderCorrect(isNumber(leftValue) ? [leftValue] : leftValue, isNumber(rightValue) ? [rightValue] : rightValue)
            if (correct !== null) {
                return correct;
            }
        }
    }
    return rightPacket.length > leftPacket.length ? true : null;
}


const part1 = () => {
    for (let i=0; i<rawInput.length; i+=3) {
        const leftPacket = JSON.parse(rawInput[i]);
        const rightPacket = JSON.parse(rawInput[i+1])
        pairs.push([leftPacket, rightPacket]);
    }

    pairs.forEach(([leftPacket, rightPacket]) => {
        if (isPacketOrderCorrect(leftPacket, rightPacket)) {
            correctPacketIndicies.push(index);
        } 
        index++ 
    })

    console.log(correctPacketIndicies.reduce((prev, curr) => prev + curr, 0))
}

const part2 = () =>{
    const [marker1, marker2] = [[[2]], [[6]]]
    const allInstructions = pairs.flat();
    allInstructions.push(...[marker1, marker2])
    const sorted = allInstructions.sort((a, b) => isPacketOrderCorrect(a, b) ? -1 : 1)
    console.log((sorted.indexOf(marker1)+1) * (sorted.indexOf(marker2)+1))
}

part1();
part2();