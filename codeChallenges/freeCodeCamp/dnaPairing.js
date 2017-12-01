var basePairs = {
  A: ["A", "T"],
  T: ["T", "A"],
  C: ["C", "G"],
  G: ["G", "C"]
};
function pairElement(str) {
  return str.split("").map(char => basePairs[char]);
}

pairElement("GCG");
