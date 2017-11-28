"use strict";
const assert = require("assert");
//n astronauts
//given a list of astronauts pairs (that are from the same country)
//find the number of ways to select a pair of astronauts from different
//countries for the space mission
//NOTE: they don't list all the logically true pairings

//input
//n p       //astronauts, number of pairs
//pairs

/////////////dependencies
const { AdjacencyList } = require("./mod/adj");
/////////////////

//find c, the number of countries
//for each c, find cA, the number of astornauts for country C
//Step 1
//make an adjacency list,
//add bidirectional edges for the astronaut pairings

const makeAdj = (edgeList, vertices) => {
  let g = new AdjacencyList(vertices);
  edgeList.forEach(edge => {
    g.addEdge(edge[0], edge[1], 1);
    g.addEdge(edge[1], edge[0], 1);
  });
  return g;
};

//Step 2
//make a list of astornauts without countries
//forEach astronaut
//Do BFS to find all connected astronauts
//remove connected astronauts from list (cA)
//plop total # of astronauts connected into cArr
//NOTE: if no connected astronauts are found do the same procedure
//repeat until list is empty

//the version of arrayOption that uses Sets
const connectCountries = graph => {
  let remaining = new Set([]);
  let cArr = [];
  for (let i = 0; i < graph.v; i++) {
    remaining.add(i);
  }
  remaining.forEach(astronaut => {
    let connected = graph.bfs(astronaut, (color, distance, predecessor) => {
      //returns all connected astronauts
      let connected = [];
      color.forEach((str, i) => {
        if (str === "black") connected.push(i);
      });
      return connected;
    });
    //remove connected astronauts from remaining
    connected.forEach(connection => remaining.delete(connection));
    //add them to the cArr;
    cArr.push(connected);
  });
  return cArr;
};
//here's what I could've done
const arrayOption = graph => {
  let found = Array(graph.v);
  let cArr = [];
  for (let i = 0; i < found.length; i++) {
    if (found[i]) continue;
    let connected = graph.bfs(i);
    //remove connected astronauts from remaining
    connected.forEach(vertex => (found[vertex] = true));
    //add them to the cArr;
    cArr.push(connected);
  }
  return cArr;
};

//Step 3
//do the combinatorial problem
//cArr, === [cA0, cA1, cA2... cAn]
const shortPairings = cArr => {
  let total = 0;
  if (cArr.length < 2) return total;
  for (let i = 0; i < cArr.length; i++) {
    for (let j = i + 1; j < cArr.length; j++) {
      total += cArr[i] * cArr[j];
    }
  }
  return total;
};
const pairings = (n, cArr) => {
  let pairs = 0;
  if (cArr.length < 2) return pairs;
  //find the sum, hint it's the number of astronauts
  let sum = n;
  for (let i = 0; i < cArr.length; i++) {
    sum -= cArr[i].length;
    pairs += sum * cArr[i].length;
  }
  return pairs;
};
/*
n!
-----
k! (n - k)!
*/
//sloppy
const factorial = n => {
  let fact = 1;
  for (let i = 2; i < n + 1; i++) {
    fact *= i;
  }
  return fact;
};
const choose2 = n => {
  // if (n < k) return 0;
  // if (k === n) return 1;
  // let answer = factorial(n) / (factorial(k) * factorial(n - k));
  // // assert.ok(Number.isFinite(answer)); //sometimes this throws errors
  // return answer;
  //the above can be simplified into this line
  return n * (n - 1) / 2;
};
const problemSolutionPairing = (n, cArr) => {
  let totalPairs = choose2(n, 2);
  let repeats = 0;
  // console.log(n, cArr);
  for (let i = 0; i < cArr.length; i++) {
    repeats += choose2(cArr[i].length, 2);
  }
  return totalPairs - repeats;
};

function processData(input) {
  const str = input.split("\n");
  const inputArr = str.map(line => {
    return line.split(" ").map(char => Number.parseInt(char));
  });
  let [[n, p], ...edges] = inputArr;
  //short cut
  if (p > 1) {
    let g = makeAdj(edges, n);
    let countries = arrayOption(g);
    console.log(problemSolutionPairing(n, countries));
  } else if (p === 1) {
    let countries = Array(n - 1).fill(1);
    countries[0] = 2;
    console.log(shortPairings(countries));
  } else if (p === 0) {
    let countries = Array(n).fill(1);
    console.log(shortPairings(countries));
  }
}
const t1 = `5 3
0 1
2 3
0 4`;
const t2 = `4 1
0 2`;
const t3 = `100000 2
1 2
3 4`;
const tests = () => {
  processData(t1); // //=> 5
  let start = new Date();
  processData(t2); //  //=> 6
  let finish = new Date();
  console.log(
    `that took ${(finish - start) / 1000 / 60} minutes: and ${(finish - start) /
      1000} seconds`
  );
  start = new Date();
  processData(t3);
  // //    //=> 4999949998
  // //was
  // ///that took 1.6144333333333334 minutes: and 96.866 seconds
  // //after checking to see if adList was null
  // //that took 0.18353333333333335 minutes: and 11.012 seconds
  //BEST TIME with sets
  //that took 0.00185 minutes: and 0.111 seconds
  //BEST TIME WITH ARRAYS
  //that took 0.0013 minutes: and 0.078 seconds
  //BEST TIME WITH ARRAYS WITHOUT THAT DAMN SLICE
  //that took 0.0010666666666666667 minutes: and 0.064 seconds
  finish = new Date();
  console.log(
    `that took ${(finish - start) / 1000 / 60} minutes: and ${(finish - start) /
      1000} seconds`
  );
};
tests();
// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// _input = "";
// process.stdin.on("data", function(input) {
//   _input += input;
// });
//
// process.stdin.on("end", function() {
//   processData(_input);
// });

// var a = [3, 2];
// console.log(test(a));
// console.log(pairings(a));

/* scrap code
//incorrect
const pairings = cArr => {
  return cArr.reduce((total, num) => total * num ** (cArr.length - 1), 1);
}
//seems to work
const pairings = cArr => {
  let total = 0;
  if (cArr.length < 2) return total;
  // return cArr.reduce((total, num) => total * num ** (cArr.length - 1), 1);
  for (let i = 0; i < cArr.length; i++) {
    for (let j = i + 1; j < cArr.length; j++) {
      total += cArr[i] * cArr[j];
    }
  }
};

const pairings = cArr => {
  let total = 0;
  for (let i = 0; i < cArr.length; i++) {
    for (let j = 0; j < cArr.length; j++) {
      if (i === j) continue;
      total += cArr[i] * cArr[j];
    }
  }
  return total / 2;
};

*/

/*
editorial
This problem can be thought of as a graph problem. The very first step is to compute how many different countries are there. For this, we apply Depth First Search to calculate how many different connected components are present in the graph where the vertices are represented by the people and the people from the same country form one connected component. After we get how many connected components are present, say M, we just need to calculate the number of ways of selecting two persons from two different connected component. Let us assume that component i contains Mi people. So, for the number of ways selecting two persons from different components, we subtract the number of ways of selecting two persons from the same component from the total numbers of ways of selecting two persons i.e.
Ways = N choose 2 - (∑(Mi Choose 2) for i = 1 to M)
*/
