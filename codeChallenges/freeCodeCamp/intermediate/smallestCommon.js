//I'm going to do this in a slightly odd way
///method 1
//inefficient but it'll suffice
function* primeGen(maxRange = Number.MAX_SAFE_INTEGER) {
  let prime = 2;
  let count = 0;
  let bruteCheck = number => {
    if (!Number.isInteger(number)) return false;
    if (number <= 1) return false;
    if (number % 2 === 0) return false;
    const m = Math.sqrt(number);
    for (let i = 3; i <= m; i += 2) {
      if (number % i === 0) return false;
    }
    return true;
  };
  yield prime;
  while (prime <= maxRange) {
    let injected;
    if (bruteCheck(prime)) {
      count++;
      injected = yield prime;
    }
    prime = injected || ++prime;
  }
  return new Error("JS no math good, sorry");
}
//inefficient but it'll suffice
const primeFactorization = (num, primes) => {
  let factors = {};
  let current = num;
  for (let i = 0; i < primes.length; i++) {
    while (current % primes[i] === 0) {
      current /= primes[i];
      if (factors[primes[i]] === undefined) {
        factors[primes[i]] = 1;
      } else {
        factors[primes[i]]++;
      }
    }
  }
  return factors;
};
//keep the max value for any key in union of A & B
const mergeObjs = (a, b) => {
  let merged = {};
  //add A
  Object.keys(a).forEach(key => (merged[key] = a[key]));
  //add B
  Object.keys(b).forEach(key => {
    if (a[key]) {
      let max = Math.max(a[key], b[key]);
      merged[key] = max;
    } else {
      merged[key] = b[key];
    }
  });
  return merged;
};
function smallestCommons(arr) {
  let low = Math.min(...arr);
  let high = Math.max(...arr);
  //for each number in the range low ... high
  //decompse them into prime factors
  //then add them into a set-like obj
  let primeFactors = {};
  let primes = [];
  let iter = primeGen();
  primes.push(iter.next().value);
  for (let i = low; i <= high; i++) {
    //get sufficient primes
    // console.log(primes);
    while (primes[primes.length - 1] < i) {
      primes.push(iter.next().value);
    }
    // console.log(primes);
    //decompse
    let factors = primeFactorization(i, primes);
    // console.log(factors);
    //merge
    primeFactors = mergeObjs(primeFactors, factors);
  }
  // console.log(primes);
  // console.log(primeFactors);
  //multiply factors
  return Object.entries(primeFactors).reduce((total, entry) => {
    return (total *= Math.pow(Number(entry[0]), entry[1]));
  }, 1);
}
//method 2
//more in line with what they were hinting at
//range = [low ... high]
//seqs = [seq(low)...seq(high)]   (they're iterators)
//set max = highest number in seqs

//while not every number in seqs === max
//take a sequence and continue it until
//it's value is >= max
//reset max
//when while breaks, you have your smallest common multiple
//while breaks when every number in the seqs is equal
function* sequence(a) {
  let a1 = a;
  for (let i = 1; true; i++) {
    yield a1 * i;
  }
}
function* rangeGen(low, high) {
  let current = low;
  while (true) {
    yield current;
    current++;
    if (current > high) {
      current = low;
    }
  }
}
function smallestCommons2(arr) {
  let low = Math.min(...arr);
  let high = Math.max(...arr);
  let seqs = [];
  for (let i = low; i <= high; i++) {
    seqs.push(sequence(i));
  }
  //range is used to loop through seqs,
  //it's spits out 0 ... seqs.length -1 repeatedly
  let range = rangeGen(0, seqs.length - 1);
  //current = [seq[0] iter.value, ... , seq[n] iter.value]
  let current = Array(seqs.length)
    .fill(true)
    .map((el, i) => {
      return seqs[i].next().value;
    });
  let max = current[current.length - 1];
  while (!current.every(num => num === max)) {
    let i = range.next().value;
    while (current[i] < max) {
      current[i] = seqs[i].next().value;
    }
    max = current[i];
  }
  return max;
}
// console.log(smallestCommons2([1, 5]));
// TEST UTILITIES
const confirm = (low, high, num) => {
  for (let i = low; i <= high; i++) {
    if (num % i !== 0) return false;
  }
  return true;
};
const test = () => {
  const a = [1, 5];
  const b = [1, 13];
  let answer = smallestCommons(a);
  // let answer = 12;
  let res = confirm(...a, answer);
  console.log(`smallestCommon(${a}) = ${answer}, confirmed? ${res}`);
  answer = smallestCommons(b);
  // answer = 10001;
  res = confirm(...b, answer);
  console.log(`smallestCommon(${b}) = ${answer}, confirmed? ${res}`);
  answer = smallestCommons2(a);
  // let answer = 12;
  res = confirm(...a, answer);
  console.log(`smallestCommon2(${a}) = ${answer}, confirmed? ${res}`);
  answer = smallestCommons2(b);
  // answer = 10001;
  res = confirm(...b, answer);
  console.log(`smallestCommon2(${b}) = ${answer}, confirmed? ${res}`);
};
test();
// console.log(smallestCommons([1, 5]));
