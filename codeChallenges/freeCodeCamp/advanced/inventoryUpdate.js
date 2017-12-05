//TODO:
//binary search
//TODO:
//insert in sorted location

function updateInventory(arr1, arr2) {
  // All inventory must be accounted for or you're fired!
  //loop over newInv and perform updates to old
  arr2.forEach(entry2 => {
    let i = arr1.findIndex(entry1 => entry2[1] === entry1[1]);
    if (i === -1) {
      //not found
      arr1.push(entry2);
    } else {
      arr1[i][0] = arr1[i][0] + entry2[0];
    }
  });
  arr1.sort((a, b) => a[1].localeCompare(b[1]));
  return arr1;
}

// Example inventory lists
// var curInv = [
//   [21, "Bowling Ball"],
//   [2, "Dirty Sock"],
//   [1, "Hair Pin"],
//   [5, "Microphone"]
// ];
//
// var newInv = [
//   [2, "Hair Pin"],
//   [3, "Half-Eaten Apple"],
//   [67, "Bowling Ball"],
//   [7, "Toothpaste"]
// ];
//
// updateInventory(curInv, newInv);
console.log(
  updateInventory(
    [
      [21, "Bowling Ball"],
      [2, "Dirty Sock"],
      [1, "Hair Pin"],
      [5, "Microphone"]
    ],
    [
      [2, "Hair Pin"],
      [3, "Half-Eaten Apple"],
      [67, "Bowling Ball"],
      [7, "Toothpaste"]
    ]
  )
);
// [
//   [88, "Bowling Ball"],
//   [2, "Dirty Sock"],
//   [3, "Hair Pin"],
//   [3, "Half-Eaten Apple"],
//   [5, "Microphone"],
//   [7, "Toothpaste"]
// ];
