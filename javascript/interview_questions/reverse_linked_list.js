// https://www.interviewcake.com/question/ruby/reverse-linked-list
function reverseLinkedList(list){
  var current_node = list.head, next_node = null, previous = null;
  
  while(current_node){
    
    // grab a point to our next node before we mess with it
    next_node = current_node.next;
    
    // set out current node's next to the previous value
    // note the old head will now point to null ending the list of course
    current_node.next = previous; 
    
    // now we set our current node as what will be the next node addressed by this while loops's previous
    previous = current_node;
    
    // finally we move to our old next node to repeat this process
    current_node = next_node;
  }
  
  return current_node;
}
