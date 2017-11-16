const util = require("util");

const twoDMaker = fn => {
  return arr => {
    return arr.map((row, i) => {
      return row.map(fn);
    });
  };
};
const threeDMaker = fn => {
  return arr => {
    return arr.map((row, i) => {
      return row.map((col, j) => {
        return col.map(fn);
      });
    });
  };
};
// const findSA = (i, j, z, arr) => {
//   let sA = 0;
//   if (!(arr[i - 1] && arr[i - 1][j][z])) {
//     sA++;
//   }
//   if (!(arr[i + 1] && arr[i + 1][j][z])) {
//     sA++;
//   }
//   if (!(arr[i][j - 1] && arr[i][j - 1][z])) {
//     sA++;
//   }
//   if (!(arr[i][j + 1] && arr[i][j + 1][z])) {
//     sA++;
//   }
//   if (!arr[i][j][z - 1]) {
//     sA++;
//   }
//   if (!arr[i][j][z + 1]) {
//     sA++;
//   }
//   return sA;
// };
// const surfaceArea = arr => {
//   let toy = arr.map((row, i) => {
//     return row.map((height, j) => {
//       return Array(height).fill(true);
//     });
//   });
//   return toy.reduce((sumX, row, i) => {
//     return (
//       sumX +
//       row.reduce((sumY, col, j) => {
//         return (
//           sumY + col.reduce((sumZ, el, z) => sumZ + findSA(i, j, z, toy), 0)
//         );
//       }, 0)
//     );
//   }, 0);
// };
const findSA = (i, j, z, arr) => {
  let sA = 0;
  if (!(arr[i - 1] && arr[i - 1][j] >= z)) {
    sA++;
  }
  if (!(arr[i + 1] && arr[i + 1][j] >= z)) {
    sA++;
  }
  if (!(arr[i][j - 1] && arr[i][j - 1] >= z)) {
    sA++;
  }
  if (!(arr[i][j + 1] && arr[i][j + 1] >= z)) {
    sA++;
  }
  //below
  if (z === 1) {
    sA++;
  }
  //isTop
  if (arr[i][j] === z) {
    sA++;
  }
  return sA;
};
const surfaceArea = arr => {
  return arr.reduce((sumX, row, i) => {
    return (
      sumX +
      row.reduce((sumY, height, j) => {
        // sumY + col.reduce((sumZ, el, z) => sumZ + findSA(i, j, z, arr), 0)
        let zTotal = 0;
        for (let z = 1; z <= height; z++) {
          let blockSA = findSA(i, j, z, arr);
          zTotal += blockSA;
        }
        return sumY + zTotal;
      }, 0)
    );
  }, 0);
};

const test = () => {
  console.log(surfaceArea([[1]]));
  console.log(surfaceArea([[1, 3, 4], [2, 2, 3], [1, 2, 4]]));
};
test();
