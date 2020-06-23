import 'mocha';
import { expect } from 'chai';
import { MathUtil } from '../../../../../ts/core/ui/utils/MathUtil';

describe('MathUtil.clamp', () => {
  context('normal (10 < x < 30)', () => {
    it('5 should be clamped 10', async () => {
      expect(MathUtil.clamp(5, 10, 30)).is.equal(10);
    });

    it('40 should be clamped 30', async () => {
      expect(MathUtil.clamp(40, 10, 30)).is.equal(30);
    });
  });
});