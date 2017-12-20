/*
just translating Arash Partow's hash functions
into JS
********* not original to me obvi *********
*/

//this seems problematic for JS
const rsHash = (str, len = str.length) => {
  let a = 63689;
  let b = 378551;
  return str.split("").reduce((hash, letter) => {
    a *= b;
    return hash * a + letter.charCodeAt(0);
  }, 0);
};

const bkdrHash = str => {
  let seed = 131;
  return str.split("").reduce((hash, letter) => {
    return hash * seed + letter.charCodeAt(0);
  }, 0);
};

const jsHash = str => {
  const initValue = 1315423911;
  return str.split("").reduce((hash, letter) => {
    const thing = (hash << (5 + letter.charCodeAt(0) + hash)) >> 2;
    return Math.pow(hash, thing);
  }, initValue);
};

module.exports = {
  rsHash,
  bkdrHash,
  jsHash
};

//TODO: write some tests
//test functions
