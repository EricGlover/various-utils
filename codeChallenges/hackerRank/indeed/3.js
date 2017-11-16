// const execute = command => {};
//
// const findDelta = commands => {
//   let deltaX = 0;
//   let deltaY = 0;
//   commands.forEach(command => {
//     let dArr = execute(command);
//     deltaX += dArr[0];
//     deltaY += dArr[1];
//   });
// };
/*
 * Complete the function below.
 */
function Robot() {
  //angle in radians
  this.direction = 0;
  this.x = 0;
  this.y = 0;
  this.goLeft = () => {
    this.direction += Math.PI / 2;
  };
  this.goRight = () => {
    this.direction -= Math.PI / 2;
  };
  this.go = () => {
    this.x += Math.sin(this.direction);
    this.y += Math.cos(this.direction);
  };
  this.moveHash = {
    G: this.go,
    L: this.goLeft,
    R: this.goRight
  };

  this.execute = command => this.moveHash[command]();
  this.cycle = commands => {
    commands.forEach(this.execute);
  };
}
const findDistance = arr => {
  return arr[0] * arr[0] + arr[1] + arr[1];
};
//thinking about it more I now realize
//if the robot goes nowhere then YES
//else if the robot goes some distance and has changed direction
//    then YES
//else NO
function doesCircleExist(commands) {
  let answers = commands.map(command => {
    let ro = new Robot();
    //if they go nowhere then yes
    let currentX = ro.x;
    let currentY = ro.y;
    let currentDirection = ro.direction;
    ro.cycle(command.split(""));
    if (currentX === ro.x && currentY === ro.y) {
      return "YES";
    }
    //has direction changed
    if (ro.direction === currentDirection) {
      return "YES";
    }
    return "NO";
    //but wait there's more
    // let moves = [];
    // for (let i = 0; i < 10; i++) {
    //   ro.cycle(command.split(""));
    //   if (currentX === ro.x && currentY === ro.y) {
    //     return "YES";
    //   }
    //   moves.push([ro.x, ro.y]);
    //   currentX = ro.x;
    //   currentY = ro.y;
    // }
    // find distances
    // if constantly increasing then return no
    // look for concavity of the distance function
    // let distances = moves.map(move => findDistance(move));
    // let last = distances[8] - distances[9];
    // let secondToLast = distances[7] - distances[8];
    // if (last < secondToLast) return "YES"; //approx
    // distance.every((d, i, arr) => {
    //   if(i === 0) return true;
    //
    // })
    return "NO";
  });
  return answers;
}
