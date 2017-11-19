//HASH TABLE

//some needed data types for our hashtable
const LinkedList = require("./linkedLists");
function DictionaryEntry(word, definition) {
  this.word = word;
  this.definition = definition;
}
DictionaryEntry.prototype.toString = function() {
  return `${this.word}: ${this.definition}`;
};

function HashTable(dictionaryFile, numBuckets = 26, wordCount) {
  //STARTUP
  let buckets = Array(numBuckets).fill(null);

  //HASH FUNCTIONS
  const oldHash = word => {
    return word.toLowerCase().charCodeAt(0) - 97;
  };
  const newHash = word => {
    const charCodeSum = word
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return charCodeSum % numBuckets;
  };
  const hash = word => {
    return newHash(word);
  };

  //NOTE: consider inserting them in alphabetical order
  //INSERT A VALUE INTO THE HASHMAP
  const insert = (word = "cat", definition = "zzz", hashmap = buckets) => {
    const index = hash(word);
    if (hashmap[index]) {
      hashmap[index].insert(
        new DictionaryEntry(word.toLowerCase(), definition)
      );
    } else {
      hashmap[index] = new LinkedList(
        new DictionaryEntry(word, definition),
        false
      );
    }
    balance();
  };

  //BALANCE CHECKING
  //basic setting, if the  2x the average, then we split up buckets
  //TODO: SET A MAX LENGTH
  const offensivenessRatio = 1.3;
  const findUnBalanced = () => {
    const numBuckets = buckets.length;
    const totalLength = buckets.reduce((total, bucket) => {
      if (!bucket) return total;
      return total + bucket.length();
    }, 0);
    const averageListLength = totalLength / numBuckets;
    const offendingBuckets = buckets.reduce((arr, bucket, idx) => {
      if (!bucket) return arr;
      if (bucket.length() >= averageListLength * offensivenessRatio)
        return arr.concat(idx);
      return arr;
    }, []);
    // console.log(`numB = ${numBuckets}, totalLength = ${totalLength}`);
    // console.log(`average length = ${averageListLength}`);
    return offendingBuckets;
  };
  const isBalanced = () => {
    if (findUnBalanced().length) return false;
    return true;
  };

  //BALANCER, CHANGES THE HASH FUNCTION
  const balance = () => {
    if ((offendingBuckets = isBalanced()).length) {
      //do stuff
      // console.log("unbalanced, offending buckets = ", offendingBuckets);
      return;
    }
    // console.log("balanced");
  };
  const printStats = () => {
    return;
  };
  //REDISTRIBUTING
  const rehashEverything = () => {
    //change numBuckets first;
    let newBuckets = Array(numBuckets).fill(null);
    let list;
    buckets.forEach(bucket => {
      if (!bucket) return;
      list = [...bucket.listGen()];
      list.forEach(entry => insert(entry.word, entry.definition, newBuckets));
      // console.log("list = ", list);
    });
    buckets = newBuckets;
  };

  //PRINT EVERY ENTRY OUT
  const renderList = () => {
    console.log("============PRINTING============");
    buckets.forEach((bucket, index) => {
      console.log(`bucket index: ${index}:`);
      if (bucket) {
        // bucket.crawl();
        console.log("bucket " + bucket);
      } else {
        console.log(bucket);
      }
      console.log("================================================");
    });
  };

  //PRINT OUT LIST LENGTHS
  const renderLengths = () => {
    buckets.forEach((bucket, index) => {
      if (!bucket) return console.log(`bucket: ${index}. Length: 0`);
      console.log(`bucket: ${index}. Length: ${bucket.length()}`);
    });
  };
  const find = word => {
    let totalSteps = 0;
    if (!buckets[hash(word)]) {
      totalSteps = 1;
      console.log("totalSteps = ", totalSteps);
      return null;
    } else {
      const node = buckets[hash(word)].findWord(word);
      totalSteps = buckets[hash(word)].stepsOfLastOperation();
      console.log("totalSteps = ", totalSteps);
      if (!node) return null;
      return node.data.definition;
    }
    console.log("totalSteps = ", totalSteps);
  };

  //FIND A DEFINTION
  const define = word => {
    const definition = find(word);
    if (!definition) {
      return console.log(`sorry couldn't find ${word}`);
    } else {
      return console.log(`${word}: ${definition}`);
    }
  };

  //LOAD A BIG OL' DICTIONARY
  const loadDictionary = () => {
    //if dictionaryFile is .json
    if (!dictionaryFile) return;
    //if provided with an explicit desired wordCount, do some rand'ing
    if (wordCount) {
      const dictionarySize = 86036; //magic value
      const chance = wordCount / dictionarySize;
      const dictionary = require(dictionaryFile);
      for (word in dictionary) {
        if (Math.random() < chance) insert(word, dictionary[word]);
      }
    } else {
      //else grab all the words
      const dictionary = require(dictionaryFile);
      for (word in dictionary) {
        insert(word, dictionary[word]);
      }
    }

    //else use fs module
  };
  loadDictionary();

  //GET THE ENTRY COUNT
  const totalWords = () => {
    return buckets.reduce((sum, bucket) => {
      if (bucket) return sum + bucket.length();
      return sum;
    }, 0);
  };

  //EXPOSE SOME METHODS
  return {
    hash,
    insert,
    renderList,
    renderLengths,
    define,
    totalWords,
    rehashEverything,
    isBalanced
  };
}

const simpleTest = () => {
  const hash = new HashTable();
  hash.insert("awesome", "coffee");
  hash.insert("amazing", "things");
  hash.insert("bb", "test");
  hash.insert("c", "test");
  hash.renderLengths();
  hash.renderList();
  hash.define("awesome");
  hash.define("cat");
  hash.define("bear");
  hash.define("recursion");
  hash.rehashEverything();
};

const testing = () => {
  const hash = new HashTable("./dictionaries/dictionary.json", 26, 1000);
  // const hash = new HashTable("/usr/share/dict/words");
  // const hash = new HashTable();
  // hash.insert("awesome", "coffee");
  // hash.insert("amazing", "things");
  hash.renderLengths();
  // hash.renderList();
  hash.define("awesome");
  hash.define("cat");
  hash.define("bear");
  hash.define("recursion");
  console.log("word count = ", hash.totalWords());
  console.log("hash is balanced? ", hash.isBalanced());
  hash.rehashEverything();
  console.log("hash is balanced? ", hash.isBalanced());
};
testing();
// simpleTest();
