// https://www.interviewcake.com/question/ruby/matching-parens
function matchingParens(string, paren_pos){
  var start = 0;
  var end = string.length - 1;
  
  var start_paren_count = 0;
  
  while(start != paren_pos) {
      if (string[start] == "(") start_paren_count++; 
      start++;
    }
  
  while(start_paren_count > 0 ) {
    
      if(string[end] == ")") start_paren_count--; 
      end--;
      
      if(end == paren_pos) return Error("parens mismatch");
      if (end === 0) return Error("no end parens");
    }
  
  return end;
}
