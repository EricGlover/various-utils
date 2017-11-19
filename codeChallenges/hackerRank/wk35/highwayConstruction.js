function highwayConstruction(n, k) {
  // Complete this function
}

const highwayConstruction = (n, k) => {
  let cost = 0;
  for (let i = 1; i <= n - 2; i++) {
    cost += Math.pow(n - i, k);
  }
  return cost % 1000000009;
};

const highwayConstruction = (n, k) => {
  let cost = 0;
  for (let i = 2; i <= n - 1; i++) {
    cost += Math.pow(i, k);
  }
  return cost % 1000000009;
};
