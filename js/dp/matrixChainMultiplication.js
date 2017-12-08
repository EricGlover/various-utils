const assert = require("assert");
/*
page 302 of algos
the problem find the optimal parenthesization of
matrix multiplication that yields the minimum
amount of operations
*/
/*
NOTE: matrix multiplication
matrix A is (p, q)
matrix B is (q, r)
A x B = C
matrix C is (p, r)
scalar multiplication operations involved is p * q * r
*/

//a recursive solution (for testing things)
//i = left index ; j = right index
//compute k where i <= k <= j - 1
//the idea being that you split up the chain into
//two parts : arr[i ... k] && arr[k + 1 ... j]
const check = (arr, i, j) => {
  //base case
  if (i === j) return 0;
  //compute for every choice of k
  let options = [];
  for (let k = i; k < j; k++) {
    let left = check(arr, i, k);
    let right = check(arr, k + 1, j);
    let ops = left + right + arr[i][0] * arr[k][1] * arr[j][1];
    options.push(ops);
  }

  options.sort((a, b) => a - b);
  //save the computed value
  // console.log(options);
  const min = options[0];
  return min;
};

//modified version of check
//where m saves the min ops
//&& where solution saves the optimal values of k
const r = (arr, i, j, m, solution) => {
  //if first call init m and solution
  //then allow them to trickle down
  if (!m) {
    m = Array(j - i + 1)
      .fill(0)
      .map(row => Array(j - i + 1));
  }
  if (!solution) {
    solution = Array(j - i + 1)
      .fill(0)
      .map(row => Array(j - i + 1));
  }
  //base case
  if (i === j) {
    m[i][j] = 0;
    solution[i][j] = 0;
    return [0, i];
  }
  //check if we've already computed arr[i...j]
  if (m[i][j]) return [m[i][j], solution[i][j]];
  //compute for every choice of k
  let currentMin = undefined;
  let bestK = undefined;
  for (let k = i; k < j; k++) {
    //check if we've already computed arr[i..k]
    let left = m[i][k] ? m[i][k] : r(arr, i, k, m, solution)[0];
    //check if we've already computed arr[k+1 ... j]
    let right = m[k + 1][j] ? m[k + 1][j] : r(arr, k + 1, j, m, solution)[0];
    let ops = left + right + arr[i][0] * arr[k][1] * arr[j][1];
    if (!currentMin || ops < currentMin) {
      currentMin = ops;
      bestK = k;
    }
  }
  console.log(currentMin, bestK);
  //save the computed value
  m[i][j] = currentMin;
  //save the k
  solution[i][j] = bestK;
  //TODO: give the solution in a better structure
  return [currentMin, solution];
};

/* bottom up version of the above */
//given an arr of dimensions
//return min operations
const minOps = arr => {
  return 0;
};

const test = () => {
  //just their dimensions
  const m0 = [[30, 35], [35, 15], [15, 5], [5, 10], [10, 20], [20, 25]];
  const a0 = 15125;
  const m1 = [[10, 100], [100, 5], [5, 50]];
  const a1 = 7500;
  let res1 = check(m1, 0, m1.length - 1);
  console.log(res1);
  let res0 = check(m0, 0, m0.length - 1);
  console.log(res0);
  console.log(r(m0, 0, m0.length - 1));
  // assert.ok(minOps(m0) === a0);
};
test();
