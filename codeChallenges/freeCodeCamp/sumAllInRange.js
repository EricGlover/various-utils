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
