var Person = function(firstAndLast) {
  // Complete the method below and implement the others similarly
  let [first, last] = firstAndLast.split(" ");
  this.getFullName = function() {
    return first + " " + last;
  };
  this.getFirstName = function() {
    return first;
  };
  this.getLastName = function() {
    return last;
  };
  this.setFirstName = function(name) {
    first = name;
  };
  this.setLastName = function(name) {
    last = name;
  };
  this.setFullName = function(name) {
    let names = name.split(" ");
    first = names[0];
    last = names[1];
  };
};

var bob = new Person("Bob Ross");
bob.getFullName();
/*
getFirstName()
getLastName()
getFullName()
setFirstName(first)
setLastName(last)
setFullName(firstAndLast)
*/
