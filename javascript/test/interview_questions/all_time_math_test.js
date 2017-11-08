import assert from 'assert';
import AllTimeMathObj from '../../interview_questions/all_time_math';

describe('All Time Min Max Mean and Mode Question', () => {
  const allTimeMath = new AllTimeMathObj();
  [1, 3, 6, 3, 1, 3].forEach((num) => {
    allTimeMath.insert(num);
  });
  it('Min', () => {
    assert.equal(allTimeMath.getMin(), 1);
  });
  it('Max', () => {
    assert.equal(allTimeMath.getMax(), 6);
  });
  it('Mean', () => {
    assert.equal(allTimeMath.getMean().toFixed(2), '2.83');
  });
  it('Mode', () => {
    assert.equal(allTimeMath.getMode(), 3);
  });
});
