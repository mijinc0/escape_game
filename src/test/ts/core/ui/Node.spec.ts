import 'mocha';
import { expect } from 'chai';
import { Node } from '../../../../ts/core/ui/Node';

describe('node.pushNode()', () => {
  context('normal', () => {
    const parent = new Node();
    const childA = new Node();
    const childB = new Node();

    parent.pushNode(childA, childB);

    it('should be set parent/child relational information 1', async () => {
      expect(parent.children[0]).is.equal(childA);
      expect(parent.children[1]).is.equal(childB);
    });

    it('should be set parent/child relational information 2', async () => {
      expect(childA.parent).is.equal(parent);
    });

    it('should be set parent/child relational information 3', async () => {
      expect(childB.parent).is.equal(parent);
    });
  });
});

describe('node.unshiftNode()', () => {
  context('normal', () => {
    const parent = new Node();
    const childA = new Node();
    const childB = new Node();

    parent.unshiftNode(childA, childB);

    it('should be set parent/child relational information 1', async () => {
      expect(parent.children[0]).is.equal(childA);
      expect(parent.children[1]).is.equal(childB);
    });

    it('should be set parent/child relational information 2', async () => {
      expect(childA.parent).is.equal(parent);
    });

    it('should be set parent/child relational information 3', async () => {
      expect(childB.parent).is.equal(parent);
    });
  });
});

describe('node.dirty()', () => {
  context('normal', () => {
    const tier1 = new Node();
    const tire2A = new Node();
    const tire2B = new Node();
    const tire3AA = new Node(); // dirty
    const tire3AB = new Node();
    const tire4AAA = new Node();
    const tire5AAAA = new Node();

    tire4AAA.pushNode(tire5AAAA);
    tire3AA.pushNode(tire4AAA);
    tire2A.pushNode(tire3AA, tire3AB);
    tier1.pushNode(tire2A, tire2B);

    // ルート最短距離の祖先ノードには伝染する
    // 子ノードには伝染する
    // それ以外には伝染しない
    tire3AA.dirty();
    
    it('tire1 shold be dirty', async () => {
      expect(tier1.isDirty()).is.true;
    });

    it('tire2A shold be dirty', async () => {
      expect(tire2A.isDirty()).is.true;
    });

    it('tire2B shold not be dirty', async () => {
      expect(tire2B.isDirty()).is.false;
    });

    it('tire3AA shold be dirty', async () => {
      expect(tire3AA.isDirty()).is.true;
    });

    it('tire3AB shold not be dirty', async () => {
      expect(tire3AB.isDirty()).is.false;
    });

    it('tire4AAA shold not be dirty', async () => {
      expect(tire4AAA.isDirty()).is.true;
    });

    it('tire5AAAA shold not be dirty', async () => {
      expect(tire5AAAA.isDirty()).is.true;
    });
  });
});