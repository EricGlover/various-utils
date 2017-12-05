/* DIFF TWO ARRAYS */
/*
Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, return the symmetric difference of the two arrays.
*/

function diffArray(arr1, arr2) {
  var newArr = [];
  var allArr = arr1.concat(arr2);
  newArr = allArr.filter(function(el) {
    if (arr1.includes(el) && arr2.includes(el)) return false;
    return true;
  });
  return newArr;
}
