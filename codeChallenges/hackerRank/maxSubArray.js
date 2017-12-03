const util = require("util");
//find the max subsequence and the max subarray
const maxSubsequence = arr =>
  arr.reduce((total, el) => (el > 0 ? total + el : total));

const a = [1, 2, 3, 4];
const b = [2, -1, 2, 3, 4, -5];
const solve = arr => {
  console.log(util.inspect(arr));
  // let maxSeq = arr.slice(0).map(row => new Array(arr.length))
  let maxSub = arr.slice(0).map(row => new Array(arr.length).fill(0));
  console.log(util.inspect(maxSub));
  // maxSeq.forEach((row, i) => row[0] = arr[i]);
  maxSub.forEach((row, i) => (row[0] = arr[i]));
  console.log(util.inspect(maxSub));
  console.log("starting loop");
  for (let l = 1; l < arr.length + 1; l++) {
    //the sums
    for (let i = 0; i < arr.length - l; i++) {
      //the next number + the last sum
      // maxSub[i][l - 1] = arr[i + 1] + maxSub[i][l - 2];
      maxSub[i][l - 1] = arr[i + 1];
    }
    console.log(util.inspect(maxSub));
  }
  //find max
  console.log(util.inspect(maxSub));
};

// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// var input = "";
// process.stdin.on("data", function(chunk) {
//   input += chunk;
// });
// process.stdin.on("end", function() {
//   input = input.split("\n");
//   let t = input[0];
//   for (let i = 0; i < t; i++) {
//     let n = input[1 + i];
//     let arr = input[2 + i];
//     arr = arr.map(str => parseInt(str));
//     solve(arr);
//   }
// });
var input = `2
4
1 2 3 4
6
2 -1 2 3 4 -5`;

const test = () => {
  input = input.split("\n");
  console.log(input);
  let t = input[0];
  for (let i = 0; i < 1; i++) {
    let n = input[1 + i];
    let arr = input[2 + i];
    arr = arr.split(" ").map(str => parseInt(str));
    solve(arr);
  }
};
test();
