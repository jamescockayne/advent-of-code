const fs = require('fs');
const array = fs.readFileSync('input3.txt').toString().split("\n");
const duplicates = [];
const priorityValues = [null, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const priorityMap = new Map(priorityValues.map((value, index) => [value, index]));
let currentThree = [];

while (array) {
    while (currentThree.length < 3) {
        const current = array.shift();
        if (!current) {
            break;
        }
        currentThree.push(current);
    }
    if (currentThree.length < 3) {
        break;
    }
    const [backpack1, backpack2, backpack3] = currentThree;

    const atLeastTwo = new Set();
    const firstSet = new Set(backpack1);

    for (const item of backpack2) {
        if (firstSet.has(item)) {
            atLeastTwo.add(item);
        }
    }

    for (const item of backpack3) {
        if (atLeastTwo.has(item)) {
            duplicates.push(item);
            console.log(item);
            break;
        }
    }
    currentThree = [];
}

const result = duplicates.reduce((prev, curr) => prev + priorityMap.get(curr), 0);
console.log(result);