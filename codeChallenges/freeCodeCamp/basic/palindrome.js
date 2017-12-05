//remove non-alphanumeric chars
//turn all to lowercase
const isAlpha = str => {
  return str
    .split("")
    .filter(function(chr) {
      return /[a-zA-Z0-9]/.test(chr);
    })
    .join("");
};
console.log(isAlpha("as"));
console.log(isAlpha("aS"));
console.log(isAlpha("a1S0"));
console.log(isAlpha("a1S0???"));
console.log(isAlpha("race car"));
function palindrome(str) {
  str = str
    .split("")
    .filter(function(chr) {
      return /[a-zA-Z0-9]/.test(chr);
    })
    .join("")
    .toLowerCase();
  var backwards = str
    .split("")
    .reverse()
    .join("");
  if (backwards === str) return true;
  return false;
}

console.log(palindrome("eye"));
console.log(palindrome("cat"));
console.log(palindrome("tacocat"));
console.log(palindrome("race car"));
