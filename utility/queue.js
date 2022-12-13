module.exports = class Queue {
    constructor() {
        this.queue = [];
    }

    add(element) {
        return this.queue.push(element);
    }

    dequeue() {
        return this.queue.splice(0, 1)[0];
    }

    isEmpty() {
        return this.queue.length ? false : true;
    }
}