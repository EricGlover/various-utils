//Basic geometry code
const util = require("util");
const { inspect } = util;

//internals
let pointNamespace = new WeakMap();
let pointInternal = point => {
  if (!pointNamespace.has(point)) pointNamespace.set(point, {});
  return pointNamespace.get(point);
};
//Contructor
function Point(x, y) {
  let myGuts = pointInternal(this);
  myGuts.x = x;
  myGuts.y = y;
}
console.log(`Point.prototype = ${inspect(Point.prototype)}`);
console.log(
  `Object.getPrototypeOf(Point) = ${inspect(Object.getPrototypeOf(Point))}`
);
//Prototype
Point.prototype = {
  test: function() {
    this.hi();
  },
  toString: function() {
    let myGuts = pointInternal(this);
    return `[${myGuts.x}, ${myGuts.y}]`;
  },
  plus: function(p) {
    let pGuts = pointInternal(p);
    let myGuts = pointInternal(this);
    return new Point(pGuts.x + myGuts.x, pGuts.y + myGuts.y);
  },
  minus: function(p) {
    let pGuts = pointInternal(p);
    let myGuts = pointInternal(this);
    return new Point(myGuts.x - pGuts.x, myGuts.y - pGuts.y);
  },
  distance: function(p) {
    let pGuts = pointInternal(p);
    let myGuts = pointInternal(this);
    let deltaX = myGuts.x - pGuts.x;
    let deltaY = myGuts.y - pGuts.y;
    let distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    // console.log(`distance between ${this} and ${p} = ${distance}`);
    return distance;
  }
};

//test code for Point
console.log(inspect(Point));
let p = new Point(0, 0);
console.log(`p toString = ${p}`);
console.log(inspect(p));
let p2 = new Point(10, 10);
let p3 = new Point(20, 20);
let p4 = new Point(10, 0);
p.distance(p2);
p.distance(p4);
for (var prop in p) {
  console.log("p has prop = ", prop);
}
console.log(`${p3.minus(p2)}`);
console.log(`${p2.minus(p3)}`);
console.log(`p.x = ${p.x}`);
console.log(`typeof p = ${typeof p}`);
console.log(`p instanceof Point = ${p instanceof Point}`);
console.log(`Object.getPrototypeOf(p) = ${Object.getPrototypeOf(p)}`);
console.log(
  `p.proto = ${p.proto}, p.prototype = ${p.prototype}, p.__proto__ = ${p.__proto__}`
);

//RIGHT TRIANGLE
//p1 -> p2 = l1
//p2 -> p3 = l2
//p3 -> p1 = h
function RightTriangle(p1, p2, p3) {
  let points = [p1, p2, p3].map(p => {
    if (!(p instanceof Point)) {
      return new Point(...p);
    }
    return p;
  });
  // console.log(inspect(points[0]));
  this.l1 = Math.abs(points[0].distance(points[1]));
  this.l2 = Math.abs(points[1].distance(points[2]));
  this.h = Math.abs(points[0].distance(points[2]));
  this.points = points;
}
RightTriangle.prototype = {
  draw: function(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    this.points.forEach(point => ctx.lineTo(point.x, point.y));
    ctx.closePath();
    ctx.stroke();
  }
};
let t = new RightTriangle([0, 50], [50, 50], [50, 0]);
//testing with a pythagorean triplet
let t1 = new RightTriangle([0, 0], [3, 0], [3, 4]);
console.log(inspect(t1)); //l1 = 3, l2 = 4, h = 5
// let t2 = new RightTriangle(p, p2, p3);
console.log(inspect(t));
console.log(`t.points = ${inspect(t.points)}`);
// console.log(inspect(t2));
// console.log(`t2.points = ${inspect(t2.points)}`);

//////
