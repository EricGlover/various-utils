/*
bloom filter experiment
let's use three hash functions
and an array size n
*/

function BloomFilter(n = 100) {
  this.arr = Array(100).fill(false);
  this.size = n;
}

BloomFilter.prototype = {
  has: function(word) {
    //check our arr at every index, if all are true then
    //it may be in the set, otherwise it's definitely not in the set
    return this.hash(word).every(index => this.arr[index]);
  },
  add: function(word) {
    //
    this.hash(word).forEach(index => (this.arr[index] = true));
    return word;
  },
  hash: function(word) {
    //hash returns [index1, index2, index3] for a word
    ///setup our hash functions
    const {
      bkdrHash,
      jsHash
    } = require("../../../hashFunctions/generalHashFunctions.js");
    //the simple custom one I could remember
    //sum of
    const hash1 = word => {
      let sum = word
        .split("")
        .reduce((sum, letter) => sum + letter.charCodeAt(0), 0);
      return sum % this.size;
    };
    //stolen hash functions ftw
    const hash2 = word => bkdrHash(word) % this.size;
    const hash3 = word => jsHash(word) % this.size;
    const hashFns = [hash1, hash2, hash3];
    //hash it, ship it
    return hashFns.map(hashFn => hashFn(word));
  }
};

////
const testBloom = () => {
  const b = new BloomFilter();
  p(b.hash("dank"));
  p(b.has("dank"));
  b.add("dank");
  p(b.has("dank"));
};
testBloom();

