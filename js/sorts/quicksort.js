//RECURSIVE
const quicksort = arr => {
  if (arr.length <= 1) return arr;

  let pivot = arr[arr.length - 1];
  let pivotIdx = 0;
  let pivotLength = 1;
  for (let i = 0; i < arr.length - pivotLength; i++) {
    if (arr[i] > pivot) {
      //do nothing since it's already in the current part
    } else if (arr[i] < pivot) {
      //throw it in the sorted-lowerside
      let tmp = arr[pivotIdx];
      arr[pivotIdx] = arr[i];
      arr[i] = tmp;
      pivotIdx++;
    } else if (arr[i] === pivot) {
      //swap the equal value with the last unsorted value
      arr[i] = arr[arr.length - 1 - pivotLength];
      arr[arr.length - 1 - pivotLength] = pivot;
      pivotLength++;
      i--; //run over the value we swapped on the next iteration
    }
  }
  //move the pivot into appropriate location
  //and all it's equivalent values
  let currentPivotIdx = pivotIdx - 1;
  for (let i = 0; i < pivotLength; i++) {
    currentPivotIdx++;
    arr[arr.length - pivotLength] = arr[currentPivotIdx];
    arr[currentPivotIdx] = pivot;
    pivotLength--;
  }
  //currentPivotIdx now = last pivotIdx

  //split, slicin for the moment, don't judge me
  let left = quicksort(arr.slice(0, pivotIdx));
  let right = quicksort(arr.slice(currentPivotIdx + 1));

  return left.concat(arr.slice(pivotIdx, currentPivotIdx + 1)).concat(right);
};
