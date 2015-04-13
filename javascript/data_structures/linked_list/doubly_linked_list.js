function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
}

DoublyLinkedList.prototype.insertFront = function(val){
  var node = {value: val, prev: null, next:null };
  
  if(!this.head){
    this.head = node;
    this.tail = node;
  } else {
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  return this;
}

DoublyLinkedList.prototype.insertEnd = function(val){
  var node = {value: val, next:null };
  
  if(!this.tail){
    this.tail = node;
    this.head = node;
  } else {
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  return this;
}

DoublyLinkedList.prototype.removeFront = function() {
  
  if(!this.head){
  } else {
    var new_head = this.head.next;
    this.head = new_head;
  }
  
  return this;
}

DoublyLinkedList.prototype.removeEnd = function(){
  
  if(!this.tail){
    // do thing but return for chaining
  } else {
    var new_tail = this.tail.prev;
    this.tail = new_tail;
    // since this is now no reference to the old head the garbage collector will delete it. 
    // we could do that on our own if we wanted though
  }

  return this;
}

DoublyLinkedList.prototype.toArray = function(){
  var arr = [];

  var cur = this.head;

  while(cur) {
    arr.push(cur.value);
    cur = cur.next;
  }

  return arr;
}

module.exports = DoublyLinkedList;
