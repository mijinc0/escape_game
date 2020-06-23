import 'mocha';
import { expect } from 'chai';
import { Element } from '../../../../ts/core/ui/Element';

describe('element.x + element.anchor', () => {
  context('normal', () => {
    const elementA = new Element(10, 20);
    const elementB = new Element(77, 2, 0, 0, elementA);

    it('x of elemntB (anchoring elementA) should anchor A', async () => {
      expect(elementB.x).is.equal(10 + 77);
    });

    it('y of elemntB (anchoring elementA) should anchor A', async () => {
      expect(elementB.y).is.equal(20 + 2);
    });
  });

  context('normal', () => {
    const elementA = new Element(10, 20);
    const elementB = new Element(28, 44, 0, 0, elementA);
    const elementC = new Element(19, 4, 0, 0, elementB);

    it('x of elemntB (anchoring elementA) should anchor A', async () => {
      expect(elementB.x).is.equal(10 + 28);
    });

    it('y of elemntB (anchoring elementA) should anchor A', async () => {
      expect(elementB.y).is.equal(20 + 44);
    });

    it('x of elemntC (anchoring elementA) should anchor B', async () => {
      expect(elementC.x).is.equal(10 + 28 + 19);
    });

    it('y of elemntC (anchoring elementA) should anchor B', async () => {
      expect(elementC.y).is.equal(20 + 44 + 4);
    });
  });
});