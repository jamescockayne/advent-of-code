const fs = require("fs");
const rawInput = fs.readFileSync("./input1.txt").toString().split("\n");

const part1 = () => {
  const identifyNumber = (line, index) => {
    const isNumberDigit = !isNaN(Number(line[index]));
    return isNumberDigit ? Number(line[index]) : null;
  };

  const getLineTotal = (line) => {
    let firstNumber;
    let lastNumber;
    for (let i = 0; i < line.length; i++) {
      const number = identifyNumber(line, i);
      if (number) {
        if (!firstNumber) {
          firstNumber = number;
        }
        lastNumber = number;
      }
    }
    return firstNumber * 10 + lastNumber;
  };

  return rawInput.reduce((acc, line) => {
    return acc + getLineTotal(line);
  }, 0);
};

const part2 = () => {
  const stringToNumber = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  const findNumberStringAtIndex = (line, index) => {
    for (const number of Object.keys(stringToNumber)) {
      let curr = index;
      let letterFound = true;
      for (const letter of number) {
        if (line[curr] !== letter) {
          letterFound = false;
          break;
        }
        curr++;
      }
      if (letterFound) {
        return number;
      }
    }
  };

  const identifyNumber = (line, index) => {
    const char = line[index];
    const isNumberDigit = !isNaN(Number(char));
    if (isNumberDigit) {
      return Number(char);
    }
    const numberString = findNumberStringAtIndex(line, index);
    if (numberString) {
      return stringToNumber[numberString];
    }
    return null;
  };

  const getLineTotal = (line) => {
    let firstNumber;
    let lastNumber;
    for (let i = 0; i < line.length; i++) {
      const number = identifyNumber(line, i);
      if (number) {
        if (!firstNumber) {
          firstNumber = number;
        }
        lastNumber = number;
      }
    }
    return firstNumber * 10 + lastNumber;
  };

  return rawInput.reduce((acc, line) => {
    return acc + getLineTotal(line);
  }, 0);
};

console.log(`Answer for part 1: ${part1()}`);
console.log(`Answer for part 2: ${part2()}`);
