const a = [1, 2, 3, 4];
const d = [1, 2, 3, 4, 5];
const b = [1, 10, 100, 200];
const c = [2, 3, 5, 7, 11, 13, 17, 19, 23];

//assume arr is sorted of course
//binary search a sorted array with some slicing and recursion
const bin = (arr, num) => {
  let i = Math.ceil(arr.length / 2) - 1;
  //if found
  if (arr[i] === num) return i;
  //if not in the array
  if (arr.length < 1) return undefined;
  //else keep looking
  if (arr[i] > num) {
    return bin(arr.slice(0, i), num);
  } else {
    let answer = bin(arr.slice(i + 1), num);
    if (answer !== undefined) return i + answer + 1;
    return answer;
  }
};
//l = left index
//r = right index
//both inclusive
//binary search a sorted array without slicing (still recursive)
const bin = (arr, num, l = 0, r = arr.length - 1) => {
  //length of subarr = r + 1 - l
  //middle index of subarr = Math.ceil(subarr.length / 2) + 1
  //in terms of arr's index that = middle index + l
  let k = Math.ceil((r + 1 - l) / 2) - 1 + l;
  //if found
  if (arr[k] === num) return k;
  //if not in array
  if (r - l === 0) return undefined;
  //else keep looking
  if (arr[k] > num) {
    return bin(arr, num, l, k - 1);
  } else {
    return bin(arr, num, k + 1, r);
  }
};

//TODO: BINARY SEARCH WITH TAIL CALL OPTIMIZED RECURSION
//TODO: BINARY SEARCH WITHOUT THE RECURSION (JUST USE A WHILE LOOP)

const test = () => {
  const assert = require("assert");
  assert.ok(bin(a, 1) === 0);
  // console.log(bin(a, 3));
  // console.log(bin(a, 4));
  assert.ok(bin(a, 13.4) === undefined);
  assert.ok(bin(c, 11), 4);
  assert.equal(bin(c, 0), undefined);
  a.forEach((num, i, arr) => assert.equal(bin(arr, num), i));
  b.forEach((num, i, arr) => assert.equal(bin(arr, num), i));
  c.forEach((num, i, arr) => assert.equal(bin(arr, num), i));
  d.forEach((num, i, arr) => assert.equal(bin(arr, num), i));
};
test();
