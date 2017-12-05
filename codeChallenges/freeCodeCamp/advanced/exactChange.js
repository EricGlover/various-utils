const assert = require("assert");

//NOTE: JS sucks at math
const currency = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1.0,
  FIVE: 5.0,
  TEN: 10.0,
  TWENTY: 20.0,
  "ONE HUNDRED": 100.0
};
function checkCashRegister(price, cash, cid) {
  // assert.ok(price <= cash);
  const due = cash - price;
  // Here is your change, ma'am.

  let total = cid.reduce((sum, arr) => sum + arr[1], 0);
  if (total < due) {
    return "Insufficient Funds";
  } else if (total === due) {
    return "Closed";
  }
  let changeSum = 0;
  let change = [];
  for (let i = cid.length - 1; i >= 0; i--) {
    //get the most you from current currency
    let difference = Math.round(100 * (due - changeSum)) / 100;
    let base = currency[cid[i][0]];
    let available = Math.floor(cid[i][1] / base);
    let couldUse = Math.floor(difference / base);
    // let take = Math.min(available, couldUse);
    let take = couldUse > available ? available : couldUse;
    if (take > 0) change.push([cid[i][0], take * base]);
    changeSum += take * base;
    changeSum = Math.round(100 * changeSum) / 100;
  }
  if (due !== changeSum) {
    return "Insufficient Funds";
  }
  return change;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]
console.log(
  checkCashRegister(3.26, 100.0, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90.0],
    ["FIVE", 55.0],
    ["TEN", 20.0],
    ["TWENTY", 60.0],
    ["ONE HUNDRED", 100.0]
  ])
);
// console.log(
//   checkCashRegister(19.5, 20.0, [
//     ["PENNY", 0.01],
//     ["NICKEL", 0],
//     ["DIME", 0],
//     ["QUARTER", 0],
//     ["ONE", 1.0],
//     ["FIVE", 0],
//     ["TEN", 0],
//     ["TWENTY", 0],
//     ["ONE HUNDRED", 0]
//   ])
// );
// console.log(
//   checkCashRegister(19.5, 20.0, [
//     ["PENNY", 1.01],
//     ["NICKEL", 2.05],
//     ["DIME", 3.1],
//     ["QUARTER", 4.25],
//     ["ONE", 90.0],
//     ["FIVE", 55.0],
//     ["TEN", 20.0],
//     ["TWENTY", 60.0],
//     ["ONE HUNDRED", 100.0]
//   ])
// );
