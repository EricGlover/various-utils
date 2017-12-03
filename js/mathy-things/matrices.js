const util = require("util");
const assert = require("assert");

/*
MATRIX OPERATIONS
TRANSPOSE
ADDITION
SUBTRACTION
SCALAR MULTIPLICATION
MULTIPLICATION
*/

//Aij => Aji
const transposeM = m => {
  //get dimensions
  const rows = m.length;
  const columns = m[0].length;
  //make new matrice
  let transpose = [];
  for (let i = 0; i < columns; i++) {
    transpose[i] = new Array(rows);
  }
  //copy from m to transpose
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      transpose[j][i] = m[i][j];
    }
  }
  return transpose;
};
//TODO: TEST
const addMatrices = (m1, m2) => {
  return m1.map((row, i) => row.map((el, j) => el + m2[i][j]));
};
//TODO: TEST
const subtractMatrices = (m1, m2) => {
  return m1.map((row, i) => row.map((el, j) => el - m2[i][j]));
};
//TODO: TEST
const scaleMatrix = (scalar, m) => {
  return m1.map(row => row.map(el => el * scalar));
};

/*  helper functions for multiplying matrices   */
const dot = (arr1, arr2) => {
  assert.equal(arr1.length, arr2.length); ///otherwise idk man
  return arr1.reduce((total, num1, i) => total + num1 * arr2[i], 0);
};
//grab an array version of a col in a matrix
const getColumn = (m, col) => {
  let arr = [];
  for (let i = 0; i < m.length; i++) {
    arr.push(m[i][col]);
  }
  return arr;
};

//it's the dot product of col m1 and row m2 ???
// m1 dimensions === p * q
// m2 dimensions === q * r
// result dimensions === p * r
const multMatrices = (m1, m2) => {
  let p = m1.length;
  let q = m1[0].length;
  let r = m2[0].length;
  //m1 and m2 need a shared dimension
  if (q !== m2.length) return undefined;

  //make a p * r matrix
  let result = [];
  for (let i = 0; i < p; i++) {
    result[i] = new Array(r);
  }
  //for each row in m1
  //find the dot product of row m1 & col m2
  for (let i = 0; i < p; i++) {
    let row = m1[i];
    //for each col in m2
    for (let j = 0; j < r; j++) {
      //get column of m2
      let col = getColumn(m2, j);
      let product = dot(row, col);
      result[i][j] = product;
    }
  }
  return result;
};

const print = matrix => {
  console.log("printing matrix");
  matrix.forEach(row => console.log(row));
  console.log("=====================");
};

//TODO : write an N - Dimensional Equality checker

//1 dimension
const equal1d = (a1, a2) => {
  if (a1.length === a2.length && a1[0].length === a2[0].length) {
    return a1.every((el, i) => el === a2[i]);
  }
  return false;
};
//2 Dimensions
const equal2d = (m1, m2) => {
  //rows and cols need to be equal
  if (m1.length === m2.length && m1[0].length === m2[0].length) {
    return m1.every((row, i) => row.every((el, j) => el === m2[i][j]));
  }
  return false;
};
const equal = (m1, m2) => {
  //find dimensions
  let d = 0;
  let current = m1;
  while (current instanceof Array) {
    d++;
    current = current[0];
  }
  //pass to appropriate equal function
  if (d === 1) {
    return equal1d(m1, m2);
  } else if (d === 2) {
    return equal2d(m1, m2);
  }
  //////
};
const testColumn = () => {
  const a = [[1, 2, 3], [4, 5, 6]];
  const a0 = [1, 4];
  const a1 = [2, 5];
  const b = [[7, 8], [9, 10], [11, 12]];
  const b0 = [7, 9, 11];
  assert.ok(equal(getColumn(a, 0), a0));
  assert.ok(equal(getColumn(a, 1), a1));
  assert.ok(equal(getColumn(b, 0), b0));
};
/*
TEST SUITE
*/
const testDot = () => {
  const a = [1, 2, 3];
  const b = [7, 9, 11];
  // console.log(dot(a, b)); // => 58;
  assert.equal(58, dot(a, b));
};
const testEqual = () => {
  //2d
  const m1 = [[1, 2, 3], [9, 9, 9]];
  const mClone = [[1, 2, 3], [9, 9, 9]];
  const m2 = [[3, 2], [7, 7, 7, 7]];
  const m4 = [[0, 7, 3], [4, 0, 1]];
  assert.ok(equal(m1, mClone));
  assert.ok(equal(mClone, m1));
  assert.equal(false, equal(m1, m2));
  assert.equal(false, equal(m2, m1));
  assert.equal(false, equal(m1, m4));
  //1d
  const a1 = [1, 2, 3];
  const aClone = [1, 2, 3];
  const a2 = [1];
  const a3 = [3, 3, 3];
  assert.equal(true, equal(a1, aClone));
  assert.equal(false, equal(a1, a2));
  assert.equal(false, equal(a1, a3));
};

const testTranspose = () => {
  const m1 = [[1, 2, 3], [9, 9, 9]];
  const m = [[1, 2, 3], [9, 9, 9]];
  const m2 = [[3, 2], [7, 7, 7, 7]];
  // console.log(`transposing \n${util.inspect(m1)}`);
  print(m1);
  let t = transposeM(m1);
  // console.log(util.inspect(t));
  print(t);
  const m3 = [[0, 4], [7, 0], [3, 1]];
  const a3 = [[0, 7, 3], [4, 0, 1]];
  let ans = transposeM(m3);
  assert.ok(equal(ans, a3));
};
const testAdd = () => {
  const m1 = [[1, 2, 3], [9, 9, 9]];
  const m2 = [[3, 2, 7], [7, 7, 7]];
  console.log(addMatrices(m1, m2));
};
const testMultM = () => {
  const a = [[1, 2, 3], [4, 5, 6]];
  const b = [[7, 8], [9, 10], [11, 12]];
  const ans = [[58, 64], [139, 154]];
  let m = multMatrices(a, b);
  // print(m);
  assert.ok(equal(m, ans));
};
const test = () => {
  const m1 = [[1, 2, 3], [9, 9, 9]];
  const m2 = [[3, 2], [7, 7, 7, 7]];
  ///utilities
  testEqual();
  testDot();
  testColumn();
  //operations
  testAdd(m1, m2);
  testTranspose();
  testMultM();
};
test();
