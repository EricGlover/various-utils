class Queue {
  constructor() {
    this.queue = [];
    this.head = -1;
    this.tail = -1;
    this.length = 0;
  }
  enqueue(n) {
    this.tail++;
    this.length++;
    this.queue[this.tail] = n;
  }
  dequeue() {
    if (this.head < this.tail) {
      this.head++;
      this.length--;
      return this.queue[this.head];
    }
  }
  empty() {
    return this.head === this.tail;
  }
  peek() {
    return this.queue[this.head + 1];
  }
  concat(arr) {
    for (let item of arr) {
      this.enqueue(item);
    }
  }
}

module.exports = Queue;
