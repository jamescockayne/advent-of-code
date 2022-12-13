const fs = require("fs");
const rawInput = fs.readFileSync("./input11.txt").toString().split("\n");

class Monkey {
  constructor(startingItems, operation, divisorTest, trueMonkey, falseMonkey) {
    this.inspectedItems = 0;
    this.items = startingItems;
    this.operation = operation;
    this.divisorTest = divisorTest;
    this.getDestinationMonkey = (value) =>
      value % divisorTest ? falseMonkey : trueMonkey;
  }

  recieveItem(item) {
    this.items.push(item);
  }

  hasItemsToInspect() {
    return this.items.length ? true : false;
  }

  inspectItemAndGetDestinationMonkey() {
    this.inspectedItems++;
    let currentItem = this.items.splice(0, 1);
    currentItem = currentItem.map((item) => this.operation(item));
    // currentItem = Math.floor(currentItem[0] / 3); // part 1 only
    const destinationMonkey = this.getDestinationMonkey(currentItem[0]);
    return {
      item: currentItem % 9699690, // all monkey divisors multiplied together - remove for part 1
      destinationMonkey,
    };
  }
}
const input = [
  [0, new Monkey([66, 71, 94], (item) => item * 5, 3, 7, 4)],
  [1, new Monkey([70], (item) => item + 6, 17, 3, 0)],
  [2, new Monkey([62, 68, 56, 65, 94, 78], (item) => item + 5, 2, 3, 1)],
  [3, new Monkey([89, 94, 94, 67], (item) => item + 2, 19, 7, 0)],
  [4, new Monkey([71, 61, 73, 65, 98, 98, 63], (item) => item * 7, 11, 5, 6)],
  [5, new Monkey([55, 62, 68, 61, 60], (item) => item + 7, 5, 2, 1)],
  [
    6,
    new Monkey([93, 91, 69, 64, 72, 89, 50, 71], (item) => item + 1, 13, 5, 2),
  ],
  [7, new Monkey([76, 50], (item) => item * item, 7, 4, 6)],
];

const solution = () => {
  const monkeys = new Map(input);
  for (let round = 0; round < 10000; round++) {
    for (let i = 0; i < monkeys.size; i++) {
      const monkey = monkeys.get(i);
      while (monkey.hasItemsToInspect()) {
        const { item, destinationMonkey } = monkey.inspectItemAndGetDestinationMonkey();
        monkeys.get(destinationMonkey).recieveItem(item);
      }
    }
  }

  let results = [];
  for (const [id, monkey] of monkeys.entries()) {
    results.push(monkey.inspectedItems);
  }
  results.sort((a, b) => b - a);
  console.log(results[0] * results[1]);
};

solution() // part 2
