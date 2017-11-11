//testing iterators and generators

//function* return an iterator
function* counter() {
  let count = 0;
  while (true) {
    yield count++;
    console.log("counting, count = ", count);
  }
}
var seq = counter();
console.log(seq.next());
console.log(seq.next());
console.log(seq.next());
console.log(seq.next());
console.log(seq.next());
console.log(seq.next());

/*    fibonacci generator   */
function* fibonacci() {
  var fn1 = 0;
  var fn2 = 1;
  while (true) {
    var current = fn1;
    fn1 = fn2;
    fn2 = current + fn1;
    var reset = yield current;
    console.log("reset = ", reset);
    if (reset) {
      fn1 = 0;
      fn2 = 1;
    }
  }
}
/*    fibonacci without es6 :(    */
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
/*    sum all odd fibs <= num */
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

// var sequence = fibonacci();
// console.log(sequence.next().value); // 0
// console.log(sequence.next().value); // 1
// console.log(sequence.next().value); // 1
// console.log(sequence.next().value); // 2
// console.log(sequence.next().value); // 3
// console.log(sequence.next().value); // 5
// console.log(sequence.next().value); // 8
// console.log(sequence.next(true).value); // 0
// console.log(sequence.next().value); // 1
// console.log(sequence.next().value); // 1
// console.log(sequence.next().value); // 2
