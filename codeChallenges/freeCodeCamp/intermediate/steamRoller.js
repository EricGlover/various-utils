//completely flatten
function steamrollArray() {
  return Object.entries(arguments).reduce((col, arg) => {
    let val = arg[1];
    if (val instanceof Array) {
      val = steamrollArray(...val);
    }
    return col.concat(val);
  }, []);
}
console.log(steamrollArray([1, [2], [3, [[4]]]]));
