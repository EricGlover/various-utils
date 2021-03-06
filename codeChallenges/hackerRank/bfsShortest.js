const util = require("util");
var input = `2
4 2
1 2
1 3
1
3 1
2 3
2`;

// process.stdin.resume();

process.stdin.setEncoding("ascii");

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

// process.stdin.on("data", function(data) {
//   input_stdin += data;
// });
//
// process.stdin.on("end", function() {
//   input_stdin_array = input_stdin.split("\n");
//   main();
// });

function readLine() {
  return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////
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

//the class we set our Node's data to
// class AdjacencyNode {
//   constructor(from, to, weight) {
//     this.to = to;
//     this.from = from;
//     this.weight = weight;
//   }
// }
class EdgeNode {
  constructor(from, to, weight) {
    this.to = to;
    this.from = from;
    this.weight = weight;
  }
}

class AdjacencyList {
  constructor(v) {
    this.v = v;
    this.adList = new Array(v + 1).fill(null);
  }
  //populate edges one at a time
  addEdge(from, to, weight) {
    //if there isn't a linkedList setup there yet make one
    if (!this.adList[from]) {
      this.adList[from] = new LinkedList();
    }
    this.adList[from].insert(new EdgeNode(from, to, weight), null);
  }

  //find the edge weight given the vertices
  edgeWeight(from, to) {
    const fromList = this.adList[from];
    const { node } = fromList.search({ to: to });
    return node.data.weight;
  }
  //check if two vertices are reachable
  //this function uses a sub-optimal algorithm btw...
  isReachable(from, to, visited = []) {
    //if there is no from return false
    if (this.v < from || from < 0) return false;
    //if from has no out edges return false
    if (!this.adList[from]) return false;

    //init visited
    visited = visited.slice(0);
    visited.push(from);
    //base case #1 : from and to are the same
    if (from === to) return true;
    //base case #2 : from and to are adjacent
    if (this.adList[from].search({ to: to })) {
      return true;
    }
    let recursions = []; //clean this up later
    //there are no places to go that haven't been visited
    this.adList[from].forEach(edge => {
      //for each adjacent vertices call is reachable
      if (visited.includes(edge.to)) {
        //do nothing
      } else {
        recursions.push(this.isReachable(edge.to, to, visited));
      }
    });
    if (recursions.includes(true)) return true;
    return false;
  }
  bfs(s) {
    //set all vertices to white (excluding s)
    //and init distance and predecessor arr
    let color = Array(this.v + 1).fill("white");
    let distance = Array(this.v + 1).fill(Infinity);
    let predecessor = Array(this.v + 1).fill(null);

    //add s to vars
    color[s] = "gray";
    distance[s] = 0;
    predecessor[s] = null;
    //init queue
    const q = new Queue();
    q.enqueue(s);
    //start the search
    while (!q.empty()) {
      let u = q.peek();
      if (this.adList[u]) {
        this.adList[u].forEach(edge => {
          let v = edge.to;
          if (color[v] === "white") {
            distance[v] = distance[u] + edge.weight;
            color[v] = "gray";
            predecessor[v] = u;
            q.enqueue(v);
          }
        });
      }
      q.dequeue();
      color[u] = "black";
    }
    //stuff for this particular problem
    return distance.reduce((str, el, i) => {
      if (i === s) return str;
      if (i === 0) return str;
      if (!Number.isFinite(el)) return str + "-1 ";
      return str + el + " ";
    }, "");
  }
  shortestPath(from, to) {
    let path = this.recursePath(from, to);
    // console.log(path);
    if (path && path.length) {
      return path.reduce((total, edge) => total + edge.weight, 0);
    }
    return -1;
  }
  //bfs search for the shortestPath
  //returns the edges traveled
  recursePath(from, to, visited = [], path = []) {
    //if there is no from return false
    if (this.v < from || from < 0) return false;
    //if from has no out edges return false
    if (!this.adList[from]) return false;

    //init visited
    visited = visited.slice(0);
    visited.push(from);

    //init path
    path = path.slice(0);

    //base case #1 : from and to are the same
    if (from === to) return path;
    //base case #2 : from and to are adjacent
    let adjacentNode = this.adList[from].search({ to: to });
    if (adjacentNode) {
      let newPath = path.slice(0);
      newPath.push(adjacentNode);
      return newPath;
    }
    let recursions = []; //clean this up later
    //there are no places to go that haven't been visited
    this.adList[from].forEach(edge => {
      //base case #2 : from and to are adjacent
      // if (edge.to === to) {
      //   //add this edge
      //   let newPath = path.slice(0);
      //   newPath.push(edge);
      //   recursions.push(newPath);
      // }
      //for each adjacent vertices call is recursePath
      if (visited.includes(edge.to)) {
        //do nothing, we've been there before
      } else {
        //add this edge
        let newPath = path.slice(0);
        newPath.push(edge);
        recursions.push(this.recursePath(edge.to, to, visited, newPath));
      }
    });
    //filter out paths that didn't work
    recursions = recursions.filter(trip => trip);

    if (recursions.length) {
      //there is at least one path
      //find the shortest path
      let min = recursions[0].reduce((total, edge) => total + edge.weight, 0);

      recursions = recursions.reduce((shortest, trip, i) => {
        let tripTotal = trip.reduce((total, edge) => total + edge.weight, 0);
        // console.log(`tripTotal = ${tripTotal}`);
        if (tripTotal < min) {
          min = tripTotal;
          return trip;
        }
        return shortest;
      });
      //add a virtual edge
      this.addEdge(from, to, min);
      return recursions;
    }
    return false;
  }
  forEachVertex(fn) {
    for (let i = 1; i <= this.v; i++) {
      fn(n);
    }
  }
  printAdjList() {
    console.log("===========  PRINTING  ==============");
    this.adList.forEach((list, i) => {
      console.log(`i = ${i}, length = ${list ? list.length() : 0}`);
      list ? list.forEach(console.log) : null;
    });
    console.log("===========  END  ==============");
  }
}
const test = () => {
  let g = new AdjacencyList(4);
  g.addEdge(1, 2, 10);
  g.addEdge(2, 1, 10);
  g.addEdge(1, 3, 10);
  g.addEdge(3, 1, 10);
  g.addEdge(3, 4, 10);
  // g.addEdge(1, 4, 10);
  // g.printAdjList();
  //testing search
  // console.log(g.adList[1].search({ to: 2 }));
  // console.log(g.adList[1].search({ to: 4 }));
  //testing isReachable
  // console.log(g.isReachable(1, 2));
  // console.log(g.isReachable(3, 1));
  // console.log(g.isReachable(1, 4));
  //testing shortestPath
  // console.log(g.shortestPath(1, 2));
  // console.log(g.shortestPath(3, 1));
  // console.log(g.shortestPath(1, 4));

  //new test
  console.log("NEW TEST ");
  g = new AdjacencyList(5);
  // 1 <-> 2
  g.addEdge(1, 2, 10);
  g.addEdge(2, 1, 10);
  // 1 <-> 3
  g.addEdge(1, 3, 10);
  g.addEdge(3, 1, 10);
  // 3 <-> 4
  g.addEdge(3, 4, 10);
  g.addEdge(4, 3, 10);
  // 2 <-> 5
  g.addEdge(2, 5, 10);
  g.addEdge(5, 2, 10);
  // 5 <-> 4
  g.addEdge(5, 4, 10);
  g.addEdge(4, 5, 10);
  // console.log(g.shortestPath(1, 4));
  console.log(g.bfs(1));
};
test();

function main() {
  input_stdin = input;
  input_stdin_array = input_stdin.split("\n");
  var q = parseInt(readLine());
  const weight = 6;
  for (var a0 = 0; a0 < q; a0++) {
    var n_temp = readLine().split(" ");
    var n = parseInt(n_temp[0]);
    var m = parseInt(n_temp[1]);
    //make a graph
    let g = new AdjacencyList(n);
    for (var a1 = 0; a1 < m; a1++) {
      var u_temp = readLine().split(" ");
      var u = parseInt(u_temp[0]);
      var v = parseInt(u_temp[1]);
      g.addEdge(u, v, weight);
      g.addEdge(v, u, weight);
    }
    // g.printAdjList();
    var s = parseInt(readLine());
    //find stuff
    // console.log(util.inspect(g));

    // let answers = [];
    // for (let i = 1; i <= n; i++) {
    //   if (i === s) continue;
    //   let answer = g.shortestPath(s, i, [], []);
    //   answers.push(answer);
    // }
    // console.log(answers.join(" "));

    //////
    // g.forEachVertex(v => {
    //   if (v === s) return;
    //   let answer = g.shortestPath(s, v, [], []);
    //   console.log(answer);
    // });
    // g.mapOverVert(v => {
    //
    // })
  }
}
main();
//insert edges
