const Stack = require('../utility/stack.js')
const fs = require('fs');
const rawInput = fs.readFileSync('./input7.txt').toString().split("\n");

class File {
    constructor(name, size, children) {
        this.name = name;
        this.size = size;
        this.children = children; 
    }
}

const stack = new Stack();
const getFileSystemFromInput = (input) => {
    for (const line of input) {
        if (line.startsWith('$')) {
            const {1: command, 2: name} = line.split(' ');
            if (command === 'cd') {
                if (name === '..') {
                    const file = stack.pop();
                    stack.peek().size += file.size;
                } else {
                    stack.push(stack.isEmpty() ? new File(name, 0, []) : stack.peek().children.find(child => child.name === name));
                }
            }
        } else {
            let newFile;
            if (line.startsWith(('dir'))) {
                const {1: name} = line.split(' ');
                newFile = new File(name, 0, []);
            } else {
                const [size, name] = line.split(' ');
                newFile = new File(name, Number(size), []);
            }
            stack.peek().children.push(newFile);
            stack.peek().size += newFile.size;
        }
    }
    while (stack.length > 1) {
        const file = stack.pop();
        stack.peek().size += file.size;
    }
    return stack.pop();
}

const getChildrenThatAreLessThen = (file, size) => {
    const children = file.children.filter(child => child.size < size && child.children.length !== 0);
    for (const child of file.children) {
        children.push(...getChildrenThatAreLessThen(child, size));
    }
    return children;
}

const getChildrenThatAreGreaterThen = (file, size) => {
    const children = file.children.filter(child => child.size >= size && child.children.length !== 0);
    for (const child of file.children) {
        children.push(...getChildrenThatAreGreaterThen(child, size));
    }
    return children;
}

const part1 = (fileSystem) => {    
    return getChildrenThatAreLessThen(fileSystem, 100000).reduce((acc, cur) => acc + cur.size, 0);
}

const part2 = () => {
    const spaceNeeded = 30000000;
    const currentlyFree = 70000000 - fileSystem.size;
    const spaceToFree = spaceNeeded - currentlyFree;
    
    const options = getChildrenThatAreGreaterThen(fileSystem, spaceToFree);
    
    let smallestSeen = Infinity;
    for (const option of options) {
       smallestSeen = smallestSeen < option.size ? smallestSeen : option.size; 
    }

    return smallestSeen;
}

const fileSystem = getFileSystemFromInput(rawInput);
console.log(part1(fileSystem));
console.log(part2(fileSystem));