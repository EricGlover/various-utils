/*
given n
find max number of unique primes of any number
in the range [1 ... n] inclusive both sides
*/

const Primes = function*(start = 2) {
  for (let i = start; true; i++) {
    let isPrime = true;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      yield i;
    }
  }
};

const m = n => {
  const p = Primes();
  if (n <= 1) {
    return 0;
  }
  let maxFactors = 0;
  let sum = 1;
  while (sum <= n) {
    let nextPrime = p.next().value;
    sum *= nextPrime;
    maxFactors++;
  }
  return maxFactors - 1;
};

function processData(input) {
  const str = input.split("\n");
  const lines = Number(str[0]);
  for (let cases = 0; cases < lines; cases++) {
    let n = Number(str[cases + 1]);
    console.log(m(n));
  }
}
// console.log(m(500));
