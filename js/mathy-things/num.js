//take a 2^n and convert it to 10^x

const twoToScience = n => {
  const num = 2 ** n;
  if (Number.MAX_SAFE_INTEGER <= num) return new Error("n too large");
  return Math.log10(num);
};

const sumToN = n => n * (n + 1) / 2;
/* without es6 */
function sumToN(n) {
  return n * (n + 1) / 2;
}
