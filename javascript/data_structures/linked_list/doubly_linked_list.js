// http://en.wikipedia.org/wiki/Doubly_linked_list
function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
}

DoublyLinkedList.prototype.insertFront = function(val){
  var node = {value: val, prev: null, next:null };
  
  if(!this.head){
    // create special case of one node doubly linked list 
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
    // create special case of one node doubly linked list 
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
  
  if(this.head){

    // special case for removal of node from a list with only one node where 
    // that node is both the head and the tail
    //
    // this is a convention people use to make the code for adding subsequent nodes easier
    // because you never have to do any null checking
    if(this.head == this.tail){
      this.tail = null; 
    }

    var new_head = this.head.next;
    this.head = new_head;
  }
  
  return this;
}

DoublyLinkedList.prototype.removeEnd = function(){
  
  if(this.tail){

    // special case for list with one item
    if(this.head == this.tail){
      this.head = null; 
    }

    var new_tail = this.tail.prev;
    this.tail = new_tail;
    // since this is now no reference to the old head the garbage collector will delete it. 
    // we could do that on our own if we wanted though
  }

  return this;
}

DoublyLinkedList.prototype.toArray = function(){
  var arr = [];
  
  // special case for list with one item
  if(this.head == this.tail){
    return [this.head.value]; 
  }

  var cur = this.head;

  while(cur) {
    arr.push(cur.value);
    cur = cur.next;
  }

  return arr;
}

module.exports = DoublyLinkedList;
