var DoublyLinkedList = require('./linked_list/doubly_linked_list.js');

function Quene() {
  this.items = new DoublyLinkedList();
}

Quene.prototype.enquene = function(val){
  this.items.insertEnd(val);
  return this;
}

Quene.prototype.dequene = function(val){
  this.items.removeFront();
  return this;
}

Quene.prototype.peek = function(val){
  return this.items.head.value;
}

module.exports = Quene;
