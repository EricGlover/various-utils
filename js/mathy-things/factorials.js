const factorial = n => {
  let fact = 1;

  for (let i = 1; i <= n; i++) {
    fact *= i;
  }
  return fact;
};
// function factorialize(n) {
//   var fact = 1;
//   for (var i = 1; i <= n; i++) {
//     fact *= i;
//   }
//   return fact;
// }
//4! / 2!  n = 4, d = 2
const factorialFraction = (n, d) => {
  let fact = 1;
  for (let i = n; i > d; i--) fact *= i;
  return fact;
};

const test = () => {
  console.log(factorial(0));
  console.log(factorial(1));
  console.log(factorial(2));
  console.log(factorial(3));
  console.log(factorial(4));
  //factorial fraction
  console.log("testing factorial fraction");
  console.log(factorialFraction(2, 1));
  console.log(factorialFraction(3, 2));
  console.log(factorialFraction(4, 2));
  // console.log(factorial(4, 2));
  // console.log(factorial(4, 2));
};
// test();
module.exports = {
  factorial,
  factorialFraction
};
