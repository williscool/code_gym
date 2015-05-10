function Stack() {
	this.items = [];
	this.stack_top_index = -1;
	this.push = function (thing) {
    this.stack_top_index = this.stack_top_index + 1 ;
		this.items[this.stack_top_index] = thing;
    return this;
	}
	
	this.pop = function () {
		if(this.stack_top_index > -1){
		  var top_item = this.items[this.stack_top_index];
		  this.stack_top_index--; 
			return top_item;
		} else {
			throw Error("stack empty");
		}
	}

  this.isEmpty = function (){
    return this.stack_top_index === -1;
  }
}

module.exports = Stack;
