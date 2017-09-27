//DATA NODE FOR TESTING
function DictionaryEntry(word, definition) {
  this.word = word;
  this.definition = definition;
}
DictionaryEntry.prototype.toString = function() {
  return `${this.word}: ${this.definition}`;
};

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
    this.head = new Node(data, null);
    this.tail = this.head;
    this.logging = logging;
    this._length = 1;
    this.steps = 0;
  }
  //USED TO COUNT THE NUMBER OF OPERATIONS IN A VAGUE WAY
  //JUST FOR STATS, NON-ESSENTIAL
  stepsOfLastOperation() {
    return this.steps;
  }
  length() {
    return this._length;
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
  findWord(word) {
    this.log("=============finding=============");
    const query = { word: word };
    const result = this.search(query);
    if (!result) {
      this.log("couldnt find it :(");
      return null;
    } else {
      this.log("found it!");
      this.log(result + "");
      return result;
    }
  }
  //O(n)
  //Search the list for a node that matches some descriptions
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
      if (foundMatch) return currentNode;
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
  //Time: O(n), swapping in place
  reverse() {
    this.log("=============reversing=============");
    this.steps = 0;
    //save next
    let next = this.head.next;
    //point head to null
    this.head.next = null;

    //since the current list walks forwards, we start with head
    let current = this.head;

    //switch the head and the tail
    let tmp = this.head;
    this.head = this.tail;
    this.tail = tmp;

    let previous = null;
    while (next) {
      //move forward
      previous = current;
      current = next;
      next = current.next;
      //point this node backward
      current.next = previous;
      this.steps++;
    }
  }
  //insert a node at the end by default
  //or specify an index to inset it at
  //Time: O(1) or O(n)
  insert(data, index = null) {
    this.log(`=============inserting=============`);
    this.steps = 0;
    let totalSteps = 0;
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
  //remove a node with specified data || with a specified index
  //we find the matching node an, node an-1, and node an+1
  //then set an-1.next = an+1
  //Time : O(n)
  removeNode(data, index) {
    let node;
    let before;
    let after;

    //if we're searching by index
    if (index) {
      //TODO: handle edge cases later
      [before, node, after] = this.findIndexes(index - 1, index, index + 1);
    } else if (data) {
      //if we're searching by data, use this search function so that we only loop through the list once
      //TODO: improve this non-sense
      let specialSearch = query => {
        let gen = this.listGen();
        let iter = gen.next();
        let currentNode;
        let previousNode;
        let foundMatch = false;
        const queryKeys = Object.keys(query);
        while (!iter.done) {
          currentNode = iter.value;
          foundMatch = queryKeys.every(key => {
            return query[key] === currentNode.data[key];
          });
          if (foundMatch) return [previousNode, currentNode, currentNode.next];
          previousNode = currentNode;
          iter = gen.next();
        }
        return false;
      };
      let result = specialSearch(data);
      if (result) {
        [before, node, after] = result;
      } else {
        return null; //NODE NOT FOUND
      }
    } else {
      return null;
    }
    //WE FOUND IT!
    //remove the found node from the linked list
    //SPECIAL CASES : 1.REMOVING THE HEAD WHEN LENGTH = 1
    if (this._length === 1 && node == this.head) {
      this.head = null;
      this.tail = null;
    } else if (node == this.head && this._length > 1) {
      //2.REMOVING THE HEAD WHEN LENGTH > 1
      this.head = after;
    } else if (node == this.tail && this._length > 1) {
      //3. REMOVING THE TAIL
      this.tail = before;
      before.next = null;
    } else {
      //REMOVING SOMETHING FROM THE MIDDLE
      before.next = after;
    }

    this._length--;
    return true;
  }
  //cleanest way I could think of for allowing a simple flag to turn off all console.logs
  //comment this.logs out later for max-speed
  log(stuff) {
    if (this.logging) {
      console.log(stuff);
    }
  }
}

//TODO: write an actual test spec
const testing = () => {
  const list = new LinkedList(
    new DictionaryEntry("cat", "meme generator"),
    true
  );
  // list.crawl();
  list.crawlGen();
  list.insert(new DictionaryEntry("dog", "frisbee finder"), null);
  list.insert(new DictionaryEntry("linked list", "The bees knees"), null);
  console.log("===============  Testing REMOVAL ===============");
  list.crawl();
  console.log("removing index 1 ", list.removeNode(null, 1));
  console.log(
    'removing entry with definition "meme generator"',
    list.removeNode({ definition: "meme generator" })
  );
  list.crawl();
  list.insert(new DictionaryEntry("dog", "frisbee finder"), 1);
  // list.findI(1);
  list.insert(new DictionaryEntry("hash table", "magic"), 1);
  list.crawl();
  list.crawlGen();
  // list.reverse();
  // list.crawl();
  // console.log(list.length());
  console.log("find word dog = ", list.findWord("dog"));
  console.log("=================  Finding Indexes Test  ==================");
  console.log("finding indexes 1, 2 ", list.findIndexes(1, 2));
  console.log("finding indexes 2, 3 ", list.findIndexes(2, 3));
  console.log("finding indexes 0 ", list.findIndexes(0));

  console.log("================= Search Test  ==================");
  console.log("searching for dog ", list.search({ word: "dog" }));
};
testing();
module.exports = LinkedList;
////
