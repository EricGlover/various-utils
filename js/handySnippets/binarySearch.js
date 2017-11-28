const a = [1, 2, 3, 4];
const d = [1, 2, 3, 4, 5];
const b = [1, 10, 100, 200];
const c = [2, 3, 5, 7, 11, 13, 17, 19, 23];

//assume arr is sorted of course
const bin = (arr, num) => {
  // console.log(arr, num);
  let i = Math.ceil(arr.length / 2) - 1;
  // console.log(i);
  if (arr[i] === num) return i;
  if (arr.length < 1) return undefined;
  if (arr[i] > num) {
    return bin(arr.slice(0, i), num);
  } else {
    // console.log(i);
    let answer = bin(arr.slice(i + 1), num);
    if (answer !== undefined) return i + answer + 1;
    return answer;
  }
};

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
