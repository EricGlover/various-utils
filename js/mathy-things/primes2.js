const printTime = (start, end) => {
  let diff = end - start;
  // let d = new Date(end - start);
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;
  const second = 1000;
  // let h = Math.floor(diff / hour)
  // diff -= h * hour;
  let [h, m, s] = [hour, minute, second].map(base => {
    let amount = Math.floor(diff / base);
    diff -= amount * base;
    return amount;
  });
  console.log(`time : ${h}:${m}:${s}:${diff}`);
  // console.log("alt method ");
  // diff = d;
  // console.log(`hours : ${Math.floor(diff.getHours())}`);
  // console.log(`mins : ${Math.floor(diff.getMinutes())}`);
  // console.log(`seconds : ${Math.floor(diff.getSeconds())}`);
};

//the main function is that it
//can be iterated over and yields primes
////think of it as having similar behavior to
////JS dynamic arrays
class Primes {
  constructor() {
    this.primes = this.sieve(100);
    this.heapMemCrash = false;
  }
  *[Symbol.iterator]() {
    let i = 0;
    //SIEVE METHOD
    while (this.primes[i] <= Number.MAX_SAFE_INTEGER) {
      //check if we need to find more primes
      if (this.primes[i] === 17834437) {
        this.heapMemCrash = true;
        break;
      }
      if (!this.heapMemCrash) {
        if (i > this.primes.length / 2) {
          this.primes = this.sieve(this.primes[this.primes.length - 1] * 5);
        }
      }
      i++;
      yield this.primes[i - 1];
    }
    //RETURN THE REST OF THE PRIMES THAT THE SIEVE FOUND
    //go to the end of the primes we have
    while (i <= this.primes.length - 1) {
      i++;
      yield this.primes[i - 1];
    }
    //use brute force instead of a sieve
    while (true) {
      this.primes.push(this.bruteForce(this.primes[this.primes.length - 1]));
      let prime = this.primes[this.primes.length - 1];
      if (prime > Number.MAX_SAFE_INTEGER) break;
      yield prime;
    }
  }
  //37 367,713
  bruteForce(lastPrime = 2) {
    let current = lastPrime + 2; //the last prime must have been odd
    let isPrime = true;
    while (true) {
      //set flag to true for each num
      isPrime = true;
      //if current is evenly divisible by a prime then it's composite
      for (let i = 0; i < this.primes.length; i++) {
        if (current % this.primes[i] === 0) {
          isPrime = false;
          break;
        }
      }
      //current is composite
      if (isPrime) return current;
      current += 2;
    }
  }
  sieve(upperBound) {
    let sieve = Array(upperBound).fill(true);
    sieve[0] = false;
    sieve[1] = false;
    for (let i = 0; i < Math.sqrt(upperBound); i++) {
      if (!sieve[i]) continue;
      for (let k = i * i; k <= upperBound; k += i) {
        sieve[k] = false;
      }
    }
    return sieve.reduce((primes, el, i) => {
      if (el) {
        primes.push(i);
      }
      return primes;
    }, []);
  }
}

let i = 0;
let primes = new Primes();
let start = new Date();
for (let prime of primes) {
  console.log(prime);
  i++;
  if (prime > 10 ** 8) break;
}
let finish = new Date();
printTime(start, finish);
// console.log(`time = ${(finish - start) / 1000} seconds`);
// console.log(`time = ${(finish - start) / 1000} seconds`);

// let s = new Date();
// setTimeout(() => {
//   let end = new Date();
//   printTime(s, end);
// }, 3331);
// //17,834,437
