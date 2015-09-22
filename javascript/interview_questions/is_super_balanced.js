// https://www.interviewcake.com/question/balanced-binary-tree

var Stack = require('../data_structures/stack.js').array;

function isSuperBalanced(bst) {
		
	var nodeStack = new Stack(), depths = [];

	var currentNodeInfoArr, current_node, current_depth;

	var isSbal = true;
	
	nodeStack.push([bst.root, 0]);
	
	while(!nodeStack.isEmpty()) {
		
		currentNodeInfoArr = nodeStack.pop();
		current_node = currentNodeInfoArr[0];
		current_depth = currentNodeInfoArr[1];
		
		// end of a branch and as such we have a leaf node
		if(current_node.left === null && current_node.right === null) {
		
			if(depths.indexOf(current_depth) < 0){
				depths.push(current_depth);
			}
			
			if(depths.length > 1){
			
				if(Math.abs(depths[0] - depths[1]) > 1) {
					isSbal = false;
					break;
				}
				
				if(depths.length > 2) {

					if( Math.abs(depths[0] - depths[1]) > 1 || Math.abs(depths[0] - depths[2] ) > 1 || Math.abs(depths[1] - depths[2])) {
						isSbal = false;
						break;
					}
				}
				
			}
		
		}
		
    // in either of these cases the current node is not a leaf. we just push it on the node stack to keep going further down the tree all at once
		if(current_node.left !== null) {
			nodeStack.push([current_node.left, current_depth + 1]);
		}
		
		if(current_node.right !== null) {
			nodeStack.push([current_node.right, current_depth + 1]);
		}
	}
	
	return isSbal;
}


module.exports = isSuperBalanced;
