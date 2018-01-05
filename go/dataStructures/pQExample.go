//straight up ripped this example from the go docs

// This example demonstrates a priority queue built using the heap interface.
package main

import (
	"container/heap"
	"fmt"
  "github.com/EricGlover/dataStructures/Queue"
)

// This example creates a PriorityQueue with some items, adds and manipulates an item,
// and then removes the items in priority order.
func main() {
	// Some items and their priorities.
	items := map[string]int{
		"banana": 3, "apple": 2, "pear": 4,
	}

	// Create a priority queue, put the items in it, and
	// establish the priority queue (heap) invariants.
	pq := make(Queue.PriorityQueue, len(items))
	i := 0
	for v, priority := range items {
		pq[i] = &Queue.Item{
			Value:    v,
			Priority: priority,
			Index:    i,
		}
		i++
	}
	heap.Init(&pq)

	// Insert a new item and then modify its priority.
	item := &Queue.Item{
		Value:    "orange",
		Priority: 1,
	}
	heap.Push(&pq, item)

	// Take the items out; they arrive in decreasing priority order.
	for pq.Len() > 0 {
		item := heap.Pop(&pq).(*Queue.Item)
		fmt.Printf("%.2d:%s ", item.Priority, item.Value)
	}
}
