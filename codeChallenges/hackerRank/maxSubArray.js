const util = require("util");
const Timer = require("../../js/handySnippets/timer");
// //find the max subsequence and the max subarray
// const maxSubsequence = arr =>
//   arr.reduce((total, el) => (el > 0 ? total + el : total));
//
// const a = [1, 2, 3, 4];
// const b = [2, -1, 2, 3, 4, -5];
// const solve = arr => {
//   console.log(util.inspect(arr));
//   // let maxSeq = arr.slice(0).map(row => new Array(arr.length))
//   let maxSub = arr.slice(0).map(row => new Array(arr.length).fill(0));
//   console.log(util.inspect(maxSub));
//   // maxSeq.forEach((row, i) => row[0] = arr[i]);
//   maxSub.forEach((row, i) => (row[0] = arr[i]));
//   console.log(util.inspect(maxSub));
//   console.log("starting loop");
//   for (let l = 1; l < arr.length + 1; l++) {
//     //the sums
//     for (let i = 0; i < arr.length - l; i++) {
//       //the next number + the last sum
//       // maxSub[i][l - 1] = arr[i + 1] + maxSub[i][l - 2];
//       maxSub[i][l - 1] = arr[i + 1];
//     }
//     console.log(util.inspect(maxSub));
//   }
//   //find max
//   console.log(util.inspect(maxSub));
// };

