// var sys = require("util");
// sys.puts(sys.inspect(someVariable));
//
// working BST
// add / remove / travese in, pre, and post order

var Node = function (val) { 
  return {left: null, right: null, value: val};
};

var BST = module.exports = function() {this.root = null;};

BST.prototype = {
    constructor: BST,

    add: function (value){
      var current;

      if (this.root === null) {
        this.root = new Node(value);
        return;
      }

      current = this.root;

      // iterate forever until I say stop
      while(true) {

        if (value < current.value) {
          //if no left, then new node goes on lef
          if (current.left === null){
              current.left = new Node(value);
              return;
          } else {                    
              current = current.left;
          }
        }
        else if (value > current.value ){
          if (current.right === null){
              current.right = new Node(value);
              return;
          } else {                    
              current = current.right;
          }
        }
        else {break;} // value is equal to an existing value so do nothing
      }

    },

    contains: function(value) {

        var found       = false,
            current     = this.root;
            parent      = null;
            
        while(!found && current) {
        
            //if the value is less than the current node's, go left
            if (value < current.value){
              parent = current;
              current = current.left;
                
            //if the value is greater than the current node's, go right
            } else if (value > current.value){
              parent = current;
              current = current.right;
                
            //value equal, it was found
            } else {
                found = [current,parent];
            }
        }
        
        //only proceed if the node was found
        return found;
    },

    remove: function(value) {

     var parent  = null,
     childCount,
     replacement,
     replacementParent; 

     var found = this.contains(value);

     // no need to look to remove node if it wasn't found
      if (!!found){ // http://james.padolsey.com/javascript/truthy-falsey/
       var current = found[0];
           parent = found[1];
      
          //figure out how many children
          childCount = (!!current.left ? 1 : 0) + (!!current.right ?  1 : 0);
      
          //special case: the value is at the root
          if (current === this.root){
              switch(childCount){
              
                  //no children, just erase the root
                  case 0:
                      this.root = null;
                      break;
                      
                  //one child, use one as the root
                  case 1:
                      this.root = (!current.right ? current.left : current.right);
                      break;
                      
                  //two children, little work to do
                  case 2:

                      //new root will be the old root's left child...maybe
                      replacement = this.root.left;
                      
                      //find the right-most leaf node to be the real new root
                      while (!!replacement.right) {
                          replacementParent = replacement;
                          replacement = replacement.right;
                      }
       
                      //it's not the first node on the left
                      if (!!replacementParent){
                      
                          //remove the new root from it's previous position
                          replacementParent.right = replacement.left;
                          
                          //give the new root all of the old root's children
                          replacement.right = this.root.right;
                          replacement.left = this.root.left;
                      } else {
                      
                          //just assign the children
                          replacement.right = this.root.right;
                      }
                      
                      //officially assign new root
                      this.root = replacement;
                  
                  //no default
              
              }        

          //non-root values
          } else {
          
              switch (childCount){
              
                  //no children, just remove it from the parent
                  case 0:
                      //if the current value is less than its parent's, null out the left pointer
                      if (current.value < parent.value){
                          parent.left = null;
                          
                      //if the current value is greater than its parent's, null out the right pointer
                      } else {
                          parent.right = null;
                      }
                      break;
                      
                  //one child, just reassign to parent
                  case 1:
                      //if the current value is less than its parent's, reset the left pointer
                      if (current.value < parent.value){
                          parent.left = (!current.left ? current.right : current.left);
                          
                      //if the current value is greater than its parent's, reset the right pointer
                      } else {
                          parent.right = (!current.left ? current.right : current.left);
                      }
                      break;    

                  //two children, a bit more complicated
                  case 2:
                  
                      //reset pointers for new traversal
                      replacement = current.left;
                      replacementParent = current;
                      
                      //find the right-most node
                      while(!!replacement.right){
                          replacementParent = replacement;
                          replacement = replacement.right;                            
                      }
                  
                      replacementParent.right = replacement.left;
                      
                      //assign children to the replacement
                      replacement.right = current.right;
                      replacement.left = current.left;
                      
                      //place the replacement in the right spot
                      if (current.value < parent.value){
                          parent.left = replacement;
                      } else {
                          parent.right = replacement;
                      }                        
                                      
                  //no default
              
              }
          
          }
      
      }
    
    },

    traverse: function(process, order){

      //helper function
      function inOrder(node){
          if (node){
              
              //traverse the left subtree
              if (node.left !== null){
                  inOrder(node.left);
              }            
              
              //call the process method on this node
              process.call(this, node);
          
              //traverse the right subtree
              if (node.right !== null){
                  inOrder(node.right);
              }
          }        
      }

      function preOrder(node){
          if (node){

              //call the process method on this node
              process.call(this, node);
              
              //traverse the left subtree
              if (node.left !== null){
                  preOrder(node.left);
              }            
              
              //traverse the right subtree
              if (node.right !== null){
                  postOrder(node.right);
              }
          }        
      }

      // useful for storing
      // http://leetcode.com/2010/09/saving-binary-search-tree-to-file.html
      function postOrder(node){
          if (node){
              
              //traverse the left subtree
              if (node.left !== null){
                  postOrder(node.left);
              }            
              
          
              //traverse the right subtree
              if (node.right !== null){
                  postOrder(node.right);
              }

              //call the process method on this node
              process.call(this, node);
          }        
      }

      
      //start with the root
      if(order == 'pre') {
        preOrder(this.root);
      }
      else if (order == 'post') {
        postOrder(this.root);    
      } else{
        //default to in Order
        inOrder(this.root);    
      }

    },
    levels: function () {
         if(!this.root){return []}

         var levels = [];
         var currentLevel = [];
         var nextLevel = [];

         // start out with root
         var current = this.root;
         var childCount = (!!current.left ? 1 : 0) + (!!current.right ?  1 : 0);

         if(childcount === 0){
            return [this.root]
         } else {
           currentLevel.push(current)
         }

         function walkLevel(element, index, array){
           current = element;
           childCount = (!!current.left ? 1 : 0) + (!!current.right ?  1 : 0);

           if(childcount === 0){
             return ; //add nothing to next level
           } else {

             if(!!current.left) {
               nextLevel.push(current.left)
             }

             if(!!current.right) {
               nextLevel.push(current.right)
             }
           }
         }

         while(true) {

           levels.push(currentLevel);

           currentLevel.forEach(walkLevel);

           if (nextLevel.length === 0){
             // computation over. no more levels to this shit
             break;
           } else {
             currentLevel = nextLevel;
             nextLevel = [];
           }
         }
      
        return levels;
    },
    size: function(){
      var length = 0;
      
      this.traverse(function(node){
          length++;
      });
      
      return length;
    },

    height: function(){
      if(!this.root){
        return 0
      } else {
        var lheight = this.height(node.left)
        var rheight = this.height(node.right)

        if (lheight > rheight){
          return(lheight+1);
        } else{
         return(rheight+1);
        }
      }
    },

    toArray: function(order){
      var result = [];
      
      this.traverse(function(node){
          result.push(node.value);
      }, order);
      
      return result;
    },

    toString: function(){
      return this.toArray().toString();
    }

};

//exports.binary_search_tree = function () {
//  return BST;
//};
