///simple way
function myReplace(str, before, after) {
  return str
    .split(" ")
    .map(word => {
      if (word !== before) return word;
      let l = word.split("")[0];
      let replacement = after;
      if (l.toUpperCase() === l) {
        let chars = replacement.split("");
        chars[0] = chars[0].toUpperCase();
        return chars.join("");
      }
      return after;
    })
    .join(" ");
}

console.log(
  myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped")
);

//regex way
