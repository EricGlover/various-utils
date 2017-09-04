// function Stack() {
//   this._size = 0;
//   this._storage = {};
// }
//a quick note on private variables in JS
//method 1 this._size

//method 2 closures and the revealing module pattern
//getters and setters using closures??
//still don't know why the tut used an object for the storage
//potential downside here, attaching methods on the prototype may be better than creating
/////new functions for each object that's created
function Stack() {
  _size = 0;
  _storage = {};
  let size = function() {
    return _size;
  };
  let storage = function() {
    return _storage;
  };
  let push = function(...data) {
    data.forEach(element => (_storage[++_size] = element));
  };
  let pop = function() {
    if (!_size) return null;
    const size = _size,
      popped = _storage[_size];
    delete _storage[_size];
    _size--;
    return popped;
  };
  let isEmpty = function() {
    return _size === 0 ? true : false;
  };
  let top = function() {
    return _storage[_size];
  };

  return {
    size,
    storage,
    push,
    pop,
    isEmpty,
    top
  };
}

//method 3 weakMaps

const test = () => {
  // const stack = new Stack();
  const stack = Stack();
  console.log("stack.size = ", stack._size); //size is private
  console.log("Stack.push = ", Stack.push); //
  console.log("stack = ", stack);
  console.log("stack.size() = ", stack.size()); //read-only
  console.log("storage = ", stack.storage()); //read-only
  console.log("stack = ", stack);
  //pushing things
  stack.push(1); //one thing
  stack.push([]); //different sorts of thing
  stack.push(true, {}, "THE END"); //lots of things in one push
  console.log("stack.size() = ", stack.size());
  console.log("storage = ", stack.storage());
  console.log("stack.size = ", stack._size);
  //popping things
  stack.pop();
  console.log("stack.size() = ", stack.size());
  console.log("storage = ", stack.storage());
  //hopefully this will pop everything off the stack
  while (console.log("poppin off ", stack.pop())) {
    console.log("stack.size() = ", stack.size());
    console.log("storage = ", stack.storage());
  }
};
test();

/* my stack implementation, with _'s and []'s */
function Stack() {
  this._size = 0;
  this._storage = [];
}
Stack.prototype = {
  get size() {
    return this._size;
  },
  get storage() {
    return this._storage;
  }
};
Stack.prototype.push = function(...data) {
  data.forEach(element => {
    this._storage.push(element);
    this._size++;
  });
};
Stack.prototype.pop = function() {
  if (!this._size) return null;
  this._size--;
  return this._storage.pop();
};
Stack.prototype.isEmpty = function() {
  return this._size === 0 ? true : false;
};
Stack.prototype.top = function() {
  return this._storage[this._size - 1];
};
