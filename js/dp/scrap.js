// module.exports = {
//   transposeM,
//   addMatrices,
//   subtractMatrices,
//   scaleMatrix,
//   multMatrices
// };

const m = require("../mathy-things/matrices");

//TODO: p 303 matrix chain multiplication
let total = 0;

//ranges
//balla balla
for (let i = 0; true; i = (i + 1) % 10) {
  console.log(i);
  total++;
  if (total > 100) break;
}
