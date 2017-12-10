/*
find the number of combinations of unique natural numbers to the nth
power that sum to X
1 <= X <= 1000
2 <= N <= 10
*/

// 1
// 1 8
// 1 27
// 1 8 27
// 8
// 8 27
// 27
//iteratively
//incorrect
// const perms = numbers => {
//   let all = [];
//   for (let i = 0; i < numbers.length; i++) {
//     let tmp = [];
//     for (let j = i; j < numbers.length; j++) {
//       tmp.push(numbers[j]);
//       all.push(tmp.slice(0));
//     }
//   }
//   return all;
// };
// console.log(perms([1, 8, 27]));
//recursively
// const permutations = (numbers, currentList = []) => {
//   //base case
//   if (numbers.length <= 1) {
//     return currentList.concat(numbers);
//   }
//   return numbers.reduce((sets, num, i) => {
//     //attempt to add each num to the sets in the list
//   }, []);
// };
//iterative solution to find all combinations
//of a list of numbers
//I used sets for seemingly no reason but they were fun
//to work with so ohhh well
// const perms = numbers => {
//   let empty = new Set();
//   let sets = [empty];
//   for (let i = 0; i < numbers.length; i++) {
//     let num = numbers[i];
//     sets.forEach(set => {
//       if (!set.has(num)) {
//         //clone and add
//         let clone = new Set(set.values());
//         clone.add(num);
//         sets.push(clone);
//       } else {
//         console.log("shouldnt happen ");
//       }
//     });
//   }
//   //return all sets except empty
//   return sets.slice(1);
// };
//given a set return it's sum
const sumSet = set => {
  let total = 0;
  for (let value of set) {
    total += value;
  }
  return total;
};
// //generator for the sequence of natural numbers ** pow <= n ///1..n
// const naturalNumbers = function*(n, pow) {
//   let i = 1;
//   let num = Math.pow(i, pow);
//   while (num <= n) {
//     yield num;
//     i++;
//     num = Math.pow(i, pow);
//   }
// };
//function the returns the sequence 1,2,..n in an array
const list = n => {
  let arr = [];
  let seq = naturalNumbers();
  let a = seq.next().value;
  while (a <= n) {
    arr.push(a);
    a = seq.next().value;
  }
  return arr;
};
//find a list of natural numbers ** n where each num <= x
const nthPowersLessThanX = (x, n) => {
  //find the highest nat number we need
  let high = Math.floor(Math.pow(x, 1 / n));
  //grab the list of them and ** n
  return list(high).map(num => Math.pow(num, n));
};
// function processData(input) {
//   const [x, n] = input.split("\n").map(num => parseInt(num));
//   const nums = nthPowersLessThanX(x, n);
//   // console.log(perms(nums));
//   const sums = perms(nums).filter(perm => sumSet(perm) === x);
//   console.log(sums.length);
// }
//generator for the sequence of natural numbers ** pow <= n ///1..n
const naturalNumbers = function*(n, pow = 1) {
  let i = 1;
  let num = Math.pow(i, pow);
  while (num <= n) {
    yield num;
    i++;
    num = Math.pow(i, pow);
  }
};
//refactored, numbers is an iterator
const combos = numbers => {
  let prevSums = [0];
  for (let num of numbers) {
    prevSums.forEach(sum => {
      //clone and add
      prevSums.push(sum + num);
    });
    console.log(num);
    console.log(prevSums.length);
  }
  return prevSums;
};
function processData(input) {
  const [x, n] = input.split("\n").map(num => parseInt(num));
  const seq = naturalNumbers(x, n);
  const sums = combos(seq).filter(sum => sum === x);
  console.log(sums.length);
}
process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function(input) {
  _input += input;
});

process.stdin.on("end", function() {
  processData(_input);
});

const i0 = `10
2`;
const i1 = `100
2`;
const i2 = `100
3`;
const i3 = `800
2`;
processData(i0);
processData(i1);
processData(i2);
processData(i3);
