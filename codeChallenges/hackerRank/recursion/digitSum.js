process.stdin.resume();
process.stdin.setEncoding("ascii");

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on("data", function(data) {
  input_stdin += data;
});

process.stdin.on("end", function() {
  input_stdin_array = input_stdin.split("\n");
  main();
});

function readLine() {
  return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////
const superDigit = num => {
  str = String(num);
  if (str.length === 1) return num;
  sum = str.split("").reduce((sum, char) => sum + parseInt(char), 0);
  return superDigit(sum);
};
function digitSum(n, k) {
  p = n.split("").reduce((total, char) => total + parseInt(char) * k, 0);
  return superDigit(p);
}

function main() {
  var n_temp = readLine().split(" ");
  var n = n_temp[0];
  var k = parseInt(n_temp[1]);
  var result = digitSum(n, k);
  process.stdout.write("" + result + "\n");
}
