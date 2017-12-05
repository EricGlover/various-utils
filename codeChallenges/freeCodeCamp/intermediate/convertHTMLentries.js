const convert = {
  38: "&amp;",
  34: "&quot;",
  60: "&lt",
  62: "&gt",
  39: "&apos"
};

function convertHTML(str) {
  return str
    .split("")
    .map(char => convert[char.charCodeAt(0)] || char)
    .join("");
}

console.log(convertHTML("Dolce & Gabbana"));
//
// var convert = {
//   &: "&amp;",
//   32: "&quot;",
//
// }
// const convert = char => console.log(char.charCodeAt(0));
// convert("&");
// convert(`"`);
// convert("<");
// convert(">");
// convert("'");
