// //generator for the sequence of natural numbers ** pow <= n ///1..n
const naturalNumbers = function*() {
  let i = 1;
  while (true) {
    yield i;
    i++;
  }
};
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
// 1
// 1 2
//
// 1 2 3
//
// 1
// 1 2
// 1 3
// 1 2 3
//
// 2
// 2 3
//
// 3
//find all the combinations involving
//the first number
const perms = (list, sum, prevTotal) => {
  //base case
  if (list.length === 1) {
    if (list[0] + prevTotal === sum) return 1;
  } else if (list.length === 0) {
    if (sum === 0) return 1;
    return 0;
  }
  //fuck my brain
  let arr = [list[0]];
  let remain = list.slice(1);
};
function processData(input) {
  const [x, n] = input.split("\n").map(num => parseInt(num));
  const nums = nthPowersLessThanX(x, n);
  // console.log(perms(nums));
  const sums = perms(nums).filter(perm => sumSet(perm) === x);
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
