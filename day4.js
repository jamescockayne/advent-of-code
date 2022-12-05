const fs = require('fs');
const array = fs.readFileSync('input4.txt').toString().split("\n");
let fullyContained = 0;
let overlaps = 0;

for (const pair of array) {
    if (!pair) {
        continue;
    }

    const [range1, range2] = pair.split(',');
    const [start1, end1] = range1.split('-').map(Number);
    const [start2, end2] = range2.split('-').map(Number); 

    if (
        (start1 <= start2 && end1 >= end2) ||
        (start1 >= start2 && end1 <= end2)
    ) {
        fullyContained++;
    }

    if (
        (start1 <= start2 && end1 >= start2) ||
        (start2 <= start1) && (end2 >= start1)
    ){
        overlaps++;
    }
}

console.log(`part 1: ${fullyContained}`);
console.log(`part 2: ${overlaps}`);