//grab first thing in unsorted arr, insert appropriately in sorted arr
const insertionSort = arr => {
  //sorted arr starts with index 0
  unsortedIndex = 1;
  //shifting in place
  for (let unsortedIndex = 1; unsortedIndex < arr.length; unsortedIndex++) {
    //grab unsorted
    let unsorted = arr[unsortedIndex];

    //find spot
    for (let sortedIdx = 0; sortedIdx < unsortedIndex; sortedIdx++) {
      if (arr[sortedIdx] < unsorted) {
        //keep looking
      } else if (arr[sortedIdx] >= unsorted) {
        insertInPlace(arr, unsorted, sortedIdx, unsortedIndex);
        break;
      }
    }
  }

  return arr;
};
//mutates
const insertInPlace = (arr, value, startIdx, overwriteIndex) => {
  let tmp;
  let movingValue = value;
  for (let i = startIdx; i < overwriteIndex; i++) {
    tmp = arr[i];
    arr[i] = movingValue;
    movingValue = tmp;
  }
  //insert final value
  arr[overwriteIndex] = tmp;
  return arr;
};

const test = () => {
  console.log(`sorting ${[1, 3, 7, 2, 5]} should output ${[1, 2, 3, 5, 7]} `);
  console.log(insertionSort([1, 3, 7, 2, 5]));
  console.log(insertionSort([1, 3]));
};
// test();

/*
function insert(arr, ringhtIndex, value)
    // value is the value of arr[rightIndex + 1]
    // rightIndex is the furthest right sorted element

    // Step through sorted elements right to left.
    // As long as your value is less than the element
    // at arr[i] and you still have elements
    let i = rightIndex
    while(i >= 0 && arr[i] > value)
        // copy the element
        arr[i + 1] = arr[i]
        i -= 1
    end

    // insert the actual element
    arr[i + 1] = value;
end
*/
module.exports = insertionSort;
