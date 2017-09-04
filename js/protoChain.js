//version 1 of recursively looking up prototypes

//this doesn't work, getProto("string thing"); => [ String, Object, null ]
//"string thing" isn't an object so it's coerced into one by
//Object.getPrototypeOf()
var getProto = thing => {
  var protoChain = [];

  let recursiveLookup = proto => {
    if (!proto) return;
    let nextProto = Object.getPrototypeOf(proto);
    protoChain.push(nextProto);
    recursiveLookup(nextProto);
  };
  recursiveLookup(thing);
  return protoChain;
};
var s = "string stuff";
const protoChain = getProto(s);
debugger;
console.log(getProto(s));

//version 2 of recursively looking up prototypes
// const getProtoChain = jsThing => {
//   const protoChain = [];
//   (recursiveLookup = proto => {
//     if (!proto) return;
//     let nextProto = Object.getPrototypeOf(proto);
//     protoChain.push(nextProto);
//     return protoChain.push(recursiveLookup(nextProto));
//   })(jsThing);
//   return protoChain;
// };
// var s = "string stuff";
// const protoChainOfS = getProtoChain(s);
// debugger;
// console.log(protoChainOfS);
