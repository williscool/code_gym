var DoublyLinkedList = require('./linked_list/doubly_linked_list.js');

function queueDll() {
  this.items = new DoublyLinkedList();
  this.length = 0;
}

queueDll.prototype.enqueue = function(val){
  this.items.insertEnd(val);
  this.length++;
  return this;
}

queueDll.prototype.dequeue = function(){
  var value = this.peek();
  this.items.removeFront();
  this.length--;
  return value;
}

queueDll.prototype.peek = function(){
  return this.items.head.value;
}

queueDll.prototype.isEmpty = function(){
  return this.length === 0;
}

queueDll.prototype.toArray = function(){
  return this.items.toArray();
}

function queueArr() {
  this.items = [];
  this.length = 0;
}

queueArr.prototype.enqueue = function(val){
  this.items.push(val);
  this.length++;
  return this;
}

queueArr.prototype.dequeue = function(){
  // this is O(n) each time
  // https://github.com/v8/v8/blob/master/src/array.js#L620
  //
  // which is fine for our academic purposes the way to allow both enqueue and dequene to be constant time with an array
  // backed queue is to use a fixed size queue and manipulate the front and rear indexs
  //
  // ala
  //
  // http://codereview.stackexchange.com/questions/64258/array-implementation-of-queue
  // 
  var value = this.items.shift();
  this.length--;
  return value;
}

queueArr.prototype.peek = function(){
  return this.items[this.items.length - 1];
}

queueArr.prototype.isEmpty = function(){
  return this.length === 0;
}

queueArr.prototype.toArray = function(){
  return this.items;
}

// want to add this to use a backwards js array to implement

module.exports = {
  doubly_linked_list: queueDll,
  array: queueArr
};
