import 'mocha';
import { expect } from 'chai';
import { Direction } from '../../../../../ts/core/ui/Direction';
import { Element } from '../../../../../ts/core/ui/Element';
import { RangeAlignmentHandler } from '../../../../../ts/core/ui/group/RangeAlignmentHandler';

describe('rangeAlignmentHandler: Drection.Down', () => {
  context('normal', () => {
    const ah = new RangeAlignmentHandler(10, Direction.Down);

    const root = new Element(10, 20);
    const elementA = new Element();
    const elementB = new Element();
    const elementC = new Element();

    ah.align([elementA, elementB, elementC], root)

    // anchor setting
    it('elementA.anchor should be equal root', async () => {
      expect(elementA.anchor).is.equal(root);
    });
    it('elementB.anchor should be equal root', async () => {
      expect(elementB.anchor).is.equal(root);
    });
    it('elementC.anchor should be equal root', async () => {
      expect(elementC.anchor).is.equal(root);
    });

    // position setting
    it('elementA.x should be root.x', async () => {
      expect(elementA.x).is.equal(root.x);
    });
    it('elementA.y should be root.y', async () => {
      expect(elementA.y).is.equal(root.y);
    });

    it('elementB.x should be root.x', async () => {
      expect(elementB.x).is.equal(root.x);
    });
    it('elementB.y should be equal (elementA.y + elementA.height + 10)', async () => {
      expect(elementB.y).is.equal(elementA.y + elementA.height + 10);
    });

    it('elementC.x should be root.x', async () => {
      expect(elementC.x).is.equal(root.x);
    });
    it('elementC.y should be equal (elementB.y + elementB.height + 10)', async () => {
      expect(elementC.y).is.equal(elementB.y + elementB.height + 10);
    });
  });
});