//a Prime generator using iterators/generators,
//finds by primes by brute force division checking
//which is absymal but not a terrible method if you only needed one more prime
//on occassion and not the next 10^5 primes, you get the idea

function* primes(maxRange = Number.MAX_SAFE_INTEGER, numberOfPrimes = 1000) {
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
  while (prime <= maxRange && count <= numberOfPrimes) {
    let injected;
    if (bruteCheck(prime)) {
      count++;
      injected = yield console.log(prime) || prime;
    }
    prime = injected || ++prime;
  }
  return new Error("JS no math good, sorry");
}
var primes = primes();
primes.next(); //=>2
primes.next(); //=>3
primes.next(); //=>5
primes.next(1); //=>2
primes.next(); //=>3
primes.next(100); //=>101
primes.next(11); //=>11
let first1000primes = [...primes];
