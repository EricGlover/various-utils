/*
KnightL problem
*/
//given an n x n chessboard
//find the minimum number of moves
//for a knight to go from (0,0) to (n - 1, n - 1) (assuming board is 0 based)

//knightL(a, b) indicates

//NOTE: OUTPUT is symmetric
//write something to fill half the matrix and then
//reflect it over the (0,0) -> (n - 1, n - 1) line

//after considering it, it seems the best representation of the graph,
//is no data structure
//just compute the reachable squares each time
//otherwise you have to restructure the data structure representing
//the edges n * n times
//
// process.stdin.resume();
// process.stdin.setEncoding('ascii');
//
// var input_stdin = "";
// var input_stdin_array = "";
// var input_currentline = 0;
//
// process.stdin.on('data', function (data) {
//     input_stdin += data;
// });
//
// process.stdin.on('end', function () {
//     input_stdin_array = input_stdin.split("\n");
//     main();
// });
//
// function readLine() {
//     return input_stdin_array[input_currentline++];
// }

/////////////// ignore above this line ////////////////////

function Queue() {
  this.queue = [];
  this.head = -1;
  this.tail = -1;
  this.length = 0;
}
Queue.prototype = {
  enqueue(num) {
    this.tail++;
    this.length++;
    this.queue.push(num);
  },
  dequeue() {
    if (this.head < this.tail) {
      this.head++;
      this.length--;
      return this.queue[this.head];
    }
  },
  isEmpty() {
    if (this.length > 0) return false;
    return true;
  }
};

function Tile(x, y, distance = Infinity, color = "white") {
  this.distance = distance;
  this.color = color;
  this.x = x;
  this.y = y;
}
const util = require("util");
//reachable and not visited
const adjacent = (board, from, a, b) => {
  const moves = [
    [a, b],
    [-a, b],
    [a, -b],
    [-a, -b],
    [b, a],
    [-b, a],
    [b, -a],
    [-b, -a]
  ];
  let adjTiles = [];
  moves.forEach(move => {
    let tile =
      board[move[0] + from.x] && board[move[0] + from.x][move[1] + from.y];
    if (tile && tile.color === "white") {
      adjTiles.push(tile);
    }
  });
  return adjTiles;
};
const bfs = (board, a = 1, b = 2, start, end) => {
  //setup for bfs
  board[0][0].color = "grey";
  board[0][0].distance = 0;
  let q = new Queue();
  q.enqueue(board[start[0]][start[1]]);
  while (!q.isEmpty()) {
    let u = q.dequeue();
    if (u.x === end[0] && u.y === end[1]) return u;
    //find reachable tiles from u
    //that haven't been found
    let adjacentTiles = adjacent(board, u, a, b);
    // for (let i = 0; i < adjacentTiles.length; i++) {
    //   adjacentTiles[i].distance = u.distance + 1;
    //   adjacentTiles[i].color = "grey";
    // }
    adjacentTiles.forEach(tile => {
      tile.distance = u.distance + 1;
      tile.color = "grey";
      q.enqueue(tile);
    });
    u.color = "black";
  }
  return undefined;
};
const resetBoard = board => {
  board.forEach(row =>
    row.forEach(tile => {
      tile.color = "white";
      tile.distance = Infinity;
    })
  );
};
function main() {
  // var n = parseInt(readLine());
  var n = 25;
  let start = [0, 0];
  let finish = [n - 1, n - 1];
  //the board contains all the info we need for bfs
  let board = new Array(n);

  for (let i = 0; i < n; i++) {
    board[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      board[i][j] = new Tile(i, j);
    }
  }
  let answers = new Array(n - 1)
    .fill(true)
    .map(el => new Array(n - 1).fill(-1));
  // console.log(util.inspect(board));
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      let found = bfs(board, i + 1, j + 1, start, finish);
      if (!found) answers[i][j] = -1;
      answers[i][j] = found ? found.distance : -1;
      resetBoard(board);
    }
  }
  console.log(answers.map(row => row.join(" ")).join("\n"));
}
main();
///

///

///

///
