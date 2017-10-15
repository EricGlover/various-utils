const { factorialFraction } = require("../factorials");

/*        utility functions         */
const util = require("util");
const inspect = js => util.inspect(js);
const log = js => console.log(inspect(js));
const tester = (() => {
  let testNum = 1;
  return (jsFunction, testCases, message = "") => {
    console.log(`RUNNING TEST ${testNum++}`);
    process.stdout.write(message);
    if (testCases) log(testCases);
    console.log(`daCode \n${jsFunction.toString()}`);
    console.log(`evaluates to ${jsFunction()}`);
  };
})();
/*        utility functions         */

//permutations
//n! / ( n - k)!
const permutations = (n, k) => {
  return factorialFraction(n, n - k);
};

const test = () => {
  console.log("testing permutations");
  const set = new Set("abcd".split(""));

  let lowercaseChars = new Set();
  for (let i = 97; i < 97 + 26; i++) {
    lowercaseChars.add(String.fromCharCode(i));
  }
  log(lowercaseChars);

  console.log("give me all the 2 - permutations of {a, b, c, d}");
  let l = permutations(set.size, 2);
  console.log(l);
  console.log("give me all the 8 - permutations of chars a-z");
  l = permutations(lowercaseChars.size, 8);
  console.log(l);
};
test();
