/*    SUM ALL NUMBERS IN A RANGE */
/*
We'll pass you an array of two numbers. Return the sum of those two numbers and all numbers between them.
*/

//method one
//the heavily hinted way
function methodOne(arr) {
  var max = Math.max(arr[0], arr[1]);
  var min = Math.min(arr[0], arr[1]);
  var current = min + 1;
  while (max > current) {
    arr.push(current);
    current++;
  }
  return arr.reduce(function(total, num) {
    return total + num;
  }, 0);
}

//method two
// sum to n, 1 + 2 + ... + n
function sumToN(n) {
  return n * (n + 1) / 2;
}
// you have a sequence a ... b
// example: 3, 4, 5
// since you can find the sum of a sequence 1 ... n in O(1) time
// you can use that fact to find 3 + 4 + 5 in O(1) time
// so you take the sum of the sequence 1 ... 5 - the sum of the sequence 1 ... 2
// to give you the sum of 3 ... 5 in O(1) time
var methodTwo = function(arr) {
  var sumToMax = sumToN(Math.max(arr[0], arr[1]));
  var sumToMin = sumToN(Math.min(arr[0], arr[1]) - 1);
  return sumToMax - sumToMin;
};

var sumAll = methodTwo;
/* test code */
function tests() {
  var cases = [[1, 4], [4, 1], [5, 10], [10, 5]];
  var answers = [10, 10, 45, 45];
  var assert = require("assert");
  assert.ok(typeof sumAll([1, 4]) === "number");
  cases.forEach(function(testCase, index) {
    assert.equal(sumAll(testCase), answers[index]);
  });
}
tests();

/* Some stuff I wrote for a medium blog post  */

/* SUM 1 - 100 */
// 1 2 3 ... 98 99 100
// 1 + 100 = 101
// 2 + 99 = 101
// 3 + 98 = 101
//number of such pairs
// total numbers = 100
// / 2
// 50
//and if we have 50 pairs of numbers
//that all sum to 101
//the solution is
// 50 * 101 = 5050

/* SUM 4 - 9 */
// 4 5 6 7 8 9
// 4 + 9 = 13
// 5 + 8 = 13
// 6 + 7 = 13

/* SUM 4 - 10 */
// 4 5 6 7 8 9 10
// 4 + 10 = 14
// 5 + 9 = 14
// 6 + 8 = 14
// 7 + 0 = 7

/* the standard sum from 1 to N function */
// const sumToN = n => n * (n + 1) / 2;

/* our fancy smancy sum from low to N (inclusive) function */
const magicBeans = (low, high) => {
  //sum of pairs  * //number of pairs
  return (low + high) * (high + 1 - low) / 2;
};
//detailed version
const explicit = (low, high) => {
  const sumOfPairs = low + high;
  const amountOfNumbersInSequence = high - (low - 1);
  const amountOfPairs = amountOfNumbersInSequence / 2;
  return sumOfPairs * amountOfPairs;
};
/* SUM 4 - 9 */
console.log(`sum from 4 to 9 ${sumToN(9) - sumToN(3)}`);
console.log(`sum from 4 to 9 ${magicBeans(4, 9)}`);
/* SUM 4 - 10 */
console.log(`sum from 4 to 10 ${sumToN(10) - sumToN(3)}`);
console.log(`sum from 4 to 10 ${magicBeans(4, 10)}`);
