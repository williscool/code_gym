
import dsalgo from '../utilities';

/**
 * Now defunct (I can't find a link to it anymore) question from interview cake.
 *
 * Probably thought it was too easy lol. It pretty much is
 *
 * Very simple just a data structure that allows you to insert numbers and maintains
 *
 * The Min, Max, Mean and Mode of all of the numbers.
 *
 * No more complicated than that.
 *
 */
class AllTimeMath {
  constructor() {
    this.max = null;
    this.min = null;
    this.mean = null;
    this.mode = null;
    this.numValues = 0;
    this.sumOfValues = 0;
    this.occurences = [];
    this.mostOccurringValue = null;
  }

  insert(val) {
    if (this.numValues < 1) {
      // nothing is populated so populate it all
      this.min = val;
      this.max = val;
      this.mostOccurringValue = val;
    }

    this.numValues += 1;

    if (val > this.max) this.max = val;
    if (val < this.min) this.min = val;

    this.sumOfValues = this.sumOfValues + val;

    this.mean = this.sumOfValues / this.numValues;

    if (!dsalgo.utils.isDefined(this.occurences[val])) {
      this.occurences[val] = 0;
    }
    this.occurences[val] += 1;

    if (this.occurences[val] > this.occurences[this.mostOccurringValue]) {
      this.mostOccurringValue = val;
    }
  }
  getMax() {
    return this.max;
  }
  getMin() {
    return this.min;
  }
  getMean() {
    return this.mean;
  }
  getMode() {
    return this.mostOccurringValue;
  }
}

export default AllTimeMath;
