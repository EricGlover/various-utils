function* letters(start) {
  let current = start.charCodeAt(0);
  while (true) {
    yield String.fromCharCode(current);
    current++;
  }
}
const nextLetter = iter => {
  let next = iter.next();
  if (next.done) return undefined;
  return next.value;
};
function fearNotLetter(str) {
  let iter = letters(str[0]);
  let next;
  for (let i = 0; i < str.length; i++) {
    next = nextLetter(iter);
    if (str[i] !== next) return next;
  }
  return undefined;
}

console.log(fearNotLetter("abce"));
