/*
 * Complete the function below.
 */
const countSquares = str => {
  let arr = str.split(" ");
  let l = parseInt(arr[0]);
  let r = parseInt(arr[1]);
  //the naive way
  let sum = 0;
  for (let i = l; i <= r; i++) {
    if (Number.isInteger(Math.sqrt(i))) sum++;
  }
  return sum;
};
function getMinimumUniqueSum(arr) {
  return arr.map(countSquares);
}

//find lowest square in the range

//find highest sqaure in the range

//compute difference

const findLow = int => {
  return Math.ceil(Math.sqrt(int));
};
const findHigh = int => {
  return Math.floor(Math.sqrt(int));
};

findHigh(r) - findLow(l) + 1;
