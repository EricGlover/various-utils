//11/24/17

//LINKED LIST IS DEPENDENT ON THIS NODE CLASS
class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
  print() {
    console.log(this.data);
  }
  getTheGoods() {
    return this.data;
  }
  //QUITE HANDY FOR PRINTING, CALLED WHEN YOU COERCE YOUR NODE TO A STRING TYPE
  //SHOUT OUT TO WILL TIMPSON FOR THIS
  toString() {
    return `${this.data.toString()}`;
  }
}

//NOTE: CONSIDER A USING THE PASS AN ITERATOR PATTERN
//TODO: ADD CYCLE DETECTION
//TODO: ADD MERGING TWO SORTED LISTS (why were they sorted?)

//NOTE: REMEMBER TO KEEP TRACK OF THE HEAD, TAIL, AND LENGTH WHEN MAKING ADDITIONS
class LinkedList {
  constructor(data, logging = false) {
    this.setHead(data);
    this.logging = logging;
    this.steps = 0;
  }
  setHead(data) {
    if (data && !this.head) {
      this.head = new Node(data, null);
      this.tail = this.head;
      this._length = 1;
      return true;
    } else {
      return false;
    }
  }

  //USED TO COUNT THE NUMBER OF OPERATIONS IN A VAGUE WAY
  //JUST FOR STATS, NON-ESSENTIAL
  stepsOfLastOperation() {
    return this.steps;
  }
  length() {
    return this._length;
  }
  forEach(fn) {
    let iter = this.listGen();
    let result = iter.next();
    let i = 0;
    while (!result.done) {
      fn(result.value.data, i);
      result = iter.next();
      i++;
    }
  }
  //find the node at an index
  //O(n)
  findI(index) {
    this.log("=============finding=============");
    let current = this.head;
    let position = 0;
    this.steps = 0;
    while (current && position !== index) {
      this.log(`${position}:`);
      this.log(current.data);
      current = current.next;
      position++;
      this.steps++;
    }
    if (position === index) {
      this.log("found it!");
      this.log(current.data);
      return current;
    } else {
      this.log("couldnt find it :(");
      return null;
    }
  }
  //TODO: write a generalized find nodes at indexes, consider using generators
  //NOTE: indexes are assumed to be in ascending order
  findIndexes(...indexes) {
    this.log("finding indexes : ", indexes);
    let iter = this.listGen();
    let nodes = [];
    let currentNode;
    let listIndex = 0;
    let indexToFind = 0;
    do {
      currentNode = iter.next();
      if (indexes[indexToFind] === listIndex) {
        nodes.push(currentNode.value);
        indexToFind++;
      }
      if (indexes.length === nodes.length) break;
      listIndex++;
    } while (!currentNode.done);
    if (indexes.length !== nodes.length) return false; //NOTE: reconsider this
    return nodes;
  }
  //O(n)
  //Search the list for a node that matches some descriptions
  //returns the node's data or false
  search(query) {
    let gen = this.listGen();
    let iter = gen.next();
    let currentNode;
    let foundMatch = false;
    const queryKeys = Object.keys(query);
    while (!iter.done) {
      currentNode = iter.value;
      foundMatch = queryKeys.every(key => {
        return query[key] === currentNode.data[key];
      });
      if (foundMatch) return currentNode.data;
      iter = gen.next();
    }
    return false;
  }
  //generator for walking through the list
  *listGen() {
    let current = this.head;
    while (current) {
      yield current;
      current = current.next;
    }
    return;
  }
  //crawling using a generator
  crawlGen() {
    this.log("=============Crawling using Generator=============");
    let iter = this.listGen();
    let result = iter.next();
    while (!result.done) {
      console.log(result.value.data);
      result = iter.next();
    }
  }
  //O(n)
  crawl() {
    this.log("=============crawling=============");
    let current = this.head;
    let length = 0;
    this.steps = 0;
    while (current) {
      console.log("" + current.data);
      current = current.next;
      length++;
      this.steps++;
    }
    this.log(`length = ${length}`);
  }
  //A method to allow you to coerce your linkedList to a String
  toString() {
    this.log("============= Stringifying =============");
    let current = this.head;
    let string = "";
    this.steps = 0;
    while (current) {
      string += " -> " + current;
      current = current.next;
      this.steps = 0;
    }
    return string;
  }
  //or specify an index to inset it at
  //Time: O(1) or O(n)
  insert(data, index = null) {
    this.log(`=============inserting=============`);
    this.steps = 0;
    let totalSteps = 0;
    if (this.setHead(data)) return; //if head is still null
    if (index === null || index === this._length) {
      const prevTail = this.tail;
      this.tail = new Node(data, null);
      prevTail.next = this.tail;
    } else {
      let [before, after] = this.findIndexes(index - 1, index);
      totalSteps += this.steps;
      let node = new Node(data, null);
      before.next = node;
      node.next = after;
    }
    this._length++;
    this.steps = totalSteps;
  }
  log(stuff) {
    if (this.logging) {
      console.log(stuff);
    }
  }
}
module.exports = { LinkedList };
