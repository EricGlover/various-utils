///used this for something
//don't remember who wrote it
//need to look it over at some point

class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor(headNode = null, printNode) {
    this.headNode = headNode;
    this.tailNode = headNode;
    this.length = this.headNode ? 1 : 0;
    this.printNode = printNode;
  }

  addFirstNode(data) {
    this.headNode = new Node(data, null);
    this.tailNode = this.headNode;
  }

  // Add a node to the end of the list
  addNode(data) {
    if (!this.tailNode) {
      this.addFirstNode(data);
    } else {
      const edgeList = require("./edgeList");
      const node = new Node(data, null);
      this.tailNode.next = node;
      this.tailNode = node;
    }
    this.length++;
  }

  removeNode(index) {
    // Case 1: HEAD IS NULL
    if (!this.headNode) return;

    let counter = 0;
    let currentNode = this.headNode;
    let prevNode = null;

    // Case 2: HEAD IS NOT NULL, BUT DELETING FIRST NODE
    if (!index) {
      this.headNode = this.headNode.next;
      // Case 2B: ONLY 1 NODE IN LINKED LIST
      if (!this.headNode) this.tailNode = this.headNode;
      currentNode.next = null;
      this.length--;
      return;
    }

    // Crawl until we hit index
    while (counter < index && currentNode) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      ++counter;
    }
    if (!currentNode) return;

    // Now remove the node
    let nextNode = currentNode.next;

    // Clear the `next` reference
    currentNode.next = null;

    // Make the previous one point correctly
    prevNode.next = nextNode;
    this.length--;
  }

  // Return the node at that position, like in an aNrray
  // It has no error handling
  findNode(index) {
    // Start at the head
    let counter = 0;
    let currentNode = this.headNode;

    // Crawl until we hit index
    while (counter < index) {
      currentNode = currentNode.next;
      if (!currentNode) return null;
      ++counter;
    }
    //BigO = O(index)
    return currentNode;
  }

  search(query) {
    let currentNode = this.headNode;
    let count = 1;

    // DON'T MAKE CIRCULAR LINKED LISTS!!!
    while (true) {
      if (!currentNode) return { count, node: null };
      const data = currentNode.data;
      const matches = Object.keys(query).every(key => {
        return query[key] === data[key];
      });
      if (matches) return { count, node: currentNode };
      currentNode = currentNode.next;
      count++;
    }
  }

  weightSearch() {
    let currentNode = this.headNode;
    let sumWeight = 0;

    // DON'T MAKE CIRCULAR LINKED LISTS!!!
    while (true) {
      if (!currentNode) return sumWeight;
      sumWeight += currentNode.data.weight;
      currentNode = currentNode.next;
    }
  }

  // Crawls and prints the list
  printList() {
    // Start at the head
    let currentNode = this.headNode;

    while (currentNode) {
      this.printNode(currentNode);
      if (currentNode.next) {
        process.stdout.write(" \t=>\t");
      }
      currentNode = currentNode.next;
    }
    process.stdout.write("\n");
  }

  readNode(index) {
    this.printNode(this.findNode(index));
    console.log();
  }

  insertNode(index, data) {
    if (index === 0) {
      let node = new Node(data, this.headNode);
      this.headNode = node;
      return;
    }
    let prevNode = this.findNode(index - 1);
    let node = new Node(data, this.findNode(index));
    prevNode.next = node;
    this.length++;
  }

  reverse() {
    let current = this.headNode;
    let next = current.next;
    let prev;
    while (current.next) {
      prev = current;
      current = next;
      next = current.next;
      if (!next) break;
      current.next = prev;
    }
    current.next = prev;
    this.headNode.next = null;
    let oldHead = this.headNode;
    this.headNode = this.tailNode;
    this.tailNode = oldHead;
  }
}

module.exports = LinkedList;
