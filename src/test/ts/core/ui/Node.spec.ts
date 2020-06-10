import 'mocha';
import { expect } from 'chai';
import { Node } from '../../../../ts/core/ui/Node';
import { NodeStatus } from '../../../../ts/core/ui/NodeStatus';
import { NodeStatusUtil } from '../../../../ts/core/ui/utils/NodeStatusUtil';

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
    const tier2A = new Node();
    const tier2B = new Node();
    const tier3AA = new Node(); // dirty
    const tier3AB = new Node();
    const tier4AAA = new Node();
    const tier5AAAA = new Node();

    tier4AAA.pushNode(tier5AAAA);
    tier3AA.pushNode(tier4AAA);
    tier2A.pushNode(tier3AA, tier3AB);
    tier1.pushNode(tier2A, tier2B);

    // ルート最短距離の祖先ノードには伝染する
    // 子ノードには伝染する
    // それ以外には伝染しない
    tier3AA.dirty();
    
    it('tier1 shold be dirty', async () => {
      expect(tier1.isDirty()).is.true;
    });

    it('tier2A shold be dirty', async () => {
      expect(tier2A.isDirty()).is.true;
    });

    it('tier2B shold not be dirty', async () => {
      expect(tier2B.isDirty()).is.false;
    });

    it('tier3AA shold be dirty', async () => {
      expect(tier3AA.isDirty()).is.true;
    });

    it('tier3AB shold not be dirty', async () => {
      expect(tier3AB.isDirty()).is.false;
    });

    it('tier4AAA shold not be dirty', async () => {
      expect(tier4AAA.isDirty()).is.true;
    });

    it('tier5AAAA shold not be dirty', async () => {
      expect(tier5AAAA.isDirty()).is.true;
    });
  });
});

describe('node.destroy()', () => {
  context('normal', () => {
    const tier1 = new Node();
    const tier2A = new Node(); // destroy
    const tier2B = new Node();
    const tier3AA = new Node();
    const tier3AB = new Node();
    const tier4ABA = new Node();
    const tier4AAA = new Node();
    const tier5AAAA = new Node();

    tier4AAA.pushNode(tier5AAAA);
    tier3AA.pushNode(tier4AAA, tier4ABA);
    tier2A.pushNode(tier3AA, tier3AB);
    tier1.pushNode(tier2A, tier2B);

    tier2A.destroy();
    
    // check Destroyed flag
    it('tier2A shold be destroyed', async () => {
      expect(NodeStatusUtil.hasStatus(tier2A, NodeStatus.Destroyed)).is.true;
    });
    it('tier3AA shold be destroyed', async () => {
      expect(NodeStatusUtil.hasStatus(tier3AA, NodeStatus.Destroyed)).is.true;
    });
    it('tier3AB shold be destroyed', async () => {
      expect(NodeStatusUtil.hasStatus(tier3AB, NodeStatus.Destroyed)).is.true;
    });
    it('tier4AAA shold be destroyed', async () => {
      expect(NodeStatusUtil.hasStatus(tier4AAA, NodeStatus.Destroyed)).is.true;
    });
    it('tier4ABA shold be destroyed', async () => {
      expect(NodeStatusUtil.hasStatus(tier4ABA, NodeStatus.Destroyed)).is.true;
    });
    it('tier5AAAA shold be destroyed', async () => {
      expect(NodeStatusUtil.hasStatus(tier5AAAA, NodeStatus.Destroyed)).is.true;
    });
  });
});

describe('node.removeDestroyedFromTree()', () => {
  context('normal', () => {
    const tier1 = new Node();
    const tier2A = new Node(); // destroy
    const tier2B = new Node();
    const tier3AA = new Node();
    const tier3AB = new Node();
    const tier4ABA = new Node();
    const tier4AAA = new Node();
    const tier5AAAA = new Node();

    tier4AAA.pushNode(tier5AAAA);
    tier3AA.pushNode(tier4AAA, tier4ABA);
    tier2A.pushNode(tier3AA, tier3AB);
    tier1.pushNode(tier2A, tier2B);

    tier2A.destroy();

    tier1.removeDestroyedFromTree();
    
    // check removing destroyed node from tree
    it('should remove destroyed node from tier1', async () => {
      expect(tier1.children.length).equals(1);
    });
    it('should remove destroyed node from tier2A', async () => {
      expect(tier2A.children.length).equals(0);
    });
    it('should remove destroyed node from tier3AA', async () => {
      expect(tier3AA.children.length).equals(0);
    });
    it('should remove destroyed node from tier4AAA', async () => {
      expect(tier4AAA.children.length).equals(0);
    });

    // check removed node's parent is null
    it('tire2A.parent should be null', async () => {
      expect(tier3AA.parent).is.null;
    });
    it('tire3AA.parent should be null', async () => {
      expect(tier2A.parent).is.null;
    });
    it('tire3AB.parent should be null', async () => {
      expect(tier3AB.parent).is.null;
    });
    it('tire4AAA.parent should be null', async () => {
      expect(tier4AAA.parent).is.null;
    });
    it('tire4ABA.parent should be null', async () => {
      expect(tier4ABA.parent).is.null;
    });
    it('tire5AAAA.parent should be null', async () => {
      expect(tier2A.parent).is.null;
    });
  });
});