const fs = require("fs");
const rawInput = fs.readFileSync("./input2.txt").toString().split("\n");
const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const getColourNumber = (string) => {
  if (string.includes("red")) {
    return { red: Number(string.replace(" red", "")) };
  }
  if (string.includes("green")) {
    return { green: Number(string.replace(" green", "")) };
  }
  if (string.includes("blue")) {
    return { blue: Number(string.replace(" blue", "")) };
  }
};

const part1 = () => {
  const getGameId = (string) => Number(string.split(" ")[1]);
  let total = 0;
  for (const line of rawInput) {
    let isPossible = true;
    const [idString, trials] = line.split(":");
    const gameId = getGameId(idString);

    const trialsArray = trials.split(";");
    for (const trial of trialsArray) {
      const parts = trial.split(",");
      let allPartsValid = true;
      for (const part of parts) {
        const colourNumber = getColourNumber(part);
        if (
          (colourNumber.red && colourNumber.red > MAX_RED) ||
          (colourNumber.green && colourNumber.green > MAX_GREEN) ||
          (colourNumber.blue && colourNumber.blue > MAX_BLUE)
        ) {
          allPartsValid = false;
          break;
        }
      }
      if (!allPartsValid) {
        isPossible = false;
        break;
      }
    }
    if (isPossible) {
      total += gameId;
    }
  }
  return total;
};

const part2 = () => {
  let total = 0;
  const minimums = { red: 0, green: 0, blue: 0 };
  for (const line of rawInput) {
    minimums.red = 0;
    minimums.green = 0;
    minimums.blue = 0;
    const [_, trials] = line.split(":");

    const trialsArray = trials.split(";");
    for (const trial of trialsArray) {
      const parts = trial.split(",");
      for (const part of parts) {
        const colourNumber = getColourNumber(part);
        if (colourNumber.red && colourNumber.red > minimums.red) {
          minimums.red = colourNumber.red;
        }
        if (colourNumber.green && colourNumber.green > minimums.green) {
          minimums.green = colourNumber.green;
        }
        if (colourNumber.blue && colourNumber.blue > minimums.blue) {
          minimums.blue = colourNumber.blue;
        }
      }
    }
    const power = minimums.red * minimums.green * minimums.blue;
    total += power;
  }
  return total;
};

console.log(`Answer for part 1: ${part1()}`);
console.log(`Answer for part 2: ${part2()}`);
