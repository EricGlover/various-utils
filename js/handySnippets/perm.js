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

// console.log(permutations(""));
// console.log(permutations("a"));
// console.log(permutations("ab"));
// console.log(permutations("aa"));
console.log(permutations("abc"));
console.log(permutations("abcd"));

//TODO: NEXT TIME WRITE SOME TESTS FOR THINGS

const filterRepeats = arr => {
  return arr.filter(str => {
    return str.split("").reduce((flag, char, i, str) => {
      if (str[i - 1]) return char !== str[i - 1] && flag;
      return flag;
    }, true);
  });
};
// console.log(noRepeat(["", "a", "aa", "ab", "abc", "abccd"]));
// console.log(noRepeat(""));
// console.log(noRepeat("a"));
// console.log(noRepeat("aa"));
// console.log(noRepeat("ab"));
// console.log(noRepeat("abc"));
// console.log(noRepeat("abccd"));
