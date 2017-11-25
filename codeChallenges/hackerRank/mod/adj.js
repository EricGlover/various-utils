//depends on LinkedList
//depends on Queue
const { Queue } = require("./queue");
const { LinkedList } = require("./linkedList");

//
class EdgeNode {
  constructor(from, to, weight) {
    this.to = to;
    this.from = from;
    this.weight = weight;
  }
}
class AdjacencyList {
  //adjList is 1 based ?
  constructor(v) {
    this.v = v;
    this.adList = new Array(v + 1);
    this.color = Array(this.v);
    this.distance = Array(this.v);
    this.predecessor = Array(this.v);
  }
  //populate edges one at a time
  addEdge(from, to, weight) {
    //if there isn't a linkedList setup there yet make one
    if (this.adList[from] === undefined) {
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
  bfs(s, fn) {
    //set all vertices to white (excluding s)
    //and init distance and predecessor arr
    // let color = Array(this.v).fill("white");
    // let distance = Array(this.v).fill(Infinity);
    // let predecessor = Array(this.v).fill(null);

    //TODO: generalize this
    if (this.adList[s] === undefined) {
      //no connections
      return [s];
    }
    this.color.fill("white");
    this.distance.fill(Infinity);
    this.predecessor.fill(null);
    let connected = [];

    //add s to vars
    this.color[s] = "gray";
    this.distance[s] = 0;
    this.predecessor[s] = null;
    //init queue
    const q = new Queue();
    q.enqueue(s);
    //start the search
    while (!q.empty()) {
      let u = q.peek();
      if (this.adList[u]) {
        this.adList[u].forEach(edge => {
          let v = edge.to;
          if (this.color[v] === "white") {
            this.distance[v] = this.distance[u] + edge.weight;
            this.color[v] = "gray";
            this.predecessor[v] = u;
            q.enqueue(v);
          }
        });
      }
      q.dequeue();
      this.color[u] = "black";
      connected.push(u);
    }
    return connected;
    // return fn(this.color, this.distance, this.predecessor);

    // console.log(color);
    // console.log(distance);
    // console.log(predecessor);
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
  //NOT IMPLEMENTED
  // forEachVertex(fn) {
  //   for (let i = 1; i <= this.v; i++) {
  //     fn(n);
  //   }
  // }
  printAdjList() {
    console.log("===========  PRINTING  ==============");
    console.log(`vertexes = ${this.v}`);
    this.adList.forEach((list, i) => {
      console.log(`i = ${i}, length = ${list ? list.length() : 0}`);
      list ? list.forEach(console.log) : null;
    });
    console.log("===========  END  ==============");
  }
}
module.exports = {
  EdgeNode,
  AdjacencyList
};
