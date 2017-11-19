const mergeSort = arr => {
  if (arr.length === 1) return arr;
  //split into halves, respect odd arrs
  let left = mergeSort(arr.slice(0, arr.length / 2));
  let right = mergeSort(arr.slice(arr.length / 2));
  let sorted = merge(left, right);
  return sorted;
};

const merge = (arr1, arr2) => {
  // console.log(`arr1 = ${arr1}, arr2 = ${arr2}`);
  //declare space before hand because why not
  let sorted = Array(arr1.length + arr2.length);
  let sortedIdx = 0;

  let i = 0;
  let j = 0;
  //loops ahoy!
  while (i < arr1.length || j < arr2.length) {
    //check if either left or right arr is all used up
    if (i === arr1.length) {
      //left is empty
      while (j < arr2.length) {
        sorted[sortedIdx] = arr2[j];
        j++;
        sortedIdx++;
      }
      break;
    } else if (j === arr2.length) {
      //right is empty
      while (i < arr1.length) {
        sorted[sortedIdx] = arr1[i];
        i++;
        sortedIdx++;
      }
      break;
    }

    //compare arr1[i] and arr2[j] place the smallest
    //of the two on the end of our sorted array

    if (arr1[i] < arr2[j]) {
      sorted[sortedIdx] = arr1[i];
      i++;
      sortedIdx++;
    } else if (arr1[i] > arr2[j]) {
      sorted[sortedIdx] = arr2[j];
      j++;
      sortedIdx++;
    } else {
      //they're equal add them both
      sorted[sortedIdx] = arr1[i];
      i++;
      sortedIdx++;
      sorted[sortedIdx] = arr2[j];
      j++;
      sortedIdx++;
    }
    // console.log(`SORTED =`, sorted);
  }
  // console.log(`RETURNING SORTED`, sorted);
  return sorted;
};

const test = () => {
  console.log(mergeSort([2]));
  console.log(mergeSort([2, 1]));
  // console.log(merge([1, 2], [2, 3]));
  console.log(mergeSort([2, 1, 3]));
  console.log(mergeSort([2, 1, 3, 4]));

  ////
  console.log(`sorting ${[1, 3, 7, 2, 5]} should output ${[1, 2, 3, 5, 7]} `);
  console.log(mergeSort([1, 3, 7, 2, 5]));
};
// test();

const makeRandoArr = (size, range) =>
  Array(size)
    .fill(true)
    .map(() => Math.floor(Math.random() * range));

const benchmark = (operations, size = 2 ** 8) => {
  const randomArr = makeRandoArr(size, 100);

  const start = Date.now();
  for (var i = 0; i < operations; i++) {
    mergeSort(randomArr);
  }
  const total = Date.now() - start;
  console.log(
    `sorted ${operations} arrays of size = ${size} (2^${Math.log2(
      size
    )})\n total time = ${total / 1000} seconds`
  );
  console.log(`first ten of the array is ${randomArr.slice(0, 9)}`);
};
// benchmark(100);
// benchmark(10, 2 ** 100); 2 ** 100 js numbers lose precision

const killComputer = () => {
  for (let i = 0; i < 40; i += 1) {
    benchmark(10, 2 ** i);
  }
};
// killComputer();
module.exports = mergeSort;
/*
function mergeSort(array) {
    // if the array is one element long, just return it

    // mergeSort() the left half of the array

    // mergeSort() the right half of the array

    // merge() the two halves

    // return the merged array
}
*/
