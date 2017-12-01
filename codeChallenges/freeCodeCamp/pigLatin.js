const vowels = new Set(["a", "e", "i", "o", "u"]);
function translatePigLatin(str) {
  if (vowels.has(str[0])) {
    return str + "way";
  }
  let i = str.split("").findIndex(char => {
    return vowels.has(char);
  });
  return str.slice(i) + str.slice(0, i) + "ay";
}

console.log(translatePigLatin("consonant"));
console.log(translatePigLatin("glove"));
