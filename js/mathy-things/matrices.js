const util = require("util");
const assert = require("assert");
const print = matrix => {
  console.log("printing matrix");
  matrix.forEach(row => console.log(row));
  console.log("=====================");
};

/*
MATRIX OPERATIONS
TRANSPOSE
INVERSE
DETERMINANT
ADDITION
SUBTRACTION
SCALAR MULTIPLICATION
MULTIPLICATION
DIVISION
*/
//what or why IDK but here it is
//IDENTITY MATRIX
const I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

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
  return m.map(row => row.map(el => el * scalar));
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
//
// const print = matrix => {
//   console.log("printing matrix");
//   matrix.forEach(row => console.log(row));
//   console.log("=====================");
// };
// const t = () => {
//   const m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
//   print(m);
//   for (let j = 0; j < m[0].length; j++) {
//     //make a new matrix
//     //dont include the first row
//     let subM = m.slice(1).map(row => {
//       //don't include the jth col
//       return row.slice(0, j).concat(row.slice(j + 1));
//     });
//     print(subM);
//   }
// };
// t();
//1 dimension
const equal1d = (a1, a2) => {
  if (a1.length === a2.length) {
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

/*
DETERMINANT of m
formula :
| m | (determinant of m)
loop over m[0][j]
  m[0][j] * |m[1][0] ... m[n][j]| * (j + 2) * -1
          //this matrix is all the cols without j
                                  //this sets the first to be pos, and then alternates
*/
const determinant = m => {
  let d = 0;
  if (m.length === 2 && m[0].length === 2) {
    //[a, b]      // a * d - b * c
    //[c, d]
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  }
  for (let j = 0; j < m[0].length; j++) {
    //make a new matrix
    //dont include the first row
    let subM = m.slice(1).map(row => {
      //don't include the jth col
      return row.slice(0, j).concat(row.slice(j + 1));
    });
    //print(subM);
    d += m[0][j] * determinant(subM) * Math.pow(-1, j);
  }
  return d;
};
const minor = m => {
  return m.map((row, i) => {
    return row.map((el, j) => {
      //find determinant of sub matrix that doesn't include row i or col j
      let subM = m
        .slice(0, i)
        .concat(m.slice(i + 1))
        .map(row => {
          return row.slice(0, j).concat(row.slice(j + 1));
        });
      // print(subM);
      return determinant(subM);
    });
  });
};
//return the multiplicative inverse of m
//using the minors, cofactors, adjugate, and determinant method
//step 1 calculate minor(m)
//step 2 : calculate cofactors from minors
//step 3 : transpose cofactors to obtain the adjugate
//step 4 : find the determinant
//step 5 : multiply step 4 by the determinant
const inverse = m => {
  // console.log("finding inverse of");
  // print(m);
  //step 4, find determinant
  //(done early for a possible early return)
  const d = determinant(m);
  // console.log(`determinant = ${d}`);
  //if determinant is 0 then m is singular
  //and can't be inverted (I believe)
  if (d === 0) return undefined;
  //step 1 calculate minor(m)
  const minorM = minor(m);
  // console.log("minor = ");
  // print(minorM);
  const cofactor = minorM.map((row, i) =>
    row.map((el, j) => {
      let idx = i * minorM[0].length + j;
      return el * Math.pow(-1, idx);
    })
  );
  // console.log("cofactor = ");
  // print(cofactor);
  let t = transposeM(cofactor);
  // console.log("transpose = ");
  // print(t);
  //TODO : FIX THE FLOATING POINT ERRORS HERE (1 / d)
  return scaleMatrix(1 / d, t);
};
//TODO : TEST THIS
const divideMatrices = (m1, m2) => {
  let inverse = inverse(m2);
  if (!inverse) return undefined;
  return multMatrices(m1, inverse);
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
const testDeterminant = () => {
  const m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  let res = determinant(m);
  console.log(res); //0 ?
  const m1 = [[4, 6], [3, 8]];
  const a1 = determinant(m1); //14
  assert.equal(a1, 14);
  //−306
};
const testMinor = () => {
  const m = [[3, 0, 2], [2, 0, -2], [0, 1, 1]];
  const a0 = [[2, 2, 2], [-2, 3, 3], [0, -10, 0]];
  // console.log("finding minor of ");
  // print(m);
  const res = minor(m);
  // console.log(a0);
  // console.log(res);
  assert.ok(equal(a0, res));
};

const testInverse = () => {
  //by definition M * M ^ -1  = Identity
  const m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const m0 = [[3, 0, 2], [2, 0, -2], [0, 1, 1]];
  const inverseM = inverse(m);
  const inverseM0 = inverse(m0);
  const ans0 = [[0.2, 0.2, 0], [-0.2, 0.3, 1], [0.2, -0.3, 0]];
  // console.log("inverting m0");
  // print(m0);
  // console.log("inverse = ");
  // print(inverseM0);
  const res = multMatrices(inverseM0, m0);
  assert.ok(equal(res, I));
  // assert.ok(equal(ans0, inverseM0));     //fails due to JS math errors
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
  testDeterminant();
  testMinor();
  testInverse();
};
test();
module.exports = {
  transposeM,
  addMatrices,
  subtractMatrices,
  scaleMatrix,
  multMatrices
};
