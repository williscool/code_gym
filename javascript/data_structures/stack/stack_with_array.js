var assert = require('assert');

function Stack() {
	this.items = [];
	this.stack_top_index = 0;
	this.push = function (thing) {
		this.stack_top_index++;
		this.items[this.stack_top_index] = thing;
	}
	
	this.pop = function (thing) {
		if(this.stack_top_index > 0){
		  var top_item =  this.items[this.stack_top_index];
		  this.stack_top_index--; 
			return top_item;
		} else{
			throw Error("stack empty");
		}
	}
}

var stack = new Stack();

stack.push(42);


assert(stack.stack_top_index == 1 , "stack has one item on it");

var num = stack.pop();

assert(num == 42 , "correct number is returned from stack");
assert(stack.stack_top_index === 0 , "zero items on stack");
