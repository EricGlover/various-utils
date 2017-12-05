//solution #1
//I'm a nasty individual
function pairwise(arr, arg) {
  let idxSum = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === arg) {
        idxSum += i + j;
        arr[i] = undefined;
        arr[j] = undefined;
      }
    }
  }
  return idxSum;
}
//TODO: rewrite this nonsense
/*
exceeding odd rules
If multiple pairs are possible that have the same numeric elements
but different indices, return the smallest sum of indices.
Once an element has been used, it cannot be reused to pair with another.
*/
function pairwise(arr, arg) {
  const sorted = arr.map((num, i) => {
    return { i, num, used: false };
  });
  sorted.sort((a, b) => a.num - b.num);
}

pairwise([1, 4, 2, 3, 0, 5], 7);
