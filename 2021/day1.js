const fs = require('fs');
const input = fs.readFileSync('./input1.txt').toString().split("\n").map(Number);

const part1 = () => {
    let count = 0;
    for (i=1; i<input.length; i++) {
        if (input[i] > input[i-1]){
            count++;
        }
    }
    return count;
}

const part2 = () => {
    let count = 0;
    let prevSum = input[0] + input[1]+ input[2];
    for (i=1; i<input.length - 2; i++) {
        const sum = input[i] + input[i+1]+ input[i+2];
        if (sum > prevSum){
            count++;
        }
        prevSum = sum;
    }
    return count;
}

console.log(part1());
console.log(part2());