const fs = require('fs');
const forest = fs.readFileSync('./input8.txt').toString().split("\n").map(line => line.split('').map(Number));
const visible = [];

const markAsVisible = (row, col) => {
    visible[row] = visible[row] || [];
    visible[row][col] = 1;
}

const markAsNotVisible = (row, col) => {
    if (visible[row][col] === 1) {
        return;
    }
    visible[row][col] = 0;
}


const getScoreLeft = (rowIndex, treeIndex) => {
    const row = forest[rowIndex];
    let view = 0;
    for (let i=treeIndex; i>0; i--) {
        if (row[i-1] >= row[treeIndex]) {
            view++;
            return view;
        } {
            view++
        }
    }
    return view;
}

const getScoreRight = (rowIndex, treeIndex) => {
    const row = forest[rowIndex];
    let view = 0;
    for (let i=treeIndex; i<row.length-1; i++) {
        if (row[i+1] >= row[treeIndex]) {
            view++;
            return view;
        } {
            view++
        }
    }
    return view;
}

const getScoreDown = (rowIndex, treeIndex) => {
    const columnAsRow = []
    for (let i=0; i<forest.length; i++) {
        columnAsRow.push(forest[i][treeIndex])
    }
    let view = 0;
    for (let i=rowIndex; i<columnAsRow.length-1; i++) {
        if (columnAsRow[i+1] >= columnAsRow[rowIndex]) {
            view++;
            return view;
        } {
            view++
        }
    }
    return view;
}

const getScoreUp = (rowIndex, treeIndex) => {
    const columnAsRow = []
    for (let i=0; i<forest.length; i++) {
        columnAsRow.push(forest[i][treeIndex])
    }
    let view = 0;
    for (let i=rowIndex; i>0; i--) {
        if (columnAsRow[i-1] >= columnAsRow[rowIndex]) {
            view++;
            return view;
        } {
            view++
        }
    }
    return view;
}

const part1 = () => {
    for (let row=0; row<forest.length; row++) {
        {
            // from the left
            let highestSeen = -1;
            for (let tree=0; tree<forest[row].length; tree++) {
                if (forest[row][tree] > highestSeen) {
                    highestSeen = forest[row][tree];
                    markAsVisible(row, tree);
                } else {
                    markAsNotVisible(row, tree);
                }
            }
        }
        {
            // from the right
            let highestSeen = -1;
            for (let tree=forest[row].length-1; tree>=0; tree--) {
                if (forest[row][tree] > highestSeen) {
                    highestSeen = forest[row][tree];
                    markAsVisible(row, tree);
                } else {
                    markAsNotVisible(row, tree);
                }
            }
        }
    }

    for (let col=0; col<forest[0].length; col++) {
        {
            // from the top
            let highestSeen = -1;
            for (let tree=0; tree<forest.length; tree++) {
                if (forest[tree][col] > highestSeen) {
                    highestSeen = forest[tree][col];
                    markAsVisible(tree, col);
                } else {
                    markAsNotVisible(tree, col);
                } 
            }
        }
        {
            // from the bottom
            let highestSeen = -1;
            for (let tree=forest.length-1; tree>=0; tree--) {
                if (forest[tree][col] > highestSeen) {
                    highestSeen = forest[tree][col];
                    markAsVisible(tree, col);
                } else {
                    markAsNotVisible(tree, col);
                } 
            }
        }
    }

    const result = visible.flat().reduce((prev, curr) => prev + curr, 0);
    return result;
}



const part2 = () => {
    const scores = [];
    const setScore = ([row, col], score) => {
        scores[row] = scores[row] || [];
        scores[row][col] = score;
    }

    for (let row=0; row<forest.length; row++) {
        for (let tree=0; tree<forest[row].length; tree++) {
            const score = getScoreLeft(row, tree) * getScoreRight(row, tree) * getScoreUp(row, tree) * getScoreDown(row, tree);
            setScore([row, tree], score)
        }
    }

    return scores.flat().reduce((prev, curr) => prev <= curr ? curr : prev, 0)
}

console.log(part1());
console.log(part2());