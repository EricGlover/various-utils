const isPangram = str => {
  //getting fancy
  const letters = new Set();
  const r = /[a-z]/;
  str.split("").forEach(letter => {
    letter = letter.toLowerCase();
    //if letter is a -z
    if (r.test(letter)) {
      letters.add(letter);
    }
  });
  //if there are 26 items in the set then
  //every letter was used
  return letters.size === 26;
};
