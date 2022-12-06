const fs = require('fs');
const input = fs.readFileSync('input6.txt').toString();

const isWindowNonRepeating = (window) => {
    const set = new Set(window);
    return set.size === window.length;
}

const findIndexOfFirstNonRepeatingSubstring = (input, length) => {
    const window = input.split('').slice(0, length);
    for (let i=length-1; i<input.length; i++) {
        if (isWindowNonRepeating(window)) {
           return i; 
        } else {
            window.shift();
            window.push(input[i]);
        }
    }
}

const part1 = () => findIndexOfFirstNonRepeatingSubstring(input, 4);
const part2 = () => findIndexOfFirstNonRepeatingSubstring(input, 14);

console.log(part1());
console.log(part2());