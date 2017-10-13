//utility functions
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
// tester(() => console.log("stuff"));
// tester(() => console.log("stuff"));

//AN EXPLORATION OF SET THEORY

/*UTILITY SET FUNCTIONS */
Set.prototype.print = function() {
  let iterator = this.values();
  let current;
  while (!(current = iterator.next()).done) {
    console.log(current.value);
  }
};
Set.prototype.toString = function() {
  return util.inspect(this);
};

/* BASIC SET OPERATIONS */
//{ x : x isMember of A OR x isMember of B }
Set.prototype.union = function(setB) {
  let unionSet = new Set(this);
  for (let element of setB) unionSet.add(element);
  return unionSet;
};
//{ x : x isMember of A AND x isMember of B }
Set.prototype.intersection = function(setB) {
  let intersection = new Set([]);
  for (let element of this)
    setB.has(element) ? intersection.add(element) : null;
  return intersection;
};
//{ x : x isMember of A AND x isNotMember of B }
Set.prototype.difference = function(setB) {
  let difference = new Set(this);
  for (let element of setB) difference.delete(element);
  return difference;
};
//the == operator and the === operator compare references for sets so....
//equal method to the rescue
Set.prototype.equals = function(setB) {
  if (setB.size !== this.size) return false;
  for (let element of setB) {
    if (!this.has(element)) return false;
  }
  return true;
};

//Implementation 1, the explicit dumb way
const disjoint1 = function(setB) {
  for (let element of setB) {
    if (this.has(element)) return false;
  }
  return true;
};
//Implementation 2, by the definition
const disjoint2 = function(setB) {
  return this.intersection(setB).equals(new Set());
};

//DISJOINT
//Two sets are disjoint if they share no elements
// { x : A union B isEquals EmptySet}
Set.prototype.isDisjoint = disjoint2;

//SUBSET
Set.prototype.isSubset = function(setB) {
  for (let element of this) {
    if (!setB.has(element)) return false;
  }
  return true;
};
//PROPER SUBSET
Set.prototype.isSubset = function(setB) {
  if (this.size === setB.size) return false;
  for (let element of this) {
    if (!setB.has(element)) return false;
  }
  return true;
};
//COMPLIMENT
//A is a compliment of B in Universe U if
//A union B = empty set
//A intersection B = U
Set.prototype.isCompliment = function(setB, u) {
  if (!this.isDisjoint(setB)) return false;
  if (!this.union(setB).equals(u)) return false;
  return true;
};

//SIZE OF POWER SET
//power set = all the subsets of a set including the empty set
Set.prototype.sizeOfPowerSet = function() {
  return 2 ** this.size;
};

//POWER SET
//Totally works, which is weird
Set.prototype.powerSet = function() {
  const empty = new Set();
  let answer = new Set([empty]);
  this.forEach((element, idx) => {
    let setsToAdd = []; //try storing these for later
    answer.forEach(p => {
      let n = new Set([...p.values()]);
      n.add(element);
      setsToAdd.push(n);
    });
    setsToAdd.forEach(set => answer.add(set));
  });
  return answer;
};

//CARTESIAN PRODUCT
Set.prototype.cartesianProduct = function(setB) {
  let product = new Set();
  this.forEach(element =>
    setB.forEach(bElement => product.add(new Set([element, bElement])))
  );
  //same code but with for loops
  // for (let element of this) {
  //   for (let j of setB) product.add(new Set([element, j]));
  // }
  return product;
};
const testPowerSet = () => {
  console.log("testing powerSet");
  //simple test
  const a = new Set([1, 2]);
  console.log("size should be ", a.sizeOfPowerSet());
  let powerA = a.powerSet();
  console.log(powerA.size);
  console.log(a.sizeOfPowerSet());
  log(powerA);

  //letters
  let letters = new Set("dank memez".split(""));
  log(letters.powerSet());

  //
  // const b = new Set([1, 2, 3]);
  // let powerB = b.powerSet();
  // console.log(powerB.size);
  // console.log(b.sizeOfPowerSet());
  // log(powerB);
  // const c = new Set([7, 3, 1, 5, 4]);
  // let powerC = c.powerSet();
  // console.log(powerC.size);
  // console.log(c.sizeOfPowerSet());
  // log(powerC);

  //hard test
  // const d = new Set([7, 3, 1, 5, 4, 3, 1, 11, 12, 13, 14, 18, 88]);
  // let powerD = d.powerSet();
  // console.log(powerD.size);
  // console.log(d.sizeOfPowerSet());
  // log(powerD);
};
const testCartesianProduct = () => {
  console.log("testing cartesianProduct");
  const a = new Set([1, 2, 3]);
  const b = new Set([8, 9]);
  const c = new Set([4, 5, 6]);
  let a1 = a.cartesianProduct(b);
  console.log(`a ${a} x b ${b} = \n${a.cartesianProduct(b)}`);
  console.log(`a ${a} x c ${c} = \n${a.cartesianProduct(c)}`);
  let a2 = a.cartesianProduct(c);
  console.log(`size should be 6, ${a1.size}`);
  console.log(`size should be 9, ${a2.size}`);
};
const testCompliment = () => {
  const a = new Set([1, 2, 3]);
  const b = new Set([4, 5, 6]);
  const u = new Set([1, 2, 3, 4, 5, 6]);
  console.log(
    `is a(${inspect(a)}) a compliment of b(${inspect(b)}) for u(${inspect(
      u
    )})? ,`,
    a.isCompliment(b, u)
  );
};

const sets = [
  new Set([1, 2, 3]),
  new Set([4, 5, 6]),
  new Set(),
  new Set([2, 3, 7]),
  new Set([1, 2, 3, 4]),
  new Set([2, 3, 4, 5, 7])
];
const testDisjoint = () => {
  const tests = [
    () => sets[0].isDisjoint(sets[1]),
    () => sets[0].isDisjoint(sets[2]),
    () => sets[0].isDisjoint(sets[3]),
    () => sets[0].isDisjoint(sets[4]),
    () => sets[0].isDisjoint(sets[5]),
    () => sets[4].isDisjoint(sets[0])
  ];
  console.log("/******* tests sets *********/ ");
  log(sets);
  console.log("/******* tests sets *********/ ");
  tests.forEach(test => tester(test));
};
const testEquals = () => {
  console.log("testing equals");
  const tests = [
    () => sets[0].equals(new Set([1, 2, 3])),
    () => sets[0].equals(sets[2]),
    () => sets[0].equals(sets[3]),
    () => sets[0].equals(sets[4]),
    () => sets[0].equals(sets[5]),
    () => sets[5].equals(new Set([7, 5, 4, 3, 2]))
  ];
  console.log("/******* tests sets *********/ ");
  log(sets);
  console.log("/******* tests sets *********/ ");
  tests.forEach(test => tester(test));
};
// const testUnion
const test = () => {
  const a = new Set([1, 2, 3]);
  a.print();
  log(a);
  const b = new Set([4, 3, 1]);
  b.print();
  log(b);
  log(a.union(b));
  log(a.intersection(b));
  log(a.difference(b));
  testDisjoint();
  testEquals();
  testCompliment();
  testCartesianProduct();
  testPowerSet();
};
test();

/* POWER SET ALGO ATTEMPT 1 */
//brutish kind of answer
//algo:
//Given a Set (S) cardinality n, you make n passes
//initially the powerset (P) contains only the empty set
//Each pass through S you create a new set for every set in P,
//and you throw that into P,
/////given that sets work like they do in math the sets in P are unique and you get
/////the correct Powerset of S
/////Unfortunately in programming we need to manually check verify that the sets in P are unique
