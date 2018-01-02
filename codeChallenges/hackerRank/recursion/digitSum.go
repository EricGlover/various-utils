package main

import (
  "fmt"
  "math"
  "strconv"
)

func numDigits(num int) int {
  d := int(math.Ceil(math.Log10(float64(num + 1))))
  if d < 1 {
    return 1
  }
  return d
}
//option 2, the silly way
// func numDigits(num int) int {
//   digits := 1
//   for {
//     num /= 10
//     if num == 0 {
//       break
//     }
//     digits++
//   }
//   return digits
// }
//
// func sumDigits(num int) int {
//   sum := 0
//   for num != 0 {
//     d := sum % 10
//     sum += d
//     num /= 10
//   }
//   return sum
// }
func sumK(num, k int) int {
  sum := 0
  for num != 0 {
    d := num % 10
    sum += d * k
    num /= 10
  }
  return sum
}

func main() {
  var n, k string
  // fmt.Scanf("%d %d", &n, &k)
  fmt.Scanf("%s %s", &n, &k)
  // num := sumK(n, k)
  // for numDigits(num) != 1 {
  //   num = sumK(num, 1)
  // }
  // fmt.Println(num)
  for _, char := range n {
    fmt.Printf("%s", strconv.Atoi(string(char))[0])
  }
}
