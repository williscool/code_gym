// https://github.com/simonkrenger/bfh-konzepte-methoden-prog/blob/master/ch11/src/ex05/SubstringGenerator.java
function rSubstringsOfString(rest){
  
  var substrings = []
  if(rest.length === 0){
    return substrings;
  } else{
    substrings = substrings.concat( rSubstringsOfString( rest.slice(1), substrings ))

    for(var i = 1; i <= rest.length; i++) {
      substrings = substrings.concat([rest.slice(0,i)]);
    }
  }
  
  return substrings;
}

// http://www.programmingsimplified.com/java/source-code/java-program-find-substrings-of-string
function iSubstringsOfString(str){
 
  var substrings = []
  
  // c for character
  for(var c = 0; c < str.length; c++) {
    for(var i = 1;  i <= str.length - c ; i++){
      substrings = substrings.concat([str.slice(c, c+i)]);
    }
  }

  return substrings;
}

module.exports = {
  iterative: iSubstringsOfString,
  recursive: rSubstringsOfString
};
