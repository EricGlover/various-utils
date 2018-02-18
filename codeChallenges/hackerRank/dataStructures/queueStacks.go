package main

import (
    "fmt"
    "github.com/EricGlover/ds"
)


/* input format
queries
1 x     enqueue
2       dequeue
3       print top
*/
// //an actual queue implementation
// type list []int
// type queue interface {
//   enqueue(int)
//   dequeue(int)
//   print() int
// }
// func (q *list) enqueue(n int) {
//   *q = append(*q, n)
// }
// //add an error
// func (q *list) dequeue() int {
//   if len(*q) < 1 {
//     return 0
//   }
//   tmp := (*q)[0]
//   *q = (*q)[1:]
//   return tmp
// }
// func (q *list) print() int {
//   return (*q)[0]
// }


//queues using two stacks 
// type queue struct {
//   stack1 []int
//   stack2 []int
// }
// func (q *queue) enqueue(n int) {
//   q.stack1 = append(q.stack1, n)
// }
// func (q *queue) switchStacks() {
//   //move stack 1 to stack 2
//   for i := len(q.stack1) - 1; i >= 0; i-- {
//     q.stack2 = append(q.stack2, q.stack1[i])
//   }
//   q.stack1 = make([]int, 0)
// }
// func (q *queue) dequeue() int {
//   if len(q.stack2) == 0 {
//     q.switchStacks()
//   }
//   tmp := q.stack2[len(q.stack2) - 1]
//   q.stack2 = q.stack2[:len(q.stack2) - 1]
//   return tmp
// }
// func (q *queue) print() int {
//   if len(q.stack2) == 0 {
//     if len(q.stack1) == 0 {
//       return 0
//     }
//     q.switchStacks()
//   }
//   return q.stack2[len(q.stack2) - 1]
// }

func main() {
  var queries int
  var c, n int
  q := make(ds.List, 0)
  fmt.Scan(&queries)
  for i := 0; i < queries; i++ {
    fmt.Scan(&c)
    switch c {
    case 1:
      //enqueue
      fmt.Scan(&n)
      q.Enqueue(n)
    case 2:
      //dequeue
      q.Dequeue()
      // fmt.Println(q.dequeue())
    case 3:
      //print
      fmt.Println(q.Peek())
    }
    // fmt.Println(q)
  }
}
