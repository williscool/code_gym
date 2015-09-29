// https://www.interviewcake.com/question/ruby/bracket-validator
var Stack = require('../data_structures/stack.js').array;
function braketsNestedCorrectly(code_str) {

  var open_stack = new Stack(), close_stack = new Stack();
  
  var openers = "({[";
  var closers = ")}]";
  
  var i = 0;
  
  while(i < code_str.length) {
  
    if (openers.indexOf(code_str[i]) > -1) {
      open_stack.push(code_str[i]);
    } 
    else if (closers.indexOf(code_str[i]) > -1) {
    
      if(open_stack.isEmpty()){
        // reached a close but no more opens left so return false
        return false;
      } else {
        most_recent_unclosed_opener = open_stack.pop();
        
        index_of_closer = closers.indexOf(code_str[i]);
        index_of_opener = opener.indexOf(most_recent_unclosed_opener);
        
        // mismatched close/opener
        if(index_of_closer != index_of_opener) return false;
      }
    }
    i++;
  }
  
  return open_stack.isEmpty();
}
