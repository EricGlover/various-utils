/*SUM ALL ODD FIBS (WITHOUT ES6)*/
/*
Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.

The first two numbers in the Fibonacci sequence are 1 and 1. Every additional number in the sequence is the sum of the two previous numbers. The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.

For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than 10 are 1, 1, 3, and 5.
*/

var isOdd = function(num) {
  return num % 2 !== 0;
};
var fibSeqMaker = function() {
  var prev = 1;
  var current = 1;
  var n = 0;
  return function() {
    if (n < 2) {
      n++;
      return 1;
    }
    var tmp = current;
    current = prev + tmp;
    prev = tmp;
    return current;
  };
};

function sumFibs(num) {
  var total = 0;
  var nextFib = fibSeqMaker();
  var current = nextFib();
  while (current <= num) {
    if (isOdd(current)) total += current;
    current = nextFib();
  }
  return total;
}

sumFibs(4);
console.log(sumFibs(10));
console.log(sumFibs(1000));
console.log(sumFibs(75025));

/* test code */
var nextFib = fibSeqMaker();
console.log(nextFib());
console.log(nextFib());
console.log(nextFib());
console.log(nextFib());
console.log(sumFibs);
