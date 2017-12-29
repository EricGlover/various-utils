/*
find the largest prime factor of p
*/
package main

import (
  "fmt"
  "math"
  "time"
)
func sieveAndSift(n int) (int) {
  //numbers will be my sieve, true = composite, false = prime
  numbers := make([]bool, n + 1, n + 1)
  tmp := n
  largest := tmp    //init to n, so if n is prime it returns itself
  //Note the case of n = 1000, r = 31, 31 * 31 = 961 && 961 < 1000
  //so in the example r must be included in our loop
  r := int(math.Sqrt(float64(n)))
  for i := 2; i < n; i++ {
    if !numbers[i] {
      //i is prime
      //remove prime factors
      for tmp % i == 0 {
        tmp /= i
        largest = i
      }
      if tmp == 1 {
        return largest
      }
      if i <= r {
        for j := i; j * i <= n; j++ {
          numbers[j * i] = true
        }
      }
    }
  }
  return largest
}
func main(){
  //modified sieve procedure
  //compute primes <= 10 ** 6
  // var lines int
  // var n int
  // fmt.Scan(&lines)
  // for lines > 0 {
  //   fmt.Scan(&n)
  //   largestPrime := sieveAndSift(n)
  //   fmt.Println(largestPrime)
  //   lines--
  // }
  test()
}
func test(){
  test1 := 10
  test2 := 17
  // test3 := 1000000000000
  //sieve for 10 ** 10 is terribly slow
  // test4 := 10000000000
  //sieve for a billion is slow
  testB := 1000000000
  testB1 := 1000000000 - 13
  //sieve for 10 ** 8 isn't too shabby
  test5 := 100000000
  // test6 := 100000
  // fmt.Println(primesToN(10))
  // fmt.Println(primesToN(17))
  runTest := func (arg1 int) {
    start := time.Now()
    res := sieveAndSift(arg1)
    end := time.Now()
    elapsed := end.Sub(start)
    fmt.Println("elapsed time = ", elapsed)
    fmt.Println(res)
  }
  runTest(test1)
  runTest(test2)
  runTest(test5)
  runTest(testB)
  runTest(testB1)
}
