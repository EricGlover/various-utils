//algo
//pick a pivot point (the rightmost element)
//loop through arr,
//if arr[i] >  pivot put after pivot
//else arr[i] is less than pivot, put before pivot
//now break it into sub arrs, and recurse on those

//[less than pivot | pivot | greater than pivot | unsorted ]
//[less than pivot | pivot | greater than pivot | unsorted | pivot values ]

//pivot is not actually in the middle, it's the index of the first of the
//greater than pivot section which you swap with the pivot later
//store equal to pivot values at the end

//TODO: add a equal to pivot partition
//TODO: pick a pivot point more intelligently

//not doing things in place
const quicksort = arr => {
  // console.log("starting new sort of ", arr);
  if (arr.length <= 1) return arr;

  let pivot = arr[arr.length - 1];
  let pivotIdx = 0;
  let pivotLength = 1;
  for (let i = 0; i < arr.length - pivotLength; i++) {
    debugger;
    if (arr[i] > pivot) {
      //do nothing since it's already in the current part
    } else if (arr[i] < pivot) {
      //throw it in the sorted-lowerside
      let tmp = arr[pivotIdx];
      arr[pivotIdx] = arr[i];
      arr[i] = tmp;
      pivotIdx++;
    } else if (arr[i] === pivot) {
      debugger;
      //swap the equal value with the last unsorted value
      arr[i] = arr[arr.length - 1 - pivotLength];
      arr[arr.length - 1 - pivotLength] = pivot;
      pivotLength++;
      i--; //run over the value we swapped on the next iteration
      //new bug [2,2]
      //[2,3,2]
    }
  }
  //move the pivot into appropriate location
  //and all it's equivalent values
  // console.log("arr = ", arr);
  let currentPivotIdx = pivotIdx - 1;
  for (let i = 0; i < pivotLength; i++) {
    currentPivotIdx++;
    arr[arr.length - pivotLength] = arr[currentPivotIdx];
    arr[currentPivotIdx] = pivot;
    pivotLength--;
  }
  //currentPivotIdx now = last pivotIdx
  // console.log("arr after pivot swap = ", arr);

  //split, slicin for the moment, don't judge me
  // console.log("left", arr.slice(0, pivotIdx));
  // console.log("right", arr.slice(currentPivotIdx + 1));
  let left = quicksort(arr.slice(0, pivotIdx));
  let right = quicksort(arr.slice(currentPivotIdx + 1));

  return left.concat(arr.slice(pivotIdx, currentPivotIdx + 1)).concat(right);
};

//SOME HELPER FUNCTIONS
const makeRandoArr = (size, range) =>
  Array(size)
    .fill(true)
    .map(() => Math.floor(Math.random() * range));
const checkSort = arr => {
  if (arr.length < 15) {
    console.log(
      `arr of size ${arr.length}, arr after sort = ${arr}, sorted = ${isSorted(
        arr
      )[0]}`
    );
  } else {
    console.log(`arr of size ${arr.length} sorted = ${isSorted(arr)[0]}`);
  }
};
//JS SORT FAILS????
////THE JS SORTING METHOD IS UNSTABLE I GUESS
// const isSorted = arr => {
//   let sorted = arr.slice();
//   sorted.sort((a, b) => a - b);
//   for (let i = 0; i < sorted.length; i++) {
//     if (sorted[i] !== arr[i]) return [false, sorted];
//   }
//   return [true, null];
// };
const isSorted = arr => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return [false, null];
    }
  }
  return [true, null];
};

//TESTING FUNCTIONS
////BENCHMARK RUNS UNTIL SOMETHING FAILS
const breakThings = () => {
  let lastWasSorted = true;
  let exp = 4;
  let arr;
  let sorted;
  let jsSort;
  while (lastWasSorted) {
    console.log("=============SORTING SIZE 2^", exp, " ================");
    arr = makeRandoArr(2 ** exp, 100);
    // console.log("attempting to sort ", arr);
    sorted = quicksort(arr.slice());
    // console.log("arr = ", arr, "sorted = ", sorted);
    [lastWasSorted, jsSort] = isSorted(sorted);
    checkSort(sorted);
    exp++;
  }
  console.log("heres where we goofed up");
  console.log("arr");
  console.log(arr);
  console.log("our sort");
  console.log(sorted);
  console.log("jsSort");
  console.log(jsSort);
};
breakThings();
const test = () => {
  const testCases = [
    [1],
    [1, 3],
    [2, 3, 2],
    [2, 2],
    [1, 2, 3],
    [1, 3, 2],
    [1, 3, 7, 2, 5],
    makeRandoArr(10, 10),
    makeRandoArr(10, 1000),
    makeRandoArr(100, 1000),
    makeRandoArr(500, 1000),
    makeRandoArr(1000, 10),
    makeRandoArr(1000, 1000),
    makeRandoArr(2 ** 8, 100)
  ];
  const previouslyFailed = [
    [2, 2],
    [2, 3, 2],
    [95, 37, 79, 43, 52, 33, 94, 17, 87, 72, 26, 50, 79, 19, 69, 22],
    [47, 45, 72, 46, 82, 89, 12, 36, 17, 41, 5, 53, 62, 35, 0, 5],
    [2, 45, 76, 14, 20, 12, 21, 26, 9, 36, 17, 45, 43, 94, 35, 32]
  ];
  console.log("running previously failed tests");
  previouslyFailed.forEach(arr => checkSort(quicksort(arr)));
  console.log("running some tests");
  testCases.forEach(arr => checkSort(quicksort(arr)));
};
test();

module.exports = quicksort;
