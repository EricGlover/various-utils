let r1 = /^(\d{3})-(\d{3})-(\d{4})$/;
let r2 = /^\((\d{3})\)\d{3}-\d{4}$/;
let r3 = /^\(\d{3}\)\s\d{3}-\d{4}/;
let r4 = /^\d{3}\s\d{3}\s\d{4}/;
let r5 = /^(\d{3})(\d{3})(\d{4})/;
let r6 = /^1?\s?(\d{3})\s(\d{3})\s(\d{4})/;
let regs = [r1, r2, r3, r4, r5, r6];
// function telephoneCheck(str) {
//   //check for US code
//   let firstDigit = parseInt(str);
//   //console.log(firstDigit);
//   if (firstDigit === 1) {
//     let r = /\d/g;
//     let matches = [];
//     let match = r.exec(str);
//     while (match !== null) {
//       matches.push(match);
//       match = r.exec(str);
//     }
//     console.log(matches);
//     str = str.slice(matches[1].index);
//     console.log(`str is now ${str}`);
//     if (matches.length < 11) {
//       return false;
//     }
//   }
//
//   return regs.some(regex => regex.test(str));
// }
//
// console.log(telephoneCheck("555-555-5555"));
// console.log(telephoneCheck("1 (555) 555-5555"));

///if there are 11 digits then pop off the country code
function telephoneCheck(str) {
  let d = /\d/g;
  let matches = [];
  let match = d.exec(str);
  while (match !== null) {
    matches.push(match);
    match = d.exec(str);
  }
  if (matches.length > 11) {
    return false;
  } else if (matches.length === 11) {
    if (matches[0][0] != 1) return false;
    //second check
    if (parseInt(str) !== 1) return false;
    //pop off country code
    str = str.slice(matches[0].index + 1).trim();
  } else if (matches.length < 10) {
    return false;
  }
  return regs.some(regex => regex.test(str));
}
console.log(telephoneCheck("1 (555) 555-5555"));
console.log(telephoneCheck("-1 (757) 622-7382"));
