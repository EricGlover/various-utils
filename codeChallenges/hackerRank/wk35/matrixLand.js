//greedy approach
//for each row find the maximum subsequence

//robust graph solution

//try breadth first search using adjacency list
/*
4 5
1 2 3 -1 -2
-5 -8 -1 2 -150
1 2 3 -250 100
1 1 1 1 20
*/

//n = 4, m = 5, n = height, m = width
//2d matrix

//attempting to just use the 2d matrix
//matrix is 2d arr of Nums
const matrixLand = matrix => {};

//take the matrix and convert it into a graph

/* DEPENDENCIES LINKED LIST, NODE, ADJACENY NODE, AND ADJACENCY LIST */

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

class AdjacencyNode {
  constructor(to, weight) {
    this.to = to;
    this.weight = weight;
  }
}

class AdjacencyList {
  constructor(edgeList, numOfVertices) {
    this.name = [];
    this.adList = new Array(numOfVertices).fill(null);
    this.addEdges(edgeList);
  }

  //populate the array with linkedLists, and add our edges to those lists
  //dependent on a certain structure to the edges
  addPeopleArray(edgeList) {
    edgeList.forEach(edge => {
      //if from is not in adList
      if (!this.adList[edge[0].id]) {
        this.adList[edge[0].id] = new LinkedList();
      }
      this.adList[edge[0].id].addNode(new AdjacencyNode(edge[1], edge[2]));
    });
  }

  //find the edge weight given the vertices
  edgeWeight(from, to) {
    const fromList = this.adList[from];
    const { node } = fromList.search({ to: to }); ///????
    return node.data.weight;
  }
  printAdjList() {
    this.name.forEach(name => {
      console.log(`from: ${name}\t`);
    });
  }
  //print out some stats about the Adjacency List
  showStats() {
    //total number of vertices and edges
    console.log(`number of vertices ${this.adList.length}`);
    const edges = this.adList.reduce(
      (sum, list) => (list ? sum + list.length : sum),
      0
    );
    console.log(`number of edges ${edges}`);
    //most connected
    const degrees = this.adList.map((list, index) => {
      return {
        name: this.name[index],
        degree: list ? list.length : 0
      };
    });
    let sorted = degrees.sort((a, b) => b.degree - a.degree);
    console.log(
      `Top three most connected ${sorted[0].name}(${sorted[0]
        .degree}), ${sorted[1].name}(${sorted[1].degree}), ${sorted[2]
        .name}(${sorted[2].degree})`
    );

    //strongest 3 connections
    const weights = this.adList.map(
      (linkedList, index) =>
        linkedList
          ? { weight: linkedList.weightSearch(), name: this.name[index] }
          : { weight: 0, name: this.name[index] }
    );
    sorted = weights.sort((a, b) => b.weight - a.weight);
    console.log(
      `Top three most heavily weighted weights ${sorted[0].name}(${sorted[0]
        .weight}), ${sorted[1].name}(${sorted[1].weight}), ${sorted[2]
        .name}(${sorted[2].weight})`
    );
  }
}
