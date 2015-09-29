// https://www.interviewcake.com/question/ruby/delete-node
function deleteNode(node){
  
  var temp_prev = node;

  while(node.next){
    temp_prev.value = node.next.value;
    node = node.next;
  }

}


function deleteNode(node_to_delete){
  
  var next_node = node_to_delete.next;

  if(next_node){
    // copy old next nodes values
    node_to_delete.value = node_next.value;
    node_to_delete.next = node_next.next;
    // delete old_next_node
    node_next = null;
  } else {
    return Error("cannot delete last node with this method")
  }

}
