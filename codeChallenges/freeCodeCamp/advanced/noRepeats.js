/*jshint esversion: 6 */
// function permAlone(str) {
//   //if all chars in string are the same return 0
//   let letters = str.split("");
//   //abort mission if all letters are the same
//   let charsAreSame = letters.every((char, i, str) => {
//     if (str[i - 1]) {
//       return char === str[i - 1];
//     } else {
//       return true;
//     }
//   });
//   if (charsAreSame) return 0;
//   // let allPerms = [];
//   // for (let i = 0; i < letters.length; i++) {
//   //   for (let j = i; j < letters.length; j++) {}
//   // }
//   // return str;
// }
// const perm = (str, current, remaining) => {
//   let last = current[current.length - 1];
//   //base case
//   if (remaining.length === 1) {
//     console.log(current, remaining);
//     console.log(last);
//     if (remaining[0] !== last) return current + remaining[0];
//     return undefined;
//   }
//   // let letters = str.split("");
//   let allPerms = [];
//   remaining.forEach((letter, i) => {
//     //if letter same as last then skip
//     if (last === letter) return;
//     //remove letter
//     let remainingLetters = remaining.slice(0, i).concat(remaining.slice(i + 1));
//     // console.log(remainingLetters);
//     // perms += perm(letter, letter, remaining);
//     let perms = perm(str, current + letter, remainingLetters);
//     // console.log(perms);
//     if (perms) allPerms.push(perms);
//   });
//   return allPerms;
// };
// const t = str => {
//   let letters = str.split("");
//   let perms = 0;
//   let allPerms = [];
//   letters.forEach((letter, i) => {
//     //remove letter
//     let remaining = letters.slice(0, i).concat(letters.slice(i + 1));
//     // console.log(remaining);
//     // perms += perm(letter, letter, remaining);
//     let perms = perm(str, letter, remaining);
//     // console.log(perms);
//     if (perms) {
//       allPerms = allPerms.concat(perms);
//     }
//   });
//   return allPerms.length;
// };
// console.log("perms of aba");
// console.log(t("aba"));
// console.log(t("ab"));
/*
a
  ab
    aba
  !aa
b
  ba
    !baa
  ba
    !baa
a
  ab
    aba
  !aa
*/
// console.log(permAlone("zzzzzzzz"));
// permAlone("aab");
// console.log(permAlone("abc"));
/*
abc
acb

bac
bca

cba
cab
*/
/*
STANK NASTY SOLUTION
*/
/*
const filterRepeats = arr => {
  return arr.filter(str => {
    return str.split("").reduce((flag, char, i, str) => {
      if (str[i - 1]) return char !== str[i - 1] && flag;
      return flag;
    }, true);
  });
};
//given str find all the permutations of str length str.length
//recursive solution
const permutations = str => {
  let letters = str.split("");
  let startingStr = "";
  //returns an arr of perms
  const recursePerm = (letters, str = "") => {
    //base case
    if (letters.length === 1) {
      return [str + letters[0]];
    } else if (letters.length < 1) {
      return [str];
    }
    //
    return letters.reduce((allPerms, letter, i) => {
      let remaining = letters.slice(0, i).concat(letters.slice(i + 1));
      let newPerms = recursePerm(remaining, str + letter);
      allPerms = allPerms.concat(newPerms);
      return allPerms;
    }, []);
  };
  return recursePerm(letters, startingStr);
};


function permAlone(str) {
  return filterRepeats(permutations(str)).length;
}

permAlone('aab');

*/
// //without the filter
//
// //given str find all the permutations of str length str.length
// //recursive solution
// const permutations = str => {
//   let letters = str.split("");
//   let startingStr = "";
//   //returns an arr of perms that don't contain repeats
//   const recursePerm = (letters, str = "") => {
//     //base case
//     if (letters.length === 1) {
//       return [str + letters[0]];
//     } else if (letters.length < 1) {
//       return [str];
//     }
//     //don't allow repeats
//     let last = str[str.length - 1];
//     return letters.reduce((allPerms, letter, i) => {
//       if (letter === last) return allPerms;
//       let remaining = letters.slice(0, i).concat(letters.slice(i + 1));
//       //if the current letter is the same as the only remaining letter
//       //skip it
//       if (remaining.length === 1 && remaining[0] === letter) return allPerms;
//       //else do the permutations
//       let newPerms = recursePerm(remaining, str + letter);
//       allPerms = allPerms.concat(newPerms);
//       return allPerms;
//     }, []);
//   };
//   return recursePerm(letters, startingStr);
// };
//
// function permAlone(str) {
//   return permutations(str).length;
// }
//
// console.log(permAlone("aab"));

/*
attempt 3
without the recursion and the actual computation of values
*/

///

///

///

///

///

///

///

///
