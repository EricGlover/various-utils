package main

//TODO : extend this to n choose k instead of just n choose 2
//TODO: figure out c2
//TODO: write a thorough test spec for n choose k

import (
    "fmt"
    "math"
)
/// n choose 2
/// n * (n-1) / 2!
//because (n-2)! on top is cancelled out
func c0 (n int, k int) (int) {
  if n < k {
    return 0
  }
  combo := n * (n - 1) / 2
  return combo
}
// func c1 (n int, k int) (int) {
//   var combo int
//   return combo
// }
/* seems to work */
/* hackerRank suggested method */
func c2 (n int, k int) (int) {
  if n < k {
    return 0
  }
  combo := 1
  r := int(math.Min(float64(k), float64(n - k)))
  for i := r ; i >= 1; i-- {
    combo = combo * n
    combo /= i
    n--
  }
  return combo
}

//combinatorial problem
//n choose 2
func nChooseK(n int, k int) (int) {
  //wrapper for different implementations
  fn := c2
  combo := fn(n, k)
  return combo
}
func main() {
  // var cases, n int
  // fmt.Scan(&cases)
  // for cases > 0 {
  //   fmt.Scan(&n)
  //   result := nChooseK(n, 2)
  //   fmt.Println(result)
  //   cases--
  // }
  test()
}
//test an implementation against a known solution (c2)
func test(){
  fn := c0
  res0 := fn(2, 2)
  ans0 := c2(2, 2)
  if res0 != ans0 {
    fmt.Println("false")
  }
  res1 := fn(10, 2)
  ans1 := c2(10, 2)
  if res1 != ans1 {
    fmt.Println("false", res1, ans1)
  }
}
