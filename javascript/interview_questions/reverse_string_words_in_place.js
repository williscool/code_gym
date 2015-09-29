// https://www.interviewcake.com/question/ruby/reverse-words
var dsalgo = require('../utilities.js').dsalgo;

function reverseWordsInPlace(string) {
  // string in javascript are immutable so for the purposes of this excerise we shall split the string into characters
  // and join them back together in the end
  //
  string = string.split("");

  var start_of_word = 0, end_of_word = string.length - 1;
  
  // reverse whole string in place first
  reverseCharactersInPlace(string, start_of_word, end_of_word);
  
  // need the equal to string.lenth for doing the last word
  for (var i = 0; i <= string.length; i++){
    
    if(string[i] === " " || string[i] === string[string.length]){
      end_of_word = i-1;
      reverseCharactersInPlace(string, start_of_word, end_of_word);
      start_of_word = i + 1;
    }
  }

  return string.join("");
}

function reverseCharactersInPlace(string, start, end){
  while(start < end){
    // does this in place
    string = dsalgo.utils.swap(string, start,end);
    start++;
    end--;
  }
  return string;
}

module.exports = reverseWordsInPlace;
