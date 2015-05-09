var DoublyLinkedList = require('./linked_list/doubly_linked_list.js');

function Queue() {
  this.items = new DoublyLinkedList();
  this.length = 0;
}

Queue.prototype.enqueue = function(val){
  this.items.insertEnd(val);
  this.length++;
  return this;
}

Queue.prototype.dequeue = function(){
  var value = this.peek();
  this.items.removeFront();
  this.length--;
  return value;
}

Queue.prototype.peek = function(){
  return this.items.head.value;
}

module.exports = Queue;
