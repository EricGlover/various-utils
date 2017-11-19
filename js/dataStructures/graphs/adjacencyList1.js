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
