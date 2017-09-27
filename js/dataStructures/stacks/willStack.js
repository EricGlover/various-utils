class Stack {
  constructor() {
    this.stack = [];
    this.length = 0;
  }
  push(n) {
    this.stack[this.length] = n;
    this.length += 1;
  }
  pop() {
    if (!this.length) return null;
    this.length -= 1;
    return this.stack[this.length];
  }
  empty() {
    return !this.length;
  }
  peek() {
    return this.stack[this.length - 1];
  }
  getStack() {
    return this.stack.slice(0, this.length);
  }
  concat(arr) {
    for (let item of arr) {
      this.push(item);
    }
  }
}

module.exports = Stack;

let stack = new Stack();
stack.push(1);
stack.push(1);
stack.push(1);
stack.pop();
stack.pop();
stack.push(2);
console.log(stack.stack);
console.log(stack.getStack());
