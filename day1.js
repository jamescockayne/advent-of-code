var fs = require('fs');
var array = fs.readFileSync('input1.txt').toString().split("\n");
let highestSeen = 0;
let secondHighestSeen = 0;
let thirdHighestSeen = 0;

let currentCount = 0;

for(const calories of array) {
    if (!calories) {
        if (currentCount > thirdHighestSeen) {
            if (currentCount > secondHighestSeen) {
                if (currentCount > highestSeen) {
                    thirdHighestSeen = secondHighestSeen;
                    secondHighestSeen = highestSeen;
                    highestSeen = currentCount;
                } else {
                    thirdHighestSeen = secondHighestSeen;
                    secondHighestSeen = currentCount;
                }
            } else {
                thirdHighestSeen = currentCount;
            }
        }
        currentCount = 0;
    } else {
        currentCount += parseInt(calories);
    }
}

console.log(highestSeen + secondHighestSeen + thirdHighestSeen);

