var DoublyLinkedList = require('./linked_list/doubly_linked_list.js');

function Quene() {
  this.items = new DoublyLinkedList();
  this.length = 0;
}

Quene.prototype.enquene = function(val){
  this.items.insertEnd(val);
  this.length++;
  return this;
}

Quene.prototype.dequene = function(val){
  this.items.removeFront();
  this.length--;
  return this;
}

Quene.prototype.peek = function(val){
  return this.items.head.value;
}

module.exports = Quene;