/*
brute force
it works but it's stank nasty
*/
const brute = arr => {
  //manually check every subarray
  let subSums = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      let sub = arr.slice(i, j + 1);
      let sum = sub.reduce((total, num) => total + num, 0);
      subSums.push(sum);
    }
  }
  subSums.sort((a, b) => b - a);
  let subArrSum = subSums[0];
  //for the max add all the pos nums
  //if there are any positives, else find min negative
  let subSeqSum = arr.reduce((total, num) => {
    //if total is negative, take greater
    if (total < 0) {
      return Math.max(total, num);
    } else {
      //add 0 or a positive number
      return total + Math.max(0, num);
    }
  });
  return [subArrSum, subSeqSum];
};
/*
top down approach
*/
// const dp = (arr, i, j, )
/*
bottom up approach
attempt 1 yields an algo that requires too much space
*/
// const dp = (arr, subArr, subSeq) => {
//   //if this is first call then init subArr and subSeq
//   if (!subArr) {
//     subArr = Array(arr.length + 1).fill(0);
//     for (let k = 0; k < subArr.length; k++) {
//       subArr[k] = Array(arr.length);
//     }
//   }
//   //best = [sum, i, j]
//   let best = [arr[0], 0, 0];
//   //subArr structure [length][starting at i] = sum
//   //subSeq structure [length][starting at i] = best sum
//   //length 1
//   for (let i = 0; i < arr.length; i++) {
//     subArr[1][i] = arr[i];
//     if (arr[i] > best[0]) {
//       best = [arr[i], i, i];
//     }
//     // subSeq[0][i] = arr[i];
//   }
//   //lengths
//   for (let l = 2; l <= arr.length; l++) {
//     for (let i = 0; i <= arr.length - l; i++) {
//       //compute subArr sum
//       let prevSum = subArr[l - 1][i];
//       let nextNum = arr[l - 1 + i];
//       subArr[l][i] = prevSum + nextNum;
//       //save best results
//       if (subArr[l][i] > best[0]) {
//         best = [subArr[l][i], i, l - 1];
//       }
//     }
//   }
//   let subSeqSum = arr.reduce((total, num) => {
//     //if total is negative, take greater
//     if (total < 0) {
//       return Math.max(total, num);
//     } else {
//       //add 0 or a positive number
//       return total + Math.max(0, num);
//     }
//   });
//   return [best[0], subSeqSum];
// };
/*
bottom up approach
attempt 2 the quest for minimalism
*/
const dp = arr => {
  //setup the prevSubArr contains the sum for
  //the previous iteration
  //prevSubArr structure [length] = sum
  //best = [sum, i, j]
  let best = [arr[0], 0, 0];

  //init, maybe use a map instead
  prevSubArr = Array(arr.length + 1);
  //length 0 = 0
  prevSubArr[0] = 0;
  // prevSubArr[1] = arr[0]
  let i = 0;
  for (let l = 1; l <= arr.length; l++) {
    prevSubArr[l] = prevSubArr[l - 1] + arr[l - 1];
    if (best[0] < prevSubArr[l]) {
      best = [prevSubArr[l], 0, l - 1];
    }
  }
  //sneaking in the computation of subSeqSum
  let subSeqSum = arr[0];
  //starting position of subArr
  for (let i = 1; i < arr.length; i++) {
    //subSeqSum things
    if (subSeqSum < 0) {
      subSeqSum = Math.max(subSeqSum, arr[i]);
    } else {
      //add 0 or a positive number
      subSeqSum += Math.max(0, arr[i]);
    }
    //subArr things
    //length of subArr
    for (let l = 1; l <= arr.length - i; l++) {
      //subtract from prev the non-included num
      let sum = prevSubArr[l] - arr[i - 1];
      //add the new end num
      sum += arr[i - l + 1];
      //save in prev for the next iteration
      prevSubArr[l] = sum;
      //check if it's the best subArr yet
      if (sum > best[0]) {
        best = [sum, i, l - 1];
      }
    }
  }
  return [best[0], subSeqSum];
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
//     let n = input[1 + i * 2];
//     let arr = input[2 + i * 2];
//     arr = arr.split(" ").map(str => parseInt(str));
//     let result = dp(arr);
//     console.log(`${result[0]} ${result[1]}`);
//   }
// });

var t0 = `2
4
1 2 3 4
6
2 -1 2 3 4 -5`;
var t1 = `6
1
1
6
-1 -2 -3 -4 -5 -6
2
1 -2
3
1 2 3
1
-10
6
1 -1 -1 -1 -1 5`;
//this code is digusting but I believe it's correct
//don't judge me....
//arr is broken down into three components
//optimal |     not       | possible
//[i...j] |  [x ... y]  | [z ... q]
const idkman = arr => {
  let subSeqSum = arr[0];
  //optimal
  let i = 0;
  let j = 0;
  let optimal = [i, j];
  let optimalSum = arr[i];
  //not
  let notOptimalSum = undefined;
  let x = undefined;
  let y = undefined;

  //possible
  let possibleSum = undefined;
  let z = undefined;
  let q = undefined;
  for (let k = 1; k < arr.length; k++) {
    //compute subSeq
    if (subSeqSum > 0) {
      subSeqSum += Math.max(arr[k], 0);
    } else {
      subSeqSum = Math.max(arr[k], subSeqSum);
    }
    //compute subArr
    //optimal is negative BURN THE TOWN
    if (optimalSum < 0) {
      if (arr[k] > optimalSum) {
        i = k;
        j = k;
        optimalSum = arr[k];
      }
    } else if (arr[k] >= 0 && j + 1 === k) {
      //contiguous and non-negative
      //extend optimal subArray
      j = k;
      optimalSum += arr[k];
    } else if (arr[k] >= 0) {
      //extend possible
      if (!z) z = k;
      q = k;
      //sum
      possibleSum = possibleSum ? possibleSum + arr[k] : arr[k];
    } else if (arr[k] < 0) {
      //extend not
      //if k > z then we deal with two pos subarrays
      if (z && k > z) {
        if (notOptimalSum + optimalSum > 0) {
          //add possible into optimal and reset
          // i = i;
          j = q || z;
          optimalSum += possibleSum + notOptimalSum;
          //reset
          //not
          notOptimalSum = undefined;
          x = undefined;
          y = undefined;

          //possible
          possibleSum = undefined;
          z = undefined;
          q = undefined;
        } else if (possibleSum >= optimalSum) {
          //NOTE: prefer the right subArray
          //possible is now optimal
          i = z;
          j = q || z;
          optimalSum = possibleSum;
          //reset
          //not is now k
          notOptimalSum = arr[k];
          x = k;
          y = k;

          //possible
          possibleSum = undefined;
          z = undefined;
          q = undefined;
        } else {
          //optimal remains, merge not and possible , reset
          notOptimalSum += possibleSum + arr[k];
          // y = q || z;
          y = k;
          //reset
          //possible
          possibleSum = undefined;
          z = undefined;
          q = undefined;
        }
      } else {
        //otherwise extend not
        if (!x) x = k;
        // if(!y) y = k;
        // if(y) y = k
        y = k;
        //sum
        notOptimalSum = notOptimalSum ? notOptimalSum + arr[k] : arr[k];
      }
    }
  }
  //check possible
  if (z) {
    if (notOptimalSum + optimalSum > 0) {
      //add possible into optimal
      optimalSum += possibleSum + notOptimalSum;
    } else if (possibleSum > optimalSum) {
      //possible is now optimal
      optimalSum = possibleSum;
    } else {
      //optimal remains
    }
  }
  return [optimalSum, subSeqSum];
};
// };
//for arr[0, end]
//optimal is [i, j], not optimal is [j + 1, ... k]
//if arr[k] === pos then j = k
//if arr[k] > optimal sum
//then if optimal sum > not optimal [j + 1 ... k - 1]
//optimal is now [i ... k]
//else optimal is now [k, k]

def max_sum_subarray(a, n):
    f[0..n-1]
    f[0] = a[0]
    ans = f[0]
    for i from 1 to n-1:
        f[i] = max(a[i], f[i-1] + a[i])
        ans = max(ans, f[i])
    return ans


[1, -1, -1, 2, -10, 7, 3, 1];
[1, -1, -1, 2, -10, 3, 7, 1];

// const trouble0 = [1, 2, 3];
// const trouble1 = [1, -1, -1, -1, -1, 5];
// console.log("answer = 6 6");
// console.log(dp(trouble0));
// console.log("answer = 5 6");
// console.log(dp(trouble1));

//import part of an insane test case
// dp results for test case a
// it's the wrong answer and it took 8 mins and 48 seconds ish
// 2617065 172083036 answer
// 1414512
// 1858534 172083036 dp's answer
// time : 0:8:48:306
const a = require("./testCase");

const test = (input, runBrute = true, runDP = true, runIDK = true) => {
  const timer = new Timer();
  input = input.split("\n");
  let t = input[0];
  if (runBrute) {
    timer.start();
    console.log("brute results");
    for (let i = 0; i < t; i++) {
      let n = input[1 + i * 2];
      let arr = input[2 + i * 2];
      arr = arr.split(" ").map(str => parseInt(str));
      let result = brute(arr);
      console.log(`${result[0]} ${result[1]}`);
    }
    timer.end();
    timer.print();
  }
  if (runDP) {
    console.log("dp results");
    timer.start();
    for (let i = 0; i < t; i++) {
      let n = input[1 + i * 2];
      let arr = input[2 + i * 2];
      arr = arr.split(" ").map(str => parseInt(str));
      let res1 = dp(arr);
      console.log(`${res1[0]} ${res1[1]}`);
    }
    timer.end();
    timer.print();
  }
  if (runIDK) {
    console.log("idk results");
    timer.start();
    for (let i = 0; i < t; i++) {
      let n = input[1 + i * 2];
      let arr = input[2 + i * 2];
      arr = arr.split(" ").map(str => parseInt(str));
      let res1 = idkman(arr);
      // console.log(`arr = ${util.inspect(arr)}`);
      console.log(`${res1[0]} ${res1[1]}`);
    }
    timer.end();
    timer.print();
  }
};
test(t0);
test(t1);
test(a, false, false, true);
const testIdkMan = () => {
  //cover all cases
  //case 1,
  const case1 = [-10, 10];
  const a1 = 10;
  const answer1 = idkman(case1);
  console.log(answer1[0] === a1);
  console.log(answer1);
  const case2 = [0, 10];
  const a2 = 10;
  const answer2 = idkman(case2);
  console.log(answer2[0] === a2);
  console.log(answer2);
  //left and right are equal then right gets better
  const case3 = [10, -10, 10, -1, 2];
  const a3 = 11;
  const answer3 = idkman(case3);
  console.log(answer3[0] === a3);
  console.log(answer3);
  //left is better than right
  const case4 = [10, -10, 9];
  const a4 = 10;
  const answer4 = idkman(case4);
  console.log(answer4[0] === a4);
  console.log(answer4);
  //left is better than right, then some other right is better
  const case5 = [10, -10, 9, -9, 100];
  const a5 = 100;
  const answer5 = idkman(case5);
  console.log(answer5[0] === a5);
  console.log(answer5);
  //left is better than right, then some other right is better
  const case6 = [10, -11, 9, -10, 100];
  const a6 = 100;
  const answer6 = idkman(case6);
  console.log(answer6[0] === a6);
  console.log(answer6);
  //negatives
  const case7 = [-11, -10, 100];
  const a7 = 100;
  const answer7 = idkman(case7);
  console.log(answer7[0] === a7);
  console.log(answer7);
  //two negatives
  const case8 = [-11, -10];
  const a8 = -10;
  const answer8 = idkman(case8);
  console.log(answer8[0] === a8);
  console.log(answer8);
};
// testIdkMan();
