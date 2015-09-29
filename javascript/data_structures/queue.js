var DoublyLinkedList = require('./linked_list/doubly_linked_list.js');

function queueDll() {
  this.items = new DoublyLinkedList();
  this.length = 0;
}

queueDll.prototype.enqueue = function(val) {
  this.items.insertEnd(val);
  this.length++;
  return this;
};

queueDll.prototype.dequeue = function() {
  var value = this.peek();
  this.items.removeFront();
  this.length--;
  return value;
};

queueDll.prototype.peek = function() {
  return this.items.head.value;
};

queueDll.prototype.isEmpty = function() {
  return this.length === 0;
};

queueDll.prototype.toArray = function() {
  return this.items.toArray();
};

queueDll.prototype.forEach = function(fn) {
  this.toArray().forEach(fn);
};

function queueArr() {
  this.items = [];
  this.length = 0;
}

queueArr.prototype.enqueue = function(val) {
  this.items.push(val);
  this.length++;
  return this;
};

queueArr.prototype.dequeue = function() {
  // this is O(n) each time
  // https://github.com/v8/v8/blob/master/src/array.js#L620
  //
  // which is fine for our academic purposes 
  //
  // the way to allow both enqueue and dequeue to be constant time with an array
  // backed queue is to use a fixed size queue and manipulate the front and rear indexs
  //
  // ala
  //
  // http://codereview.stackexchange.com/questions/64258/array-implementation-of-queue
  // 
  var value = this.items.shift();
  this.length--;
  return value;
};

queueArr.prototype.peek = function() {
  return this.items[this.items.length - 1];
};

queueArr.prototype.isEmpty = function() {
  return this.length === 0;
};

queueArr.prototype.toArray = function() {
  return this.items;
};

queueArr.prototype.forEach = function(fn) {
  this.toArray().forEach(fn);
};

var Stack = require('./stack.js').array;

function queueWithTwoStacks(){
  this.in_stack = new Stack();
  this.out_stack = new Stack();
  this.length = 0;
}

queueWithTwoStacks.prototype.enqueue = function(val) {
  this.in_stack.push(val);
  this.length++;
  return this;
};

queueWithTwoStacks.prototype.dequeue = function() {
  if(this.out_stack.isEmpty()){
    // check if there is stuff on in stack and push on on out Stack
    while (!this.in_stack.isEmpty()){
      this.out_stack.push(this.in_stack.pop());
    }
  }
  var value = this.out_stack.pop();
  this.length--;
  return value;
};

queueWithTwoStacks.prototype.peek = function() {
  if(this.out_stack.isEmpty()){
    // check if there is stuff on in stack and push on on out Stack
    while (!this.in_stack.isEmpty()){
      this.out_stack.push(this.in_stack.pop());
    }
  }
  
  // first item in out stack is the first item its it representing array
  return this.out_stack.items[0];
};

queueWithTwoStacks.prototype.isEmpty = function() {
  return this.length === 0;
};

var dsalgo = require('../utilities.js').dsalgo;

queueWithTwoStacks.prototype.toArray = function() {
  // there are no items in the queue
  if(this.out_stack.isEmpty() && this.in_stack.isEmpty()) return [];

  // the out stack is empty just return the in_stack items
  if(this.out_stack.isEmpty()){
    // I use .push to make insert in my stack O(1). so items will be in order already
    return this.in_stack.items;
  }

  var copy;
  // in empty return out
  if(this.in_stack.isEmpty()){
    // js reverse mutes the array and would break the queue
    copy = dsalgo.utils.arrayDeepCopy(this.out_stack.items);
    return copy.reverse();
  }

  copy = dsalgo.utils.arrayDeepCopy(this.out_stack.items);
  return copy.reverse().concat(this.in_stack.items);
};

queueWithTwoStacks.prototype.forEach = function(fn) {
  this.toArray().forEach(fn);
};


module.exports = {
  doubly_linked_list: queueDll,
  array: queueArr,
  with_two_stacks: queueWithTwoStacks
};
