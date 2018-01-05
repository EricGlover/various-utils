/*
TODO: figure out how to handle equisitely large numbers
*/

package main

import (
    "fmt"
    "math"
)

var p = int(math.Pow10(9)) + 7

func mod(n int) int {
  return n % p
}
/*
nth term = n^2 - (n - 1)^2
this is just the sequence of odd numbers
nth term = 2n - 1
so
sum (2n - 1) from 1 ... n
so
(2 * sum(n) from 1 ... n ) - n
*/
func sumToN(n int) int {
  fmt.Println("sum to n ", n * (n + 1) / 2)
  return n * (n + 1) / 2
}
func s(n float64) float64 {
  fmt.Println("sum to n ", n * (n + 1) / 2)
  return n * (n + 1) / 2
}
//(2 * sum(n) from 1 ... n ) - n
func quickSumOdds(n int) int {
  q := s(float64(n))
  ans := mod(int(2 * q - float64(n)))
  fmt.Println(ans)
  return mod(2 * sumToN(n) - n)
}
func brute(n int) int {
  sum := 0
  for i := 1; i <= n ; i++ {
    sum += 2 * i - 1
  }
  // fmt.Println("sum = ", sum)
  modded := mod(sum)
  // fmt.Println("modded sum = ", modded)
  return modded
}

func sum(n int) int {
  fn := quickSumOdds
  return fn(n)
}
// 1 <= T <= 10
// 1 <= n <= 10 ** 16

func main() {
  var t, n int
  fmt.Scan(&t)
  for i := 0; i < t; i++ {
    fmt.Scan(&n)
    answer := sum(n)
    fmt.Println(answer)
  }
}
