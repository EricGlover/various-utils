const assert = require("assert");
const util = require("util");
const VERTICAL = "VERTICAL";
const HORIZONTAL = "HORIZONTAL";

/*RETRY LATER */
/*

given a matrix of + and -'s representing a crossword puzzle
and a list of words
find the correct solution

*/

/*
step one parse the puzzle
  I kind of want to just return a graph of the puzzle
  maybe an adj list

*/
function Edge(to, from, toIdx, fromIdx, shared) {
  this.to = to;
  this.from = from;
  this.toIdx = toIdx;
  this.fromIdx = fromIdx;
  this.shared = shared;
}
function Word(
  length,
  i,
  j,
  row,
  column,
  orientation,
  possible = new Set(),
  connectedWords = []
) {
  this.length = length;
  this.i = i;
  this.j = j;
  //
  this.row = row;
  this.column = column;
  //horizontal or vertical
  this.orientation = orientation;
  //
  this.possible = possible;
  this.tmpSol = undefined;
  //NOTE: THIS SHOULD CHANGE LATER
  this.edges = connectedWords.map(to => {
    return new Edge(to, this);
  });
}
const parsePuzzleStr = str => {
  const lines = str.split("\n");
  //pop off the words
  const words = lines[lines.length - 1].split(";");
  const matrix = lines.slice(0, lines.length - 1).map(line => line.split(""));
  return [matrix, words];
};
/*
a strange way to solve the puzzle would be
to run through the matrix,
for each new spot you find you select possible solutions
and attempt to add the solutions to the previous possible solutions
*/

//iterate through
//for spot i
//for each connection Si
//do a dfs for a solution
/*
allSpots = []
spot {
  possibleWords: new Set(),
  connections: [
    {
      spot: pointer,
      idx: Number
    },
    ....
  ]
}
*/
/* old code for doing transposition of matrices */
//Aij => Aji
const transposeM = m => {
  //get dimensions
  const rows = m.length;
  const columns = m[0].length;
  //make new matrice
  let transpose = [];
  for (let i = 0; i < columns; i++) {
    transpose[i] = new Array(rows);
  }
  //copy from m to transpose
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      transpose[j][i] = m[i][j];
    }
  }
  return transpose;
};
const fillCrossword = (matrix, spots) => {
  let clone = matrix.map(row => row.map(el => el));
  spots.forEach(spot => {
    if (spot.orientation === HORIZONTAL) {
      //if horizontal
      let j = 0;
      for (let i = spot.i; i <= spot.j; i++) {
        clone[spot.row][i] = spot.tmpSol[j];
        j++;
      }
    } else if (spot.orientation === VERTICAL) {
      //if vertical
      let j = 0;
      for (let i = spot.i; i <= spot.j; i++) {
        clone[i][spot.column] = spot.tmpSol[j];
        j++;
      }
    }
  });
  return clone;
};
const findRegexMatches = (str, r) => {
  const matches = [];
  let match = r.exec(str);
  while (match) {
    matches.push(match);
    match = r.exec(str);
  }
  return matches;
};

