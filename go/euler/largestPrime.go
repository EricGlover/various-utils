/*
find the largest prime factor of p
*/
package main

import (
  "fmt"
  "math"
  "errors"
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
      // primes = append(primes, i)
      primes[j] = i
      j++
    }
  }
  return primes
}
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
func findLargest(n int, primes []int) (largest int, err error) {
  for i := len(primes) - 1 ; i >= 0; i -- {
    if n % primes[i] == 0 {
      return primes[i], nil
    }
  }
  return 0, errors.New("not in range")
}
//return the remainder or the largestPrime factor
func siftPrimes(n int, primes []int) (remainder int, largestPrime int) {
  remainder = n
  largestPrime = 0
  for _, p := range primes {
    //if p is a factor of n,
    // take out all the p's you can
    for remainder % p == 0 {
      remainder /= p
      largestPrime = p
    }
    //we've pried out all the factors
    if remainder == 1 {
      return remainder, largestPrime
    }
  }
  return remainder, largestPrime
}
func main(){
  //modified sieve procedure
  //compute primes <= 10 ** 6
  // var lines int
  // var n int
  // fmt.Scan(&lines)
  // primes := primesToN(int(math.Pow10(6)))
  // primes := make([]int, 0)
  // primes = append(primes, 2)
  // for lines > 0 {
  //   fmt.Scan(&n)
  //   var tmp, largestPrime int
  //   if brute(n) {
  //     largestPrime = n
  //   }else {
  //     //factor out all the primes you can first
  //     tmp, largestPrime = siftPrimes(n, primes)
  //     for tmp != 1 {
  //       //do some brutish checking for primes
  //       //for each prime run sift
  //       next := nextPrime(primes)
  //       primeSly := make([]int, 1, 1)
  //       primeSly[0] = next
  //       tmp, largestPrime = siftPrimes(tmp, primeSly)
  //       //remember to add the last prime we found to primes
  //       primes = append(primes, next)
  //     }
  //   }
  //   fmt.Println(largestPrime)
  //   lines--
  // }
  test()
}
func includes(nums []int, value int) (bool) {
  for _, n := range nums {
    if value == n {
      return true
    }
  }
  return false
}
func testBrute(){
  bruteWorks := true
  largeNum := 1000
  primes := primesToN(largeNum)
  fmt.Println(primes)
  for i := 2; i < largeNum; i++ {
    answer := includes(primes, i)
    result := brute(i)
    if answer != result {
      fmt.Println(i, " brute says ", result, " but really it's ", answer)
      bruteWorks = false
    }
  }
  fmt.Println("brute works? ", bruteWorks)
}
//write a timer for these tests for benchmarking 
func test(){
  // test1 := 10
  // ans1 := 5
  // test2 := 17
  // ans2 := 17
  // test3 := 1000000000000
  //sieve for 10 ** 10 is terribly slow
  // test4 := 10000000000
  //sieve for a billion is slow
  testM := 1000000000
  //sieve for 10 ** 8 isn't too shabby
  // test5 := 100000000
  // test6 := 100000
  fmt.Println(primesToN(10))
  fmt.Println(primesToN(17))
  // fmt.Println(primesToN(test5))
  fmt.Println(primesToN(testM))
  // fmt.Println(findLargest(10, primesToN(10)))
  // fmt.Println(findLargest(17, primesToN(17)))
  // fmt.Println(findLargest(test3, primesToN(test3)))
  // fmt.Println(findLargest(test4, primesToN(test4)))
  // fmt.Println(findLargest(test5, primesToN(test5)))
  // fmt.Println(findLargest(test6, primesToN(test6)))
}
