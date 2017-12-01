//what they want you to do, I think...
function uniteUnique() {
  return Object.entries(arguments).reduce((col, arg) => {
    let val = arg[1];
    let unique = val.filter(num => !col.includes(num));
    return col.concat(unique);
  }, []);
}
console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));
//but this is a bit confusing
//it takes a list of arrs and returns a list of
//all the unique values from within the arrs
//but it doesn't return a completely flattened list...
console.log(uniteUnique([1, 3, 2], [1, [5]], [2, [4]])); //=>[1, 3, 2, [5], [4]]
//this behavior to me feels a bit goofy

//recursively flatten nested arrays
//how do you determine if something is a collection?
const flattenR = (...collection) => {
  if (collection.length < 1) {
    return collection;
  }
  //check each item
  return collection.reduce((flat, col) => {
    return flat.concat(flattenR(col));
  }, []);
};
//completely flatten, and only return unique values
function flatten() {
  return Object.entries(arguments).reduce((col, arg) => {
    let val = arg[1];
    let unique;
    if (val instanceof Array) {
      val = flatten(...val);
      unique = val.filter(el => !col.includes(el));
    } else {
      unique = col.includes(val) ? [] : val;
    }
    return col.concat(unique);
  }, []);
}
// console.log(flattenR([1, 3, 2], [5, 2, 1, 4], [2, 1]));
// console.log(flattenR(1));
// const test = col => console.log(this.args);
function test() {
  console.log(arguments);
}
// test(1, 2, 3);
// test([1]);
console.log(flatten([1, 2, 3]));
console.log(flatten(1, 2, 3));
console.log(flatten([1, 2, 3], [4, 5, 6]));
console.log(flatten([1, 2, [3]]));
console.log(flatten(1, 2, 3, 2, 7, 3));
