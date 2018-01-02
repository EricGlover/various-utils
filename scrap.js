const makeRot13GoCipher = () => {
  str = "map[string]string{";
  const input = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
  const output = `NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm`;
  res = input
    .split("")
    .map((char, i) => {
      return `${output[i].charCodeAt(0)}: ${char.charCodeAt(0)},`;
    })
    .join("");
  console.log(str + res + "}");
};
makeRot13GoCipher();

// const group = chars => {
//   let str = "";
//   for (let i = 0; i < chars.length; i++) {
//     str += chars[i];
//     if (i + 1 % 4 === 0) str += " ";
//   }
//   return str;
// };
// const print = str => {
//   let arr = str.split("").filter(char => /[0-9]/.test(char));
//   if (arr.length > 12) return group(arr);
//   return arr.reduce(
//     (str, char, i) => (i + 1 % 3 === 0 ? (str += ` ${char}`) : (str += char))
//   );
// };
// console.log(print("100a"));
// const t = () => {
//   let [a, b] = [1, 2].map(num => num + 1);
//   console.log(a, b);
// };
// t();

// const minOperations = (a, b) => {
//   let operations = {
//     1: 0,
//     2: 0,
//     5: 0
//   };
//   let max = Math.max(a, b);
//   let min = Math.min(a, b);
//   let difference = max - min;
//   operations[5] = Math.trunc(difference / 5);
//   difference -= operations[5] * 5;
//   operations[2] = Math.trunc(difference / 2);
//   difference -= operations[2] * 2;
//   operations[1] = difference;
//   if (max - min !== operations[5] * 5 + operations[2] * 2 + operations[1] * 1)
//     throw new Error(`a ${a} b${b}`);
//   return {
//     ops: operations[5] + operations[2] + operations[1],
//     added: max - min
//   };
// };
//
// const addCandies = (add, arr, index) => {
//   arr.forEach((el, i) => {
//     if (i !== index) {
//       arr[i] = el + add;
//     }
//   });
//   return arr;
// };
//
// const equal = (n, candies) => {
//   if (candies.length < 2) return 0;
//   let operations = 0;
//   candies.sort((a, b) => b - a);
//   let prev, current;
//   let total = 0;
//   for (let i = 1; i < candies.length; i++) {
//     candies[i] += total;
//     prev = candies[i - 1];
//     current = candies[i];
//     if (prev === current) {
//       continue;
//     }
//     //solve the subproblem, make prev && current equal
//     let { ops, added } = minOperations(prev, current);
//     total += added;
//     // addCandies(added, candies, i);
//     operations += ops;
//   }
//   return operations;
// };
//
// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// var input = "";
// process.stdin.on("data", function(chunk) {
//   input += chunk;
// });
// process.stdin.on("end", function() {
//   input = input.split("\n");
//   const t = input[0];
//   for (let i = 0; i < t; i++) {
//     let n = input[i * 2 + 1];
//     let candies = input[i * 2 + 2].split(" ").map(str => parseInt(str));
//     console.log(equal(n, candies));
//   }
// });
