const util = require("util");
let map = Object.create(null);
let t = {};
// let n = Object.create();
t["thing"] = "dnak";
console.log("map = ", util.inspect(map));
for (let key in map) {
  console.log(key);
}
for (let key in t) {
  console.log(key);
}
// for (let key in n) {
//   console.log(key);
// }
// for (let key of Object.keys(map)) {
//   console.log(key);
// }
for (let key in t) {
  console.log(t[key]);
}
let arr = [1, 2, 3];
let arr2 = [1, 2, 3];
let m = new Map();
console.log(util.inspect(m));
m.set(arr, "arr");
console.log(util.inspect(m));
m.set(arr2, "arr2");
console.log(util.inspect(m));
