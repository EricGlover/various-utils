//a date generator that moves forward by one day by default

////let date = genDate();
////date.next(-1)   //moves it back a day
const genDate = function*(startDate = "2016-01-01", endDate = "2017-01-01") {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  let currentDate = startDate;
  while (currentDate <= endDate) {
    let injected = yield currentDate;
    injected = injected || 1;
    currentDate = new Date(
      currentDate.setDate(currentDate.getDate() + injected)
    );
  }
  return null;
};
//print all the dates out from startDate to endDate
const printDates = () => {
  let date = genDate();
  let day;
  while ((day = date.next().value)) {
    console.log(day);
  }
};
printDates();
//make an array of dates
let date = genDate();
const twenty16 = [...date];
console.log(twenty16);
console.log(twenty16.length);

//check a few dates
date = genDate();
console.log(date.next().value);
console.log(date.next().value);
console.log(date.next().value);
console.log(date.next().value);

//check out this awesome going back in time
console.log(date.next(-1).value);
console.log(date.next(-1).value);
console.log(date.next(-1).value);
console.log(date.next(-1).value);
console.log(date.next(-1).value);
console.log(date.next(-1).value);

/*about dates
//make a date
> var d = new Date("Thu Dec 31 2015 18:00:00 GMT-0600 (CST)")
2016-01-01T00:00:00.000Z
//try and add to a date
> d + 1
'Thu Dec 31 2015 18:00:00 GMT-0600 (CST)1'    //total failure
> d
2016-01-01T00:00:00.000Z
//get the day
> d.getDate()
31
//set the day, needs args, is destructive
> d.setDate()
NaN
> d
Invalid Date
//reset our date and try again
> var d = new Date("Thu Dec 31 2015 18:00:00 GMT-0600 (CST)")
undefined
> d.getDate()
31
> d.setDate(d.getDate()+1)
1451692800000               //Unix epoch ? no longer date
> var z = new Date(currentDate.setDate(currentDate.getDate() + 1))
> d
2016-01-02T00:00:00.000Z    //our date changed
//note the strange indexing
> d.getDate()
1
> d
2016-01-02T00:00:00.000Z

//last thing
> d.setDate(d.getDate()+1)
1451692800000               //Unix epoch ? actually it's no longer a date
> d instanceof Date
false
> var z = new Date(d.setDate(d.getDate() + 1))  //will make a new Date for d's tomorrow

*/
