/*
The radius of the earth is 6367.4447 kilometers,
 and the GM value of earth is 398600.4418 km3 s-2.
 */
const getPeriod = avgAlt => {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  return Math.round(
    Math.PI * 2 * Math.sqrt(Math.pow(avgAlt + earthRadius, 3) / GM)
  );
};
function orbitalPeriod(arr) {
  return arr.map(entry => {
    const orbitalPeriod = getPeriod(entry.avgAlt);
    return {
      name: entry.name,
      orbitalPeriod
    };
  });
}

console.log(orbitalPeriod([{ name: "sputnik", avgAlt: 35873.5553 }]));
/*
[{name: "sputnik", orbitalPeriod: 86400}]
*/
