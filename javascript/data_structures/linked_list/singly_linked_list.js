function LinkedList() {
  this.head = null;
}

LinkedList.prototype.insertFront = function(val){
  var node = {value: val, next:null };
  
  if(!this.head){
    this.head = node;
  } else {
    node.next = this.head;
    this.head = node;
  }

  return this;
}

LinkedList.prototype.insertEnd = function(val){
  var node = {value: val, next:null };
  
  if(!this.head){
    this.head = node;
  } else {
    var cur = this.head;

    while(cur.next) {
      cur = cur.next;
    }
    cur.next = node;
  }

  return this;
}

LinkedList.prototype.removeFront = function() {
  
  if(!this.head){
    return this;
  } else {
    var new_head = this.head.next;
    this.head = null;
    this.head = new_head;
    return this;
  }
}

LinkedList.prototype.removeEnd = function(){
  
  if(!this.head){
    // do thing but return for chaining
    return this;
  } else {
    var cur = this.head;

    while(cur) {
      cur = cur.next;
    }

    cur = null;
  }

  return this;
}

LinkedList.prototype.toArray = function(){
  var arr = [];

  var cur = this.head;

  while(cur) {
    arr.push(cur.value);
    cur = cur.next;
  }

  return arr;
}

// http://stackoverflow.com/questions/9893592/node-js-object-is-not-a-function-module-exports
module.exports = LinkedList;
