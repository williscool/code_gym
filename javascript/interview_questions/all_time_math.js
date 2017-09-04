var dsalgo = require('../utilities.js').default;

function AllTimeMath() {
  this.max = null;
  this.min = null;
  this.mean = null;
  this.mode = null;
  this.numValues = 0;
  this.sumOfValues = 0;
  this.occurences = dsalgo.utils.simpleArrayFill(0,111);
  this.mostOccurringValue = null;
}

AllTimeMath.prototype = {
   insert: function (val){
    if(this.numValues < 1) {

      // nothing is populated so populate it all
      this.min = val;
      this.max = val;
      this.mostOccurringValue = val;
    }

    this.numValues++;

    if(val > this.max) this.max = val;
    if(val < this.min) this.min = val;

    this.sumOfValues = this.sumOfValues + val;

    this.mean = this.sumOfValues / this.numValues;

    this.occurences[val]++;

    if(this.occurences[val] > this.occurences[this.mostOccurringValue]){
      this.mostOccurringValue = val;
    }
   },
   get_max: function(){
     return this.max;
   },
   get_min: function(){
     return this.min;
   },
   get_mean: function(){
     return this.mean;
   },
   get_mode: function(){
     return this.mostOccurringValue;
   }
};

module.exports = AllTimeMath;
