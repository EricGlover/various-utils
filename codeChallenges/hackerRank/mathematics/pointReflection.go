package main

import (
    "fmt"
)
//given point p
//and point q
//find r, p reflected over q
func main() {
  var n int
  fmt.Scan(&n)
  var px, py, qx, qy int
  for n > 0 {
    //read the line
    fmt.Scan(&px, &py, &qx, &qy)

    //algo 1
    //find distance p - q
    // dx := qx - px
    // dy := qy - py
    // //make new point from q, add deltas
    // rx := qx + dx
    // ry := qy + dy
    //algo 2, silly me I didn't even think about this
    rx := 2 * qx - px
    ry := 2 * qy - py 
    fmt.Println(rx, ry)
    n--
  }
}
