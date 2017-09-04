// https://en.wikipedia.org/wiki/Trie
// https://www.youtube.com/watch?v=3Hn9hLOljJI
//
// http://ejohn.org/blog/javascript-trie-performance-analysis/
// http://codereview.stackexchange.com/questions/25359/simple-trie-implementation-in-javascript
//
// http://algs4.cs.princeton.edu/52trie/
// http://algs4.cs.princeton.edu/lectures/52Tries.pdf
//
//
// how to get spelling suggestions out of a trie
//
// http://blog.afterthedeadline.com/2010/01/29/how-i-trie-to-make-spelling-suggestions/
var dsalgo = require('../utilities.js').default;

function Trie() {
  this.trie = {};
}

Trie.prototype.set = function(word) {

  // at the beginning currentNode is the whole trie
  var currentNode = this.trie;

  word.split("").forEach(function(letter, i){
    var pos = currentNode[letter];

    if(!dsalgo.utils.isDefined(pos)) {

      if(i === word.length - 1) {
        // at end of word. set its child to zero so we can tell that
        currentNode = currentNode[letter] = 0;
      } else {
        // not the end of a word. make it an object
        currentNode = currentNode[letter] = {};
      }

    }
    else if (pos === 0){
      // reached the end of a previosly added word. signify that and turn this position into an object so we can keep adding our new word
      // using * character to denote end of word
      currentNode = currentNode[letter] = {'*':0};
    } else {
      // no need to set anything just recurse in hash tree structure to lower level
      currentNode = currentNode[letter];
    }

  });

  return this;
};

Trie.prototype.get = function(word) {

  var node = this.trie,
  wordLength = word.length;


  for(var i=0; i < wordLength; i++){
    if(!dsalgo.utils.isDefined(node[word[i]])) break;
    node = node[word[i]];
  }

  if(i === wordLength) return true;

  return false;

};

module.exports = Trie;
