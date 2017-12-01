//longest word
function findLongestWord(str) {
  return str
    .split(" ")
    .reduce((longest, word) => (longest.length < word.length ? word : longest));
}

findLongestWord("The quick brown fox jumped over the lazy dog");
/*

*/

function truncateString(str, num) {
  if (num <= 3) return str.slice(0, num) + "...";
  if (str.length <= num) return str;
  return str.slice(0, num + 1 - 3) + "...";
}

truncateString("A-tisket a-tasket A green and yellow basket", 11);

/*
chunk array into sub arrays
*/
function chunkArrayInGroups(arr, size) {
  let result = Array(Math.ceil(arr.length / size))
    .fill(Array(size))
    .map((empty, i) => {
      return arr.slice(i * size, i * size + size);
    });
  return result;
}
chunkArrayInGroups(["a", "b", "c", "d"], 2);
/*

*/
// let getChars = str => {
//   return str.split("").reduce((chars, c) => {
//     c = c.toLowerCase();
//     chars[c] = chars[c] ? chars[c]++ : 1;
//     return chars;
//   }, {});
// };
//a is subset of b => true
//b ia subset of a => false
// let isSubset = (a, b) => {
//   console.log(a, b);
//   return Object.entries(a).every(entry => {
//     console.log(entry);
//     return entry[1] >= b[entry[0]];
//   });
// };
// console.log(getChars("dank"));
// console.log(isSubset(getChars("dank"), getChars("Memez")));
// console.log(isSubset(getChars("dank"), getChars("dan")));
// console.log(isSubset(getChars("dan"), getChars("dank")));
// function mutation(arr) {
//   let charCount1 = getChars(arr[0]);
//   let charCount2 = getChars(arr[1]);
// }
//
// mutation(["hello", "hey"]);

//////
let getChars = str => {
  return str.split("").reduce((chars, c) => {
    c = c.toLowerCase();
    chars[c] = chars[c] ? chars[c]++ : 1;
    return chars;
  }, {});
};
//a is subset of b => true
//b ia subset of a => false
let isSubset = (a, b) => {
  return Object.entries(a).every(entry => {
    return entry[1] >= b[entry[0]];
  });
};
function mutation(arr) {
  return isSubset(getChars(arr[1]), getChars(arr[0]));
}
// console.log(mutation(["hello", "hey"]));
//////

function confirmEnding(str, target) {
  return str.substr(str.length - 1 - target.length, target.length) === target;
}

// confirmEnding("Bastian", "n");
//////
//we want to find i such that i <= num;
//and j such that j > num;
// const findIdxLess = (arr, num) => {
//   //binary search
//   let start = Math.floor(arr.length / 2) - 1;
//   let i = arr[start];
//   let j = arr[start + 1];
//   if(i <= num && j > num){
//
//   }
//   if(arr[start] > num){
//
//   }else if (arr[start] < num){
//
//   }else if (arr[start] === num){
//
//   }
// }
// function getIndexToIns(arr, num) {
//   arr.sort();
//   for (let i = arr.length; i > -1; i--) {
//     if (arr[i] < num) return i;
//   }
//   return 0;
// }
//naive approach
function getIndexToIns(arr, num) {
  arr.sort((a, b) => a - b);
  console.log(arr);
  for (let i = arr.length - 1; i > -1; i--) {
    if (arr[i] < num) return i + 1;
  }
  return 0;
}

console.log(getIndexToIns([5, 3, 20, 3], 5));
// console.log(getIndexToIns([40, 60], 50));

//////

function rot13(str) {
  // LBH QVQ VG!
  const low = "A".charCodeAt(0);
  const high = "Z".charCodeAt(0);
  console.log(low, high);
  const shift = 13;
  return str
    .split("")
    .map(char => {
      if (!/[A-Z]/.test(char)) return char;
      let n = char.charCodeAt(0);
      let l = n - shift;
      if (l < low) {
        l = high - (low - l) + 1;
      }
      return String.fromCharCode(l);
    })
    .join("");
}

// Change the inputs below to test
console.log(rot13("SERR PBQR PNZC"));

//////

//////

//////

//////

//////

//////

//////

//////

//////

//////

//////

//////

//////

//////

//////

//////
