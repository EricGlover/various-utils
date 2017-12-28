/*
find the largest prime factor of p
*/
package main

import (
  "fmt"
  "math"
  // "errors"
  // "os"
  // "bufio"
)
//make a slice of numbers from 0 to n (natural numbers)
func makeRange(n int) ([]bool){
  numbers := make([]bool, 0)
  for i := 0; i <= n; i++ {
    numbers = append(numbers, true)
  }
  return numbers
}
func primesToN(n int) (primes []int){
  //numbers will be my sieve, false = composite, true = prime
  numbers := makeRange(n)
  r := int(math.Sqrt(float64(n)))
  for i := 2; i < r; i++ {
    if numbers[i] {
      for j := 2; j * i <= n; j++ {
        numbers[j * i] = false
      }
    }
  }
  for i := 2; i <= n; i++ {
    if numbers[i] {
      primes = append(primes, i)
    }
  }
  return primes
}
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
func main(){
  primes := primesToN(int(math.Pow10(1)))
  fmt.Println(nextPrime(primes))
}
