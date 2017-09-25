import assert from 'assert';
import dsalgo from '../../../utilities';
import FlippinBits from '../../../algorithms/bit_manipulation/flippin_bits';

describe('Flipping Some Bits', () => {
  const fb = FlippinBits(2, 4);

  it('Binary Representation', () => {
    assert.equal(fb.binarya, '10');
    assert.equal(fb.binaryb, '100');
  });

  it('Not', () => {
    assert.deepEqual(dsalgo.utils.dec2bin(fb.nota), '11111111111111111111111111111101');
    assert.deepEqual(dsalgo.utils.dec2bin(fb.notb), '11111111111111111111111111111011');
  });

  it('And', () => {
    assert.equal(fb.and, 0);
  });

  it('Or', () => {
    assert.equal(fb.or, 6);
  });

  it('Xor', () => {
    assert.equal(fb.or, 6);
  });

  it('right shift', () => {
    const diffb = FlippinBits(4, 2);
    assert.equal(diffb.rightshifta_by_b, 1);
  });

  it('left shift', () => {
    const diffb = FlippinBits(4, 2);
    assert.equal(diffb.leftshifta_by_b, 16);
  });

  it('logical right shift', () => {
    const bitFlipper = FlippinBits(-8, 1);
    // leading zeros get dropped in the conversion
    assert.equal(dsalgo.utils.dec2bin(bitFlipper.logicalrightshifta_by_b), '1111111111111111111111111111100');
  });
});
