import 'mocha';
import { expect } from 'chai';
import { Direction } from '../../../../../ts/core/ui/Direction';
import { Element } from '../../../../../ts/core/ui/Element';
import { Group } from '../../../../../ts/core/ui/group/Group';

describe('group.push', () => {
  context('normal', () => {
    const group = new Group();

    const elementA = new Element();
    const elementB = new Element();
    const elementC = new Element();

    group.push(elementA, elementB, elementC);

    it('group should have 3 elements', async () => {
      expect(group.entries.length).is.equal(3);
    });

    it('all elements anchor group by default', async () => {
      expect(elementA.anchor).is.equal(group);
      expect(elementB.anchor).is.equal(group);
      expect(elementC.anchor).is.equal(group);
    });
  });
});

describe('group.unshift', () => {
  context('normal', () => {
    const group = new Group();

    const elementA = new Element();
    const elementB = new Element();
    const elementC = new Element();

    group.unshift(elementA, elementB, elementC);

    it('group should have 3 elements', async () => {
      expect(group.entries.length).is.equal(3);
    });

    it('all elements anchor group by default', async () => {
      expect(elementA.anchor).is.equal(group);
      expect(elementB.anchor).is.equal(group);
      expect(elementC.anchor).is.equal(group);
    });
  });
});


describe('group.getNext', () => {
  context('normal', () => {
    const group = new Group();

    const elementA = new Element();
    const elementB = new Element();
    const elementC = new Element();

    group.push(elementA, elementB, elementC);

    const firstElement = group.getNext(Direction.Down);
    const secondElement = group.getNext(Direction.Down);

    it('currentIndex of grouop should be equal 1', async () => {
      expect(group.currentIndex).is.equal(1);
    });

    it('first element should be equal elementA by default (not use AlignmentStrategy)', async () => {
      expect(firstElement).is.equal(elementA);
    });

    it('second element should be equal elementB by default (not use AlignmentStrategy)', async () => {
      expect(secondElement).is.equal(elementB);
    });
  });
});