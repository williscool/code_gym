// https://www.interviewcake.com/question/ruby/linked-list-cycles
// https://en.wikipedia.org/wiki/Cycle_detection
function containsCycle(list) {
  var current_node = list.head;

  var slow_pointer = current_node;
  var fast_pointer = current_node.next;
  
  // zero or one nodes
  if( !slow_pointer || !fast_pointer) return false;
  
  // this runs forever until slow point and fast pointer catch each other
  // could remove the cycle with tail and head check for implementations that dont do that
  while(current_node.next && current.next != list.head){
    if((slow_pointer === fast_pointer) && current.next && current.next) return true;
    slow_pointer = current_node.next;
    fast_pointer = slow_pointer.next;
  }
  
  return false;
}

function containsCycleCleaner(list) {

  var slow_pointer = list.head;
  var fast_pointer = list.head;
  
  while(fast_pointer && fast_pointer.next) {
    
    slow_pointer = slow_pointer.next;
    fast_pointer = fast_pointer.next.next;
    
    if(slow_pointer === fast_pointer) return true;
  }
  
  return false;
}
