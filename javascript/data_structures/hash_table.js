// A bucket per the wikipedia entry (http://en.wikipedia.org/wiki/Hash_table) is an index in the main items array
//
// this uses chaining with an array for collisions and its technically this strategy http://en.wikipedia.org/wiki/Hash_table#Separate_chaining_with_other_structures
//
// this is basically we replace the key value with a nested arrays key value pairs once we get a collision)
// another way to handle that is using a linked list for the same thing
//
//  example of that here : https://github.com/Bishop92/JavaScript-Data-Structures/blob/master/lib/HashTable/HashTable.js
//
//  this would have been inspired by that but I wanted to support string keys and have a simpler implementation so its inspired by
//  https://gist.github.com/alexhawkins/f6329420f40e5cafa0a4
//
//  for my own reference chaining is juxtaposed against the other strategy confusingly (to me at first at least) named "open addressing"
//  all that means is you dont chain. you just have a function that picks another slot when you collide.
//
// It can be as simple as just incrementing by 1 to the next bucket or as complex as another hashing function. 
// see here for more details http://en.wikipedia.org/wiki/Hash_table#Open_addressing
//
// also decided to make it (mostly) conform to es6 Map api because why not. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

function HashTable(size) {
  if(!size) {size = 8};
  this.items = [];
  this.length = 0;
  this.limit = size;
}

HashTable.prototype.hashFunc = function(str, max) {
  // TODO: should probably return an error when you dont provide a str key
  var hash = 0;
  if(!max) {max = this.limit};
  for (var i = 0; i < str.length; i++) {
    var letter = str[i];
    hash = (hash << 5) + letter.charCodeAt(0);
    hash = hash % max;
  }
  return hash;
};

HashTable.prototype.set = function(key, val){

  // computer index with hashing function
  var index = this.hashFunc(key, this.limit);

  //get bucket at index
  var bucket = this.items[index];

  // create it iff it doesnt exist
  if(!bucket) {
    bucket = [];
    this.items[index] = bucket;
  }

  // check bucket to see if we are updating a previously inserted value
  var overwrite = false;

  for (var i = 0; i < bucket.length; i++) {
    var obj = bucket[i];

    if(!!obj[key]) {
       obj[key] = val;
       overwrite = true;
    }
  }

  if(!overwrite){
    // add new key val pair to bucket
    var obj = {};
    obj[key] = val;
    bucket.push(obj);
    this.length++;
  }

  // if we have filled with 3/4 of value limit increase its size
  if(this.length > this.limit * 0.75){
    this.resize(this.limit * 2);
  }

  return this;
}

HashTable.prototype.get = function(key){
  var index = this.hashFunc(key, this.limit);
  var bucket = this.items[index];
  result = null;
 
  if (!bucket) {
    return result;
  }
 
  for (var i = 0; i < bucket.length; i++) {
    var obj = bucket[i];

    if(!!obj[key]) {
      result = obj[key];
    }
  }
 
  return result;
}

HashTable.prototype.has = function(key){
  if(this.get(key)){
    return true;
  } else {
    return false;
  }
}

HashTable.prototype.delete = function(key){
  var index = this.hashFunc(key, this.limit);
  var bucket = this.items[index];
  result = null;
 
  if (!bucket) {
    return result;
  }
 
  for (var i = 0; i < bucket.length; i++) {
    var obj = bucket[i];

    if(!!obj[key]) {
      result = obj[key];
      bucket.splice(i,1); // remove the element at this index
      this.length--;

    }
  }

  return result;
}

HashTable.prototype.resize = function(newLimit){
  var oldItems = this.items; 

  this.limit = newLimit;
  
  // reset properties as they will be recalculated as hash table is resized
  this.length = 0;
  this.items = [];

  for (var i = 0; i < oldItems.length; i++) {
    var bucket = oldItems[i];

    if (!bucket) {
      // need continue here not break
      // http://stackoverflow.com/questions/6414/c-sharp-loop-break-vs-continue
       continue; 
    }

    for (var j = 0; j < bucket.length; j++) {
      var obj = bucket[j];
      var key = Object.keys(obj)[0];
      var val = obj[key];

      this.set(key,val);
    }
  }
 
  return result;
}

module.exports = HashTable;
