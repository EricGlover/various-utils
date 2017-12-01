/*  CONVERT TO ROMAN NUMERALS */
// Convert the given number into a roman numeral.
//
// All roman numerals answers should be provided in upper-case.
/*
M 1000
D 500
C 100
L 50
X 10
V 5
I 1
*/
// var map = {
//   I: 1,
//   II: 2,
//   III: 3,
//   IV: 4,
//   V: 5,
//   VI: 6,
//   VII: 7,
//   VIII: 8,
//   IX: 9,
//   X: 10,
//   XX: 20,
//   XXX: 30,
//   XL: 40,
//   L: 50,
//   LX: 60,
//   LXX: 70,
//   LXXX: 80,
//   XC: 90,
//   C: 100,
//   CC: 200,
//   CCC: 300,
//   CD: 400,
//   D: 500,
//   DC: 600,
//   DCC: 700,
//   DCCC: 800,
//   CM: 900,
//   M: 1000
// };
// var roman = {
//   M: 1000,
//   D: 500,
//   C: 100,
//   L: 50,
//   X: 10,
//   V: 5,
//   I: 1
// };

// function strMult(str, times) {
//   var left = times;
//   var newStr = "";
//   while (left > 0) {
//     newStr += str;
//     left--;
//   }
//   return newStr;
// }
//convert single significant digit num to roman numeral
// function convert(num) {
//   if (num > 1000) {
//     return strMult("M", num / 1000);
//   }
//   // var char = Object.keys(nums).find(function(roNum) {
//   //   return num > roNum;
//   // });
// }
var roman = {
  1000: "M",
  500: "D",
  100: "C",
  50: "L",
  10: "X",
  5: "V",
  1: "I"
};
function convertToRoman(num) {
  const digits = String(num).length;
  return String(num)
    .split("")
    .map((char, i) => {
      //numbers
      let base = Math.pow(10, digits - i - 1);
      let five = base * 5;
      let ten = base * 10;
      let num = Number(char) * base;
      //roman equivalents
      let romanBase = roman[base];
      let romanFive = roman[five];
      let romanTen = roman[ten];
      if (num < five - base) {
        return romanBase.repeat(Math.trunc(num / base));
      } else if (num === five - base) {
        return romanBase + romanFive;
      } else if (num === five) {
        return romanFive;
      } else if (num < ten - base) {
        return romanFive + romanBase.repeat(Math.trunc((num - five) / base));
      } else {
        //it's a nine
        return romanBase + romanTen;
      }
    })
    .join("");
}
console.log(convertToRoman(4));
console.log(convertToRoman(36));
// convertToRoman(360);

////

////

////

////

////
