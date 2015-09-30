// https://www.interviewcake.com/question/ruby/shuffle
//
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
//
// init unshuffled_place = 0; while unshuffled_place < list_length.
// 1. pick a random nunber between unshuffled_place (so that the item) and list length
// 2. swap item with that.
// 
//  unshuffled_place++
function fischerYatesShuffle(list){

  var len  = list.length;
  if (len <= 1) return list;
  
  for(var i=0 ; i < len ; i++) {
      
    random_choice_index = Math.random(i, len);
    
    swap(list, i, random_choice_index);
  }
  
  return list;
}