//word is string
const wordFits = (spot, word) => {
  //lengths are same
  if (spot.length !== word.length) return false;
  //word edges match
  let x = spot.column || spot.row;
  const fits = spot.edges.every(edge => {
    if (!edge.to.tmpSol) return true;
    //given a to and from
    //check that the shared char is the same
    // assert.ok(edge.to.tmpSol !== undefined);
    let connectedWord = edge.to.tmpSol;
    let char1 = connectedWord[x - edge.to.i];
    //finding char2 is tricky
    let idx = (edge.to.row || edge.to.column) - spot.i;
    let char2 = word[idx];
    return char1 === char2;
  });
  return fits;
};
var firstPass = (
  emptySpots,
  words,
  filledSpots = new Set(),
  usedWords = new Set()
) => {
  //a first run through
  //we find necessary solutions and possible ones
  //then return
  emptySpots.slice(0).forEach((spot, i) => {
    let answers = words.filter(word => wordFits(spot, word));
    if (answers.length === 1) {
      spot.tmpSol = answers[0];
      filledSpots.add(spot);
      usedWords.add(answers[0]);
    } else {
      spot.possible = answers;
    }
  });
  emptySpots = emptySpots.filter(spot => !filledSpots.has(spot));
  let left = words.filter(word => !usedWords.has(word));
  return [emptySpots, left, filledSpots, usedWords];
};
//
var dfs = (
  emptySpots,
  words,
  filledSpots = new Set(),
  usedWords = new Set()
) => {
  //base case, spot size 1 and word size 1 and match ?
  if (
    words.length === 1 &&
    emptySpots.length === 1 &&
    wordFits(emptySpots[0], words[0])
  ) {
    emptySpots[0].tmpSol = words[0];
    filledSpots.add(emptySpots[0]);
    return filledSpots;
  } else if (emptySpots.length === 0) {
    return filledSpots;
  }
  //find the word for spot 1
  emptySpots.slice(0).forEach((spot, i) => {
    let answers = words.filter(word => wordFits(spot, word));
    if (answers.length === 1) {
      spot.tmpSol = answers[0];
      // emptySpots = emptySpots.slice(0, i).concat(emptySpots.slice(i + 1));
      filledSpots.add(spot);
      usedWords.add(answers[0]);
    } else {
      spot.possible = answers;
    }
  });
  emptySpots = emptySpots.filter(spot => !filledSpots.has(spot));
  let left = words.filter(word => !usedWords.has(word));
  // dfs(emptySpots, left);
  return filledSpots;
};
//step one parse input
//step two make a graph like thing
//step three do a sweep to find all the necessary solutions
//step four do dfs search over graph like thing
function processData(input) {
  /*
  step one parse input
  */
  const [matrix, words] = parsePuzzleStr(input);
  const cols = transposeM(matrix);
  /*
  step two make a graph like thing
  */
  //for each row find the open spaces for words
  let horizontalWords = matrix.reduce((words, row, i) => {
    //this is one way I suppose
    //maybe do a regex test over the string
    const r = /-{2,}/g;
    const matches = findRegexMatches(row.join(""), r);
    //make new words for each match found
    const found = matches.map(match => {
      //j = i + length - 1
      let j = match.index + match[0].length - 1;
      return new Word(
        match[0].length,
        match.index,
        j,
        i,
        undefined,
        HORIZONTAL
      );
    });
    //add them to previously found words
    words = words.concat(found);
    return words;
  }, []);
  //for each column find the open spaces for words
  let verticalWords = transposeM(matrix).reduce((words, row, i) => {
    //this is one way I suppose
    //maybe do a regex test over the string
    const r = /-{2,}/g;
    const matches = findRegexMatches(row.join(""), r);
    const found = matches.map(match => {
      //j = i + length - 1
      let j = match.index + match[0].length - 1;
      return new Word(match[0].length, match.index, j, undefined, i, VERTICAL);
    });
    words = words.concat(found);
    return words;
  }, []);

  //NOTE: I'm assuming that two words going in the same direction
  //  ///can't be connected
  //connect the two groups
  horizontalWords.forEach(word => {
    //check every other word for a connection
    let line = word.row;
    verticalWords.forEach(possibleConnection => {
      //if possibleConnection is connected to that line
      const { i, j } = possibleConnection;
      if (line >= i && line <= j) {
        //found a connection
        // console.log("found a connection");
        //add the edge to the horizontal and the vertical word
        word.edges.push(
          new Edge(
            possibleConnection,
            word,
            word.row,
            possibleConnection.column
          )
        );
        possibleConnection.edges.push(
          new Edge(
            word,
            possibleConnection,
            possibleConnection.column,
            word.row
          )
        );
      }
    });
  });
  //consider the connection to be a word itself
  let spots = horizontalWords.concat(verticalWords);
  /*
  step three do a sweep to find all the necessary solutions
  */
  //find possible fits
  let [emptySpots, remainingWords, filledSpots, usedWords] = firstPass(
    spots,
    words
  );
  /*
  step four do dfs search over graph like thing
  */
  spots = dfs(emptySpots, remainingWords, filledSpots, usedWords);
  //fill in the crossword
  let solution = fillCrossword(matrix, spots);
  //print
  solution.forEach(row => console.log(row.join("")));
}
// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// _input = "";
// process.stdin.on("data", function(input) {
//   _input += input;
// });
//
// process.stdin.on("end", function() {
//   processData(_input);
// });

const t0 = `+-++++++++
+-++++++++
+-++++++++
+-----++++
+-+++-++++
+-+++-++++
+++++-++++
++------++
+++++-++++
+++++-++++
LONDON;DELHI;ICELAND;ANKARA`;
const t1 = `+-++++++++
+-++++++++
+-------++
+-++++++++
+-++++++++
+------+++
+-+++-++++
+++++-++++
+++++-++++
++++++++++
AGRA;NORWAY;ENGLAND;GWALIOR`;
processData(t0);
processData(t1);

/* testing functions */

/* IIFE for making the equal function
used to allow for equal1d and equal2d to be internal methods
NO NAMESPACE POLLUTION TODAY I SAY! */
const equal = (() => {
  const equal1d = (a1, a2) => {
    if (a1.length === a2.length) {
      return a1.every((el, i) => el === a2[i]);
    }
    return false;
  };
  //2 Dimensions
  const equal2d = (m1, m2) => {
    //rows and cols need to be equal
    if (m1.length === m2.length && m1[0].length === m2[0].length) {
      return m1.every((row, i) => row.every((el, j) => el === m2[i][j]));
    }
    return false;
  };
  return (m1, m2) => {
    //find dimensions
    let d = 0;
    let current = m1;
    while (current instanceof Array) {
      d++;
      current = current[0];
    }
    //pass to appropriate equal function
    if (d === 1) {
      return equal1d(m1, m2);
    } else if (d === 2) {
      return equal2d(m1, m2);
    }
    //////
  };
})();
const testCols = () => {
  const m1 = [[1, 2, 3], [9, 9, 9]];
  const m = [[1, 2, 3], [9, 9, 9]];
  const m2 = [[3, 2], [7, 7, 7, 7]];
  let t = transposeM(m1);
  const m3 = [[0, 4], [7, 0], [3, 1]];
  const a3 = [[0, 7, 3], [4, 0, 1]];
  let ans = transposeM(m3);
  assert.ok(equal(ans, a3));
};
// testCols();
