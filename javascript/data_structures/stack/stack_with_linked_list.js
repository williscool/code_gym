var LinkedList = require('../linked_list/singly_linked_list.js');

function Stack() {
	this.items = new LinkedList();
	this.stack_top_index = -1;
	this.push = function (thing) {
    this.stack_top_index = this.stack_top_index + 1 ;
		this.items.insertFront(thing);
	}
	
	this.pop = function () {
		if(this.stack_top_index > -1){
		  var top_item = this.items.head.value;
		  this.items.removeFront();
		  this.stack_top_index--; 
			return top_item;
		} else {
			throw Error("stack empty");
		}
	}
}

module.exports = Stack;
