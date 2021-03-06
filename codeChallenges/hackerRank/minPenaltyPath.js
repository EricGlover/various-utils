/*  HEAP  */
//Add – Inserts an element into the heap, putting the element into the correct ordered location.
//Pop – Pops the top element from the heap, the top element will either be the highest or lowest element, depending on implementation.
//Top – Returns the top element on the heap.
//Empty – Tests if the heap is empty or not.

function BinaryHeap(scoreFunction) {
  this.content = [];
  this.scoreFunction = scoreFunction;
}

//find the index of the last element in the tree
const getIdx = level => {
  let idx = 0;
  for (let i = 0; i <= level; i++) {
    idx += 2 ** i;
  }
  return idx - 1;
};
// console.log(getIdx(0));
// console.log(getIdx(1));
// console.log(getIdx(2));

BinaryHeap.prototype = {
  push: function(element) {
    // Add the new element to the end of the array.
    this.content.push(element);
    // Allow it to bubble up.
    this.bubbleUp(this.content.length - 1);
  },
  print: function() {
    let level = 0;
    var str = "";
    for (let i = 0; i < this.content.length; i++) {
      str += " " + this.content[i];
      if (getIdx(level) === i) {
        str += "\n";
        level++;
      }
    }
    console.log(str);
  },
  pop: function() {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it sink down.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result;
  },

  remove: function(node) {
    var length = this.content.length;
    // To remove a value, we must search through the array to find
    // it.
    for (var i = 0; i < length; i++) {
      if (this.content[i] != node) continue;
      // When it is found, the process seen in 'pop' is repeated
      // to fill up the hole.
      var end = this.content.pop();
      // If the element we popped was the one we needed to remove,
      // we're done.
      if (i == length - 1) break;
      // Otherwise, we replace the removed element with the popped
      // one, and allow it to float up or sink down as appropriate.
      this.content[i] = end;
      this.bubbleUp(i);
      this.sinkDown(i);
      break;
    }
  },

  size: function() {
    return this.content.length;
  },

  bubbleUp: function(n) {
    // Fetch the element that has to be moved.
    var element = this.content[n],
      score = this.scoreFunction(element);
    // When at 0, an element can not go up any further.
    while (n > 0) {
      // Compute the parent element's index, and fetch it.
      var parentN = Math.floor((n + 1) / 2) - 1,
        parent = this.content[parentN];
      // If the parent has a lesser score, things are in order and we
      // are done.
      if (score >= this.scoreFunction(parent)) break;

      // Otherwise, swap the parent with the current element and
      // continue.
      this.content[parentN] = element;
      this.content[n] = parent;
      n = parentN;
    }
  },

  sinkDown: function(n) {
    // Look up the target element and its score.
    var length = this.content.length,
      element = this.content[n],
      elemScore = this.scoreFunction(element);

    while (true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) * 2,
        child1N = child2N - 1;
      // This is used to store the new position of the element,
      // if any.
      var swap = null;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N],
          child1Score = this.scoreFunction(child1);
        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore) swap = child1N;
      }
      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N],
          child2Score = this.scoreFunction(child2);
        if (child2Score < (swap == null ? elemScore : child1Score))
          swap = child2N;
      }

      // No need to swap further, we are done.
      if (swap == null) break;

      // Otherwise, swap and continue.
      this.content[n] = this.content[swap];
      this.content[swap] = element;
      n = swap;
    }
  }
};

//TODO : write a spec script for this
const test = () => {
  let heap = new BinaryHeap(x => x);
  let a = [10, 3, 4, 8, 2, 9, 7, 1, 2, 6, 5];
  a.forEach(num => heap.push(num));
  heap.print();
  console.log(`popping ${heap.pop()}`);
  heap.print();
  console.log(`popping ${heap.pop()}`);
  heap.print();
  console.log(`popping ${heap.pop()}`);
  heap.print();
  console.log(`popping ${heap.pop()}`);
  heap.print();
};
test();
