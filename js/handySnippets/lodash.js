//sometimes I implement my version of lodash utilities
//to warm up my brain for the day
// _.partition([1, 2, 3, 4], n => n % 2);
// → [[1, 3], [2, 4]]
const parition = (collection, func) => {
  const truthy = [];
  const falsy = [];
  return collection.reduce(
    (parted, el) => {
      func(el) ? truthy.push(el) : falsy.push(el);
      return parted;
    },
    [truthy, falsy]
  );
};
const printer = fn => (...args) => console.log(fn(...args));
const a = printer(parition);
a([1, 2, 3, 4], n => n % 2);
// [ [ 1, 3 ], [ 2, 4 ] ]
//suck it lodash
a([1, 2, 3, 4], n => n % 3);
a([1, 2, 3, 4], n => n % 0);

// _.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 });
// → { 'a': 1, 'b': 2 }

// const defaults = ()
