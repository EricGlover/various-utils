/*
OPERATIONS WITH N-DIMENIONSAL MATRICES
*/
// [
// [[1,2,3], [4,5,6], [7,8,9]],
// [ [ 10, 11, 12 ], [ 13, 14, 15 ], [ 16, 17, 18 ] ],
// [ [ 19, 20, 21 ], [ 22, 23, 24 ], [ 25, 26, 27 ] ]
// ]
/*
STATUS
EQUAL ND WORKS
ADDN WORKS
NMAKER DOES NOT
*/

//N - Dimensional Equality checker
const equalND = (m1, m2) => {
  if (m1.length === m2.length) {
    if (m1[0] instanceof Array && m2[0] instanceof Array) {
      return m1.every((row, i) => equalND(row, m2[i]));
    } else {
      return m1.every((el, i) => el === m2[i]);
    }
  }
  return false;
};
//N - Dimensional Matrix addition
const addN = (m1, m2) => {
  if (m1.length === m2.length) {
    if (m1[0] instanceof Array && m2[0] instanceof Array) {
      return m1.map((row, i) => addN(row, m2[i]));
    } else {
      return m1.map((el, i) => el + m2[i]);
    }
  }
  return undefined;
};
//TODO: write something that generalizes functions to apply to N-Dimension Matrices
//fuck... why is this so hard to reason about
//this doesn't work as well as I'd like it too.
const nMaker = fn => {
  const nFn = (m1, m2) => {
    if (m1[0] instanceof Array && m2[0] instanceof Array) {
      return m1.forEach((row, i) => nFn(row, m2[i]));
    } else {
      return fn(m1, m2);
    }
    return undefined;
  };
  return nFn;
};

/* N Dimensional test functions */
const testEqualN = () => {
  const a0 = [1, 2, 3];
  const a1 = [1, 2, 3];
  const a2 = [1, 2, 4];
  const b0 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const b1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const b2 = [[1, 2, 3], [4, 5, 6], [7, 8, 11]];
  const c0 = [
    [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    [[10, 11, 12], [13, 14, 15], [16, 17, 18]],
    [[19, 20, 21], [22, 23, 24], [25, 26, 27]]
  ];
  const c1 = [
    [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    [[10, 11, 12], [13, 14, 15], [16, 17, 18]],
    [[19, 20, 21], [22, 23, 24], [25, 26, 27]]
  ];
  const c2 = [
    [[1, 2, 3], [4, 5, 666], [7, 8, 9]],
    [[10, 11, 12], [13, 14, 15], [16, 17, 1111]],
    [[19, 20, 21], [22, 23, 24], [25, 26, 27]]
  ];
  console.log(equalND(a0, a1));
  console.log(equalND(a0, a2));
  console.log(equalND(b0, b1));
  console.log(equalND(b0, b2));
  console.log(equalND(c0, c1));
  console.log(equalND(c0, c2));
};
testEqualN();
const testAddN = () => {
  const a0 = [1, 2, 3];
  const a1 = [1, 2, 3];
  const a2 = [1, 2, 4];
  const b0 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const b1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const b2 = [[1, 2, 3], [4, 5, 6], [7, 8, 11]];
  const c0 = [
    [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    [[10, 11, 12], [13, 14, 15], [16, 17, 18]],
    [[19, 20, 21], [22, 23, 24], [25, 26, 27]]
  ];
  const c1 = [
    [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    [[10, 11, 12], [13, 14, 15], [16, 17, 18]],
    [[19, 20, 21], [22, 23, 24], [25, 26, 27]]
  ];
  const c2 = [
    [[1, 2, 3], [4, 5, 666], [7, 8, 9]],
    [[10, 11, 12], [13, 14, 15], [16, 17, 1111]],
    [[19, 20, 21], [22, 23, 24], [25, 26, 27]]
  ];
  console.log(addN(a0, a1));
  console.log(addN(a0, a2));
  console.log(addN(b0, b1));
  console.log(addN(b0, b2));
  console.log(addN(c0, c1));
  console.log(addN(c0, c2));
};
testAddN();
