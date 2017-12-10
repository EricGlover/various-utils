let sArr = [1, 2, 3];
function recursion(start, i) {
  let all = [start];
  // looking over all rest values of array
  for (var j = i; j < sArr.length; j++) {
    all = all.concat(recursion(start + sArr[j], j + 1));
  }
  return all;
}
console.log(recursion(0, 0));
