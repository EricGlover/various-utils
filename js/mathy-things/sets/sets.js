//utility functions
const util = require("util");
const log = js => console.log(util.inspect(js));

//AN EXPLORATION OF SET THEORY

/* SET OPERATIONS */
Set.prototype.print = function() {
  let iterator = this.values();
  let current;
  while (!(current = iterator.next()).done) {
    console.log(current.value);
  }
};
Set.prototype.union = function(setB) {
  let unionSet = new Set(this);
  for (let element of setB) unionSet.add(element);
  return unionSet;
};
Set.prototype.intersection = function(setB) {
  let intersection = new Set([]);
  for (let element of this)
    setB.has(element) ? intersection.add(element) : null;
  return intersection;
};
Set.prototype.difference = function(setB) {
  let difference = new Set(this);
  for (let element of setB) difference.delete(element);
  return difference;
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
};
test();
