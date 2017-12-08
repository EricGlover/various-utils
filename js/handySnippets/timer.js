const printTime = (start, end) => {
  let diff = end - start;
  // let d = new Date(end - start);
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;
  const second = 1000;
  // let h = Math.floor(diff / hour)
  // diff -= h * hour;
  let [h, m, s] = [hour, minute, second].map(base => {
    let amount = Math.floor(diff / base);
    diff -= amount * base;
    return amount;
  });
  console.log(`time : ${h}:${m}:${s}:${diff}`);
  // console.log("alt method ");
  // diff = d;
  // console.log(`hours : ${Math.floor(diff.getHours())}`);
  // console.log(`mins : ${Math.floor(diff.getMinutes())}`);
  // console.log(`seconds : ${Math.floor(diff.getSeconds())}`);
};
class Timer {
  constructor() {
    this.s;
    this.e;
  }
  start() {
    this.s = new Date();
  }
  end() {
    this.e = new Date();
  }
  print() {
    printTime(this.s, this.e);
  }
}

module.exports = Timer;
