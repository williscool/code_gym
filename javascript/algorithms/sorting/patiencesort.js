var dsalgo = require('../../utilities.js').default;
var BinaryHeap = require('../../data_structures/heap/binary_heap.js').custom;
// https://en.wikipedia.org/wiki/Patience_sorting

// https://en.wikipedia.org/wiki/Patience_sorting#Python
// https://en.wikipedia.org/wiki/Patience_sorting#Go
function findPile(top_cards, n){

  var pos = dsalgo.utils.bisectRight(top_cards,n);
  if (pos === top_cards.length){
    // add a new topcar
    top_cards.push(n);
    return -1;
  } else {
    top_cards[pos] = n;
    return pos;
  }

}

module.exports = function(list, LIS_MODE) {

  var top_cards = [];
  var piles = [];

  var pile_id, newNum;

  for(var i = 0; i < list.length; i++) {
    newNum = list[i];

    pile_id = findPile(top_cards,newNum);

    if( pile_id === -1 ) {
      // create new pile with our value on top
      piles.push([newNum]);
    } else {
      piles[pile_id].push(newNum);
    }

  }

  if(LIS_MODE){
    return top_cards;
  }

  // piles are now created and we have our LIS in top piles
  // now create sorted list from piles
  var heap = new BinaryHeap([], function(a, b) {
    return a.value <= b.value;
  });

  for(var j = 0; j < piles.length; j++) {
    heap.insert({
      pile_id: j,
      value: piles[j].pop()
    });
  }

  var result = [];

  var num, pid, obj;

  while(heap.size() > 0) {
    obj = heap.pop();
    num = obj.value;
    pid = obj.pile_id;

    result.push(num);

    if(piles[pid].length > 0){
      num = piles[pid].pop();

      heap.insert({
        pile_id: pid,
        value: num
      });
    }

  }

  return result;
};
