/*  TRIPLE RECURSION  */
//given m and k fill up a 2d matrix according to some rule
//1
const util = require("util");
const printArr = arr => {
  arr.map(row => console.log(row.join(" ")));
};

const tripleRecursion = (n, m, k) => {
  //make a 2d array
  let arr = Array(n)
    .fill(true)
    .map(el => Array(n).fill(m));
  //mutation ftw
  for (var i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (i === 0 && j === 0) {
        arr[i][j] = m;
      } else if (i === j) {
        arr[i][j] = arr[i - 1][j - 1] + k;
      } else if (i > j) {
        arr[i][j] = arr[i - 1][j] - 1;
      } else if (j > i) {
        arr[i][j] = arr[i][j - 1] - 1;
      }
    }
  }
  printArr(arr);
};
tripleRecursion(4, 3, 1);

//
//
// arr = arr.map((row, i, mArr) => {
//   return row.map((el, j, jArr) => {
//     printArr(jArr);
//     if (i === 0 && j === 0) {
//       return m;
//     } else if (i === j) {
//       return mArr[i - 1][j - 1] + k;
//     } else if (i > j) {
//       return mArr[i - 1][j] - 1;
//     } else if (j > i) {
//       return mArr[i][j - 1] - 1;
//     }
//   });
// });
