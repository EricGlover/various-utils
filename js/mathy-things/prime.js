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
  debugger;
  // _primes = Array(100).fill(undefined).map(el => _nextPrime.next().value);
  _primes = [2];
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

  this.printPrimes = n => console.log(_primes);
};
const prime = new Prime();
debugger;
// prime.printPrimes();
console.log(prime.primeFactorDecomposition(7));
console.log(prime.primeFactorDecomposition(12));
console.log(prime.primeFactorDecomposition(69));
console.log(prime.primeFactorDecomposition(124));
// console.log(prime.bruteCheck(10 ** 12 + 39));
console.log(prime.primeFactorDecomposition(10 ** 12 - 9));
