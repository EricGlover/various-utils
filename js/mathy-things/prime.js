//a prime Class for doing mathy things

const Prime = function() {
  const bruteCheck = number => {
    if (!Number.isInteger(number)) return false;
    if (number <= 1) return false;
    if (number % 2 === 0) return false;
    const m = Math.sqrt(number);
    for (let i = 3; i <= m; i += 2) {
      if (number % i === 0) return false;
    }
    return true;
  };
  this.bruteCheck = bruteCheck;
  //injectable iterator
  _primeIterator = function*() {
    let prime = 2;
    yield prime;
    while (true) {
      let injected;
      if (bruteCheck(prime)) {
        injected = yield prime;
      }
      prime = injected || ++prime;
    }
    return new Error("JS math no good, sorry");
  };
  _nextPrime = _primeIterator();
  // _primes = Array(100).fill(undefined).map(el => _nextPrime.next().value);
  _primes = [2];
  //this works well-ish, not well enough for haxRax #3
  this.primeFactorDecomposition = n => {
    //check if n is prime, doing this beforehand seems inefficient
    //it's moderately efficient when setup Prime using a sieve beforehand
    let _nextPrime = _primeIterator();
    if (n <= _primes[_primes.length - 1]) {
      if (_primes.includes(n)) return [n];
    } else {
      if (bruteCheck(n)) return [n];
    }
    let primeFactors = [];
    //here's the idea, continously attempt to pull out prime factors from
    // n, this process is complete when n == 1
    const m = Math.sqrt(n);
    let temp = n;
    while (temp !== 1) {
      let nextPrime = _nextPrime.next().value;
      if (nextPrime >= n) {
        primeFactors = [n];
        break;
      } else if (nextPrime === n) {
        return [n];
      }
      while (temp % nextPrime === 0) {
        primeFactors.push(nextPrime);
        temp = Math.trunc(temp / nextPrime);
      }
    }
    return primeFactors;
  };
  //internal method for getting the nth prime via a sieve
  this.sieve = (n, upperBound) => {
    //now you can also pass it an upperBound
    upperBound = upperBound || Math.ceil(this.upperBound(n));
    let sieve = Array(upperBound).fill(true);
    sieve[0] = false;
    sieve[1] = false;
    for (let i = 0; i < Math.sqrt(upperBound); i++) {
      if (!sieve[i]) continue;
      for (let k = i * i; k <= upperBound; k += i) {
        sieve[k] = false;
      }
    }
    let primes = [];
    sieve.forEach((el, i) => {
      if (el) primes.push(i);
    });
    return primes;
  };
  //
  this.sumPrimes = n => this.range(n).reduce((sum, prime) => sum + prime);
  //not inclusive
  this.primesLessThanN = n => {
    return this.sieve(n);
  };
  this.sumPrimesLessThanN = n => {
    this.primesLessThanN(n).reduce(function(sum, prime) {
      return sum + prime;
    });
  };
  this.nPrimesGenerator = n => {
    let nextPrime = _primeIterator();
    let primes = [];
    for (let i = 0; i < n; i++) {
      primes.push(nextPrime.next().value);
    }
    return primes;
  };
  this.nth = n => {
    let nextPrime = _primeIterator();
    let prime = 2;
    for (let i = 0; i < n; i++) {
      prime = nextPrime.next().value;
    }
    return prime;
  };
  this.upperBound = n => n * (Math.log(n) + Math.log(Math.log(n)));
  this.range = n => {
    // the generator works but it's a bit slow
    // return this.nPrimesGenerator(n)
    //slicing probably makes this just as slow but ohhh wells
    return this.sieve(n).slice(0, n);
  };
  this.printPrimes = n => console.log(_primes);
};

//helper function
const compareArray = (arr, arr2) => {
  if (arr.length != arr2.length) return false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != arr2[i]) return false;
  }
  return true;
};
/*      TEST FUNCTIONS        */
const upperBoundTest = () => {
  const assert = require("assert");
  //TODO: write more tests for this sometime
  let prime = new Prime();
  assert.ok(prime.upperBound(10) > 29);
  assert.ok(prime.upperBound(11) > 31);
  // console.log(prime.upperBound(10));
  // console.log(prime.upperBound(11));
};
const rangeTest = () => {
  const assert = require("assert");
  const ten = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  let prime = new Prime();
  //it returns an array of size n
  assert.equal(prime.range(10).length, 10);
  //it returns an array of the first n primes
  assert.ok(
    compareArray(prime.range(10), ten),
    "it returns an array of the first n primes"
  );
};
const nthTest = () => {
  const assert = require("assert");
  //TODO: write more tests for this sometime
  let prime = new Prime();
  assert.ok(prime.nth(10) === 29, "it returns the nth prime"); /// => 29
};
const sumPrimesTest = () => {
  const assert = require("assert");
  const ten = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  let prime = new Prime();
  // console.log(ten.reduce((sum, prime) => sum + prime)); // => 129
  // console.log(prime.sumPrimes(10));                     // => 129
  assert.equal(ten.reduce((sum, prime) => sum + prime), prime.sumPrimes(10));
};
const test = () => {
  rangeTest();
  nthTest();
  upperBoundTest();
  sumPrimesTest();
  const prime = new Prime();
  // prime.printPrimes();
  // console.log(prime.range(10));
  // console.log(prime.primeFactorDecomposition(7));
  // console.log(prime.primeFactorDecomposition(12));
  // console.log(prime.primeFactorDecomposition(69));
  // console.log(prime.primeFactorDecomposition(124));
  // console.log(prime.bruteCheck(10 ** 12 + 39));
  // console.log(prime.primeFactorDecomposition(10 ** 12 - 9));
};
test();
