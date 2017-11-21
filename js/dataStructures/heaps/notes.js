/* HEAPS */

//BINARY HEAP
/*
DESCRIPTION:
heaps are trees stored in arrays
they are useful in sorting and in implementing priority queues
*/
/*
BASIC ATTRIBUTES
*/

//length , the length of the array
//heapsize , the number of elements in a heap stored in the array
///// heapsize <= length
//height
////is the longest simple path descending from the root
///specifically the number of edges from root to lowest node
//NOTE: indeed this makes the root at height = 0, which makes the math quite nice

//parent(i)
//leftChild(i)
//rightChild(i)

/*
heapProperty
A[parent(i)] >= A[i]
*/

/*
FUNDAMENTAL OPERATIONS
*/

//HEAPIFY : O(lg n)
//BUILD-HEAP : O( n )
//HEAPSORT
//EXTRACT-MAX
//INSERT
//REMOVE
const util = require("util");
const log = x => console.log(util.inspect(x));

//defaults to max
//min = x => -x
function Heap(scoreFunction = x => x) {
  //remember to ignore index 0
  this.arr = [null];
  this.length = 0;
  this.heapSize = 0;
  this.height = 0;
  this.scoreFunction = scoreFunction;
}
Heap.prototype = {
  parent: function(i) {
    return Math.floor(i / 2);
  },
  leftChild: function(i) {
    return i * 2;
  },
  rightChild: function(i) {
    return i * 2 + 1;
  },
  //getting fancy
  // leaves: function() {
  //   // return an iterator
  //   // return Math.floor(this.h / 2 + 1)
  // },
  // nonLeaves: function() {
  //   //return iterator
  // }
  //ensure that the subtree starting at i
  //maintains the heap property
  heapify: function(i) {
    let leftIdx = this.leftChild(i);
    let rightIdx = this.rightChild(i);

    //here we check the heapProperty
    //find the greatest of the children
    let greatest = i;
    if (
      leftIdx <= this.heapSize &&
      this.scoreFunction(this.arr[leftIdx]) > this.scoreFunction(this.arr[i])
    ) {
      greatest = leftIdx;
    }
    if (
      leftIdx <= this.heapSize &&
      this.scoreFunction(this.arr[rightIdx]) >
        this.scoreFunction(this.arr[greatest])
    ) {
      greatest = rightIdx;
    }
    //heapProperty is violated by i
    if (greatest !== i) {
      //switch the two values
      let tmp = this.arr[i];
      this.arr[i] = this.arr[greatest];
      this.arr[greatest] = tmp;
      //make sure the switched child's tree is heapified
      this.heapify(greatest);
    }
  },
  //build a heap by heapifying from the bottom up
  buildHeap: function(arr) {
    //setup our heap
    this.arr = [null].concat(arr.slice(0));
    this.length = this.arr.length - 1;
    this.heapSize = this.arr.length - 1;
    this.height = Math.floor(Math.log2(this.heapSize));
    //call heapify on all the non-leaves
    for (let i = Math.floor(this.heapSize / 2); i > 0; i--) {
      this.heapify(i);
    }
  },
  // //TODO: rewrite
  remove: function(value) {
    let idx = this.find(value);

    // When it is found, the process seen in 'pop' is repeated
    // to fill up the hole.
    let end = this.arr.pop();
    this.length--;
    this.heapSize--;
    this.setHeight();
    if (this.heapSize + 1 === idx) {
      return;
    }

    //we replace the removed element with the popped
    // one, and allow it to float up or sink down as appropriate.
    this.arr[idx] = end;
    this.bubbleUp(idx);
    this.heapify(idx);
  },
  //TODO: rewrite
  bubbleUp: function(idx) {
    // When at 0, an element can not go up any further.
    if (idx > 1) {
      let el = this.arr[idx];
      let score = this.scoreFunction(el);
      // Compute the parent element's index, and fetch it.
      let parentIdx = this.parent(idx);
      let parentValue = this.arr[parentIdx];
      // If the parent has a lesser score, things are in order and we
      // are done.
      if (score <= this.scoreFunction(parentValue)) return;

      // Otherwise, swap the parent with the current element and
      let tmp = this.arr[idx];
      this.arr[idx] = parentValue;
      this.arr[parentIdx] = tmp;
      this.bubbleUp(parentIdx);
    }
  },
  //remove the root element
  pop: function() {
    if (this.heapSize < 1) return null;
    let top = this.arr[1];
    this.arr[1] = this.arr[this.heapSize];
    // this.arr[1] = this.arr.pop();
    this.heapSize--;
    this.length--;
    this.setHeight();
    this.heapify(1);
  },
  insert: function(value) {
    this.heapSize++;
    this.length++;
    this.arr.push(value);
    this.setHeight();
    this.bubbleUp(this.heapSize);
  },
  find: function(value) {
    for (let i = 1; i <= this.heapSize; i++) {
      if (this.arr[i] === value) return i;
    }
    return false;
  },
  getLevel: function(height) {
    let first = Math.pow(2, height);
    //if the level isn't full then the last idx is this.heapSize
    //otherwise it's one less than the first idx of the next level
    let last = Math.min(this.heapSize, Math.pow(2, height + 1) - 1);
    return this.arr.slice(first, last + 1);
  },
  setHeight: function() {
    this.height = Math.floor(Math.log2(this.heapSize));
  },
  getHeight: function() {
    return Math.floor(Math.log2(this.heapSize));
  },
  printTree: function() {
    console.log("====== PRINTING ======");
    log(this);
    console.log("====== PRINTING ======");
    for (let i = 0; i <= this.getHeight(); i++) {
      log(this.getLevel(i));
    }
  },
  peak: function() {
    return this.arr[1];
  }
};

const test = () => {
  let h = new Heap();
  h.buildHeap([1, 2, 7, 9, 16, 10, 3, 8, 14, 4]);
  h.printTree();
  // h.pop();
  // h.printTree();
  // h.insert(100);
  // h.printTree();
  // h.remove(10);
  // h.printTree();
};
test();
