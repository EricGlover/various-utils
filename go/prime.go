package main

import (
    "fmt"
)
//brute force prime checking
func brute(num int) (bool){
  r := int(math.Sqrt(float64(num)))
  for i := 2; i <= r; i++ {
    if num % i == 0{
      return false
    }
  }
  return true
}
//given a slice of primes find / return the next prime number 
func nextPrime(primes []int) (int) {
  num := primes[len(primes) - 1]
  for {
    isPrime := true
    //check primehood against previous primes
    for _, p := range primes {
      if num % p == 0 {
        //num is not prime
        isPrime = false
        break;
      }
    }
    if isPrime {
      return num
    }
    //return if prime
    num++;
  }
}
func primesToN(n int) ([]int){
  //numbers will be my sieve, false = composite, true = prime
  numbers := makeRange(n)
  //Note the case of n = 1000, r = 31, 31 * 31 = 961 && 961 < 1000
  //so in the example r must be included in our loop
  r := int(math.Sqrt(float64(n)))
  //keep track of size
  size := n
  var primes []int
  for i := 2; i <= r; i++ {
    if numbers[i] {
      //just noticed previously I'd been starting j := 2, silly me
      for j := i; j * i <= n; j++ {
        if numbers[j * i] {
          size--;
        }else {
          // fmt.Println("repeated")
        }
        numbers[j * i] = false
      }
    }
  }
  primes = make([]int, size - 1, size - 1)
  for i, j := 2, 0; i < len(numbers); i++ {
    if numbers[i] {
      primes[j] = i
      j++
    }
  }
  return primes
}
func main() {

}
