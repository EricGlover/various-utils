//an implementation of a stack in JS
//with pretend C-like self-limitations

//Complexity: T / S
//insertion :
//access    :
//update    :
//deletion  :

function Stack2() {
  _size = 0;
  _storage = [];
  this.size = function() {
    return _size;
  };
  //a getter for testing
  this.storage = function() {
    return _storage;
  };
  //
  this.pop = function() {
    if (!_size) return null;
    const popped = _storage[_size - 1];
    _storage = _storage.slice(0, --_size);
    return popped;
  };
  this.push = function(data) {
    _storage[_size] = data;
    return ++_size;
  };
  this.isEmpty = function() {
    return _size === 0 ? true : false;
  };
  this.top = function() {
    if (_size <= 0) return null;
    return _storage[_size - 1];
  };
  //generator function for emptying ???
  this.getMax = function() {
    let max = Number.MIN_VALUE;
    for (let i = 0; i < _size; i++) {
      if (_storage[_size - 1] >= max) {
        max = _storage[_size - 1];
      }
    }
    return max;
  };
}

const test = () => {
  const stack = new Stack2();
  console.log(stack.isEmpty());
  stack.push(1);
  stack.push(2);
  stack.push(3);
  stack.push(4);
  console.log(stack.top());
  console.log(stack.isEmpty());
  console.log(stack.size());
  console.log(stack.getMax());
  stack.pop();
  console.log(stack.getMax());
};
test();
