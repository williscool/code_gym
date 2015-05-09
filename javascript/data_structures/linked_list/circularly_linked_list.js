// TODO: add insertAt() and removeAt()
var DoublyLinkedList = require('../../data_structures/linked_list/doubly_linked_list.js');

var util = require('util');

function CircularlyLinkedList() {
  CircularlyLinkedList.super_.call(this);
}

util.inherits(CircularlyLinkedList, DoublyLinkedList);

CircularlyLinkedList.prototype.insertFront = function(val){
  var node = {value: val, prev: null, next:null };
  
  if(!this.head){
    this.head = node;
    this.tail = node;
    node.next = node;
    node.prev = node;
  } else {
    //CircularlyLinkedList.super_.prototype.insertFront.call(this,val);
    node.next = this.head;
    node.prev = this.tail;

    old_head = this.head;
    old_head.prev = node;

    this.tail.next = node;

    this.head = node;
  }

  return this;
}

CircularlyLinkedList.prototype.insertEnd = function(val){
  var node = {value: val, next:null };
  
  if(!this.tail){
    this.tail = node;
    this.head = node;
    node.next = node;
    node.prev = node;
  } else {

    this.tail.next = node;
    this.head.prev = node;

    node.next = this.head;
    node.prev = this.tail;

    this.tail = node;
  }

  return this;
}

CircularlyLinkedList.prototype.removeFront = function() {
  
  if(!this.head){
    // do nothing but return for chaining
  } else {
    var new_head = this.head.next;
    new_head.prev = this.head.prev;
    this.head = new_head;
  }

  return this;
}

CircularlyLinkedList.prototype.removeEnd = function(){
  
  if(this.tail){
    var new_tail = this.tail.prev;
    new_tail.next = this.tail.next;
    this.tail = new_tail;
  }

  return this;
}

CircularlyLinkedList.prototype.toArray = function(){
  var arr = [];

  if(!this.head){
    return arr;
  }

  arr.push(this.head.value);

  var cur = this.head.next;

  while(cur != this.head ) {
    arr.push(cur.value);
    cur = cur.next;
  }

  return arr;
}

module.exports = CircularlyLinkedList;
