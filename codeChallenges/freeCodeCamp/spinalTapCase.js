//I don't know what they wanted you to do for
//this problem really
//but .split() works great for everything but
//camelCase so I wrote breakCamelCase to deal
//with it and then split it up with regex
const breakCamelCase = str => {
  let words = [];
  //my method here is a bit garbled, there's some mutation going
  //on and it's generally unsightly
  for (let i = str.length - 1; i >= 0; i--) {
    //if this is the last word
    if (i === 0) {
      words.push(str);
      break;
    }
    //str[i] is lowerCase and str[i+1] is upperCase
    if (/[a-z]/.test(str[i]) && /[A-Z]/.test(str[i + 1])) {
      let word = str.slice(i + 1);
      str = str.slice(0, i + 1);
      words.push(word);
    }
  }
  return words.reverse().join(" ");
};
function spinalCase(str) {
  let s = breakCamelCase(str);
  return s
    .split(/_|-|\s/)
    .map(word => word.toLowerCase())
    .join("-");
}

spinalCase("This Is Spinal Tap");

// breakCamelCase("camelCaseThings");
