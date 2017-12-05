/*jshint esversion: 6 */
function permAlone(str) {
  //if all chars in string are the same return 0
  let letters = str.split("");
  let charsAreSame = letters.every((char, i, str) => {
    if (str[i - 1]) {
      return char === str[i - 1];
    } else {
      return true;
    }
  });
  if (charsAreSame) return 0;
  let allPerms = [];
  for (let i = 0; i < letters.length; i++) {
    for (let j = i; j < letters.length; j++) {}
  }
  return str;
}
const perm = (str, current, remaining) => {
  let last = current[current.length - 1];
  //base case
  if (remaining.length === 1) {
    console.log(current, remaining);
    console.log(last);
    if (remaining[0] !== last) return current + remaining[0];
    return undefined;
  }
  // let letters = str.split("");
  let allPerms = [];
  remaining.forEach((letter, i) => {
    //if letter same as last then skip
    if (last === letter) return;
    //remove letter
    let remainingLetters = remaining.slice(0, i).concat(remaining.slice(i + 1));
    // console.log(remainingLetters);
    // perms += perm(letter, letter, remaining);
    let perms = perm(str, current + letter, remainingLetters);
    // console.log(perms);
    if (perms) allPerms.push(perms);
  });
  return allPerms;
};
const t = str => {
  let letters = str.split("");
  let perms = 0;
  let allPerms = [];
  letters.forEach((letter, i) => {
    //remove letter
    let remaining = letters.slice(0, i).concat(letters.slice(i + 1));
    // console.log(remaining);
    // perms += perm(letter, letter, remaining);
    let perms = perm(str, letter, remaining);
    // console.log(perms);
    if (perms) {
      allPerms = allPerms.concat(perms);
    }
  });
  return allPerms.length;
};
console.log("perms of aba");
console.log(t("aba"));
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
