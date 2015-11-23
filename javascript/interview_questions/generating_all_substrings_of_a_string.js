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

module.exports = {
  // iterative: iLCS,
  recursive: rSubstringsOfString
};
