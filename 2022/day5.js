const fs = require('fs');
const array = fs.readFileSync('input5.txt').toString().split("\n");
const createInput = () => ({
    1: ['H', 'R', 'B', 'D', 'Z', 'F', 'L', 'S'],
    2: ['T', 'B', 'M', 'Z', 'R'],
    3: ['Z', 'L', 'C', 'H', 'N', 'S'],
    4: ['S', 'C', 'F', 'J'],
    5: ['P', 'G', 'H', 'W', 'R', 'Z', 'B'],
    6: ['V', 'J', 'Z', 'G', 'D', 'N', 'M', 'T'],
    7: ['G', 'L', 'N', 'W', 'F', 'S', 'P', 'Q'],
    8: ['M', 'Z', 'R'],
    9: ['M', 'C', 'L', 'G', 'V', 'R', 'T']
});

const part1 = () => {
    let answer = '';
    const stacks = createInput();
    for (const instruction of array) {
        const {1: quantity, 3: from, 5: to} = instruction.split(' ').map(Number);
        for (let i = 0; i < quantity; i++) {
            stacks[to].push(stacks[from].pop());
        }
    }
    for (let i=1; i<=9; i++) {
        answer += stacks[i].pop();
    }
    return answer;
}

const part2 = () => {
    let answer = '';
    const stacks = createInput();
    for (const instruction of array) {
        if (!instruction) {
            continue;
        }
        const {1: quantity, 3: from, 5: to} = instruction.split(' ').map(Number);
        const removedStack = stacks[from].splice(stacks[from].length - quantity, quantity);
        stacks[to].push(...removedStack); 
    }
    for (let i=1; i<=9; i++) {
        answer += stacks[i].pop();
    }
    return answer;
}

console.log(part1()); // RNZLFZSJH
console.log(part2()); //CNSFCGJSM