/*
find the sum of the primes from 2 to n
*/
//Basic idea
//make a sieve
//reduce the sieve

//make a sive of size n, since we're looking for primes of value
//prime <= n
var sieve = function(n) {
  //our size uses indexes as values so make sure
  //to include the nth value
  var sieve = Array(n + 1).fill(true);
  sieve[0] = false;
  sieve[1] = false;
  for (var i = 0; i < Math.sqrt(n); i++) {
    if (!sieve[i]) continue;
    for (var k = i * i; k <= n; k += i) {
      sieve[k] = false;
    }
  }
  var primes = [];
  sieve.forEach(function(el, i) {
    if (el) primes.push(i);
  });
  return primes;
};
function sumPrimes(n) {
  //sieve returns an array of primes
  //we reduce the array to the sum of the array
  return sieve(n).reduce(function(sum, prime) {
    return sum + prime;
  });
}

// console.log(sumPrimes(10));
// console.log(sumPrimes(977));
// var test = () => {
//   console.log(upperBound(10));
//   console.log(upperBound(100));
// };
// // test();
