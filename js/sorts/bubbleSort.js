//grab first thing in unsorted arr, insert appropriately in sorted arr
//shifts in place
const bubbleSort = arr => {
  //start at left, grab highest, place at end, swapping along the way
  let tmp;
  for (let i = 0; i < arr.length; i++) {
    //arr.length - i as the inner loop condition, because the right side is our sorted arr
    for (let j = 0; j < arr.length - i + 1; j++) {
      if (arr[j] <= arr[j + 1]) {
        //do nothing
      } else if (arr[j] > arr[j + 1]) {
        //swap
        // let tmp = arr[j];
        tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
};

const test = () => {
  console.log(`sorting ${[1, 3, 7, 2, 5]} should output ${[1, 2, 3, 5, 7]} `);
  console.log(bubbleSort([1, 3, 7, 2, 5]));
};
// test();
module.exports = bubbleSort;
