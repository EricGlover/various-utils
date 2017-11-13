/* Lucky Purchase */

//find the minimum price that
//1) contains only 4's and 7's
//2) has an equal number of 4's and 7's

const onlyLuckyNumbers = num => {
  return String(num)
    .split("")
    .every(char => {
      if (char === "4") return true;
      if (char === "7") return true;
      return false;
    });
};

/* test code */
// console.log(onlyLuckyNumbers());
// console.log(onlyLuckyNumbers(111));
// console.log(onlyLuckyNumbers(4));
// console.log(onlyLuckyNumbers(7));
// console.log(onlyLuckyNumbers(4747));
// console.log(onlyLuckyNumbers(74747));
// console.log(onlyLuckyNumbers(747147));
// console.log(onlyLuckyNumbers(44770));

const equalFrequency = num => {
  const letters = { "4": 0, "7": 0 };
  String(num)
    .split("")
    .forEach(char => letters[char]++);
  console.log(letters);
  return letters["4"] === letters["7"] ? true : false;
};
//
/* test code */
// console.log(equalFrequency());
// console.log(equalFrequency(111));
// console.log(equalFrequency(4));
// console.log(equalFrequency(7));
// console.log(equalFrequency(4747));
// console.log(equalFrequency(74747));
// console.log(equalFrequency(747147));
// console.log(equalFrequency(44770));

const cheapest = arr => {
  arr.sort((a, b) => {
    if (a[1] === b[1]) return 0;
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
  });
  return [arr[0][0], arr[0][1]];
};
console.log(cheapest([["HackerBook", 777444], ["BestBook", 47]]));
console.log(cheapest([["HackerBook", 777444]]));
console.log(cheapest([["BestBook", 47], ["HackerBook", 777444]]));

///
