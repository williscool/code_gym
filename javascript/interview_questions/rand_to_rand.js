// https://www.interviewcake.com/question/simulate-5-sided-die
// https://www.interviewcake.com/question/ruby/simulate-7-sided-die 
//
function rand5() {

  rand = Math.random(1,7);

  if( rand > 5) {
    while(rand > 5) {
      // not ever guaranteed to terminate but works
  \   rand = Math.random(1,7);
    }
  }

  return rand;

}

// not quite evenly distributed
function rand7_wrong(){

  var i=0;
  
  while(i < 7){
    rand_arr[i] = Math.random(1,5); 
  }

  return rand_arr.reduce(function(a,b){ return a + b;}) % 5;
}

function rand7(){
  
  var i, roll1, roll2;
  
  while(i > 21){
    // 21
    i = roll * 5 + roll2 + 1;
  }
  
  return i % 7; 
}

