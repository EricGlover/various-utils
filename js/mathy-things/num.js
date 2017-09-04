//take a 2^n and convert it to 10^x

const twoToScience = n => {
  const num = 2 ** n;
  if (Number.MAX_SAFE_INTEGER <= num) return new Error("n too large");
  return Math.log10(num);
};
