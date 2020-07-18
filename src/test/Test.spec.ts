import 'mocha';
import { expect } from 'chai';

describe('test for test', () => {
  context('normal', () => {
    it('should pass', async () => {
      expect(3).is.equal(3);
    });
  });
});
