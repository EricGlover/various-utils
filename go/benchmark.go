package main

import (
    "fmt"
    "time"
)
//given a function return a wrapped version that
//will print the time taken to execute fn
//return the result of fn
func printTime(fn func(int) ([]int)) (func(int) ([]int)) {
  return func(arg int) ([]int){
    start := time.Now()
    res := fn(arg)
    end := time.Now()
    elapsed := end.Sub(start)
    fmt.Println("elapsed time = ", elapsed)
    return res
  }
}
func main() {
  //
}
