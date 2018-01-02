//given the area and the base of a triangle find
// the smallest height (int)

//area = h * b) / 2
//2 * area ) / b = h
const lowestTriangle = (base, area) => {
  return Math.ceil(2 * area / base);
};
