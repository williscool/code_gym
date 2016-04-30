// https://en.wikipedia.org/wiki/Palindrome
// https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/p/challenge-is-a-string-a-palindrome

// Returns the first character of the string str
var firstCharacter = function(str) {
    return str.slice(0, 1);
};

// Returns the last character of a string str
var lastCharacter = function(str) {
    return str.slice(-1);
};

// Returns the string that results from removing the first
//  and last characters from str
var middleCharacters = function(str) {
    return str.slice(1, -1);
};

var isPalindrome = function(str) {
    // base case #1
    if(str.length <= 1){
        return true;
    }
    // base case #2
    if(firstCharacter(str) !== lastCharacter(str)){
        return false;
    }
    // recursive case
    return isPalindrome(middleCharacters(str));
};

function isPalindromeIterative(str){
    
    var i = 0;
    var j = str.length - 1;
    
    while(i <= j) {
         if(str[i] !== str[j]) return false;
         i++;
         j--;
    }
    
    return true;
}

module.exports = {
  recursive: isPalindrome,
  iterative: isPalindromeIterative
};
