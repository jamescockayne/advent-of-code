const fs = require('fs');
const rawInput = fs.readFileSync('./input15.txt').toString().split("\n");
const distances = new Map();
const coords = new Map();

const getCoordsFromLine = (line) => {
    const {2: sx, 3: sy, 8: bx, 9: by} = line.split(' ')
        .map(e => Number(
            e.split('')
            .map(char => ['=', ',', ':', 'x', 'y'].includes(char) ? '' : char)
            .join('')
        ));
    return {sx, sy, bx, by};
}

const getManhattenDistance = (x1, x2, y1, y2) => Math.abs(x1-x2) + Math.abs(y1-y2);

const init = (input) => {
    for (const line of input) {
        const {sx, sy, bx, by} = getCoordsFromLine(line);
        coords.set(line, {sx, sy, bx, by});
        const manhattenDistance = getManhattenDistance(sx, bx, sy, by);
        distances.set(line, manhattenDistance);
    }
}

const part1 = (row) => {
    const result = [];
    for (const line of rawInput) {
        const {sx, sy, bx, by} = coords.get(line);
        const manhattenDistance = distances.get(line);
        if (
            !(sy <= row && row <= sy + manhattenDistance) &&
            !(sy >= row && row >= sy - manhattenDistance)
        ) {
            continue;
        }

        const yComponent = Math.abs(sy - row);
        const xComponent = manhattenDistance - yComponent;

        for (let i=sx-xComponent; i<=sx+xComponent; i++) {
            result[i] = '#';
        }
        if (by === row) {
            result[bx] = 'B';
        }
    }
    return Object.values(result).filter(e => e === '#').length;
}



const part2 = () => {
    for (let row=0; row<=4000000; row++) {
        const lineResult = [];

        for (const line of rawInput) {
            const {sx, sy} = coords.get(line);
            const distance = distances.get(line);
            if (
                !(sy <= row && row <= sy + distance) &&
                !(sy >= row && row >= sy - distance)
            ) {
                continue; // the sensor is too far away to affect this row
            }

            const yComponent = Math.abs(sy - row);
            const xComponent = distance - yComponent; // pythagorus weeps

            // we don't care about points within the manhatten distance to the sensor that are outside the range 0-4000000
            const lowerBound = Math.max(sx-xComponent, 0);
            const upperBound = Math.min(sx+xComponent, 4000000);

            lineResult.push([lowerBound, upperBound]);
        }

        // at this point we have a list of ranges that are not the answer, e.g [[0-100], [98-400], [250, 1000]]
        // if this list cannot be reduced to a single range [0-4000000] then we have the answer
        lineResult.sort((a,b) => a[0] - b[0]);

        for (let i=0; i<lineResult.length-1; i++) {
            const [start1, end1] = lineResult[i];
            const [start2, end2] = lineResult[i+1];
            if (end1 >= start2) { // the two ranges overlap, reduce to one range
                lineResult[i+1] = [start1, Math.max(end2, end1)];
            } else { // the two ranges don't overlap - we have the answer
                process.stdout.write('\n');
                return (end1 + 1) * 4000000 + row;
            }
        }
        if (row % 400000 === 0) { // progress ticker
            process.stdout.write("\r\x1b[K");
            process.stdout.write(`${Math.floor(row/4000000*100)}%`);
        }
    }
}

init(rawInput);
console.log(part1(2000000));
console.log(part2());