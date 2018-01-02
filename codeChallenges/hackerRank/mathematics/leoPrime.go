package main

import (
    "fmt"
)

func primeGen() (func() int) {
  prime := 2
  return func() int {
    last := prime
    for num := last + 1; ; num++{
      isPrime := true
      for i := 2; i < num; i++ {
        if num % i == 0 {
          isPrime = false
        }
      }
      if isPrime {
        prime = num
        break
      }
    }
    return last
  }
}

func maxFactors(n int) int {
  if n <= 1 {
    return 0
  }
  max, sum := 0, 1
  primes := primeGen()
  for sum <= n {
    sum *= primes()
    max++
  }
  return max - 1
}

func main() {
  var lines, n int
  fmt.Scan(&lines)
  for lines > 0 {
    fmt.Scan(&n)
    fmt.Println(maxFactors(n))
    lines--
  }
}
