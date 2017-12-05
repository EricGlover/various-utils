//do this without using sets because freeCodeCamp doesn't have them

//given to objs give the sym difference
function diff(a, b) {
  var result = {};
  //take keys that exist in a but not b
  Object.keys(a).forEach(function(key) {
    if (b[key] === undefined) result[key] = a[key];
  });
  //take keys that exist in b but not a
  Object.keys(b).forEach(function(key) {
    if (a[key] === undefined) result[key] = b[key];
  });
  return result;
}
function hashItAll(arr) {
  var h = {};
  console.log(arr);
  arr.forEach(function(num) {
    h[num] = num;
  });
  return h;
}
//args arrays like this : [<Number>, <Number>, ...]
function sym(...args) {
  var symDiff = {};
  var argHashes = args.map(function(arr) {
    return hashItAll(arr);
  });
  var answerHash = argHashes.reduce(function(result, arr) {
    return diff(result, arr);
  });
  return Object.keys(answerHash).map(Number);
}

console.log(sym([1, 2, 3], [5, 2, 1, 4]));
