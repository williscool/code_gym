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
  this.items.removeFront();
  this.length--;
  return this;
}

Queue.prototype.peek = function(){
  return this.items.head.value;
}

module.exports = Queue;
