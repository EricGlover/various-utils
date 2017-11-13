/*  CONVERT TO ROMAN NUMERALS */
// Convert the given number into a roman numeral.
//
// All roman numerals answers should be provided in upper-case.
var map = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
  XX: 20,
  XXX: 30,
  XL: 40,
  L: 50,
  LX: 60,
  LXX: 70,
  LXXX: 80,
  XC: 90,
  C: 100,
  CC: 200,
  CCC: 300,
  CD: 400,
  D: 500,
  DC: 600,
  DCC: 700,
  DCCC: 800,
  CM: 900
};

/*
M 1000
D 500
C 100
L 50
X 10
V 5
I 1
*/
var roman = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1
};
var nums = {
  1000: "M",
  500: "D",
  100: "C",
  50: "L",
  10: "X",
  5: "V",
  1: "I"
};
function strMult(str, times) {
  var left = times;
  var newStr = "";
  while (left > 0) {
    newStr += str;
    left--;
  }
  return newStr;
}
//convert single significant digit num to roman numeral
function convert(num) {
  if (num > 1000) {
    return strMult("M", num / 1000);
  }
  // var char = Object.keys(nums).find(function(roNum) {
  //   return num > roNum;
  // });
}

function convertToRoman(num) {
  var s = String(1).split("");
  s.reduce(function(roman, char, index, nums) {}, "");
  return num;
}

convertToRoman(36);
