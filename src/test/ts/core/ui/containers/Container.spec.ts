import 'mocha';
import { expect } from 'chai';
import { Node } from '../../../../../ts/core/ui/Node';
import { Direction } from '../../../../../ts/core/ui/Direction';
import { IAlignmentStrategy } from '../../../../../ts/core/ui/containers/IAlignmentStrategy';
import { Container } from '../../../../../ts/core/ui/containers/Container';

class AlignmentStrategy implements IAlignmentStrategy {
  align(parentNode: Node): void {}

  getNextNodeIndex(index: number, direction: Direction): number {
    return index + 1;
  };
}

describe('container.pushNode()', () => {
  context('maxNode = -1', () => {
    const as = new AlignmentStrategy();
    const container = new Container(as);

    container.pushNode(
      new Node(),
      new Node(),
      new Node(),
      new Node(),
      new Node(),
    );

    it('container has 5 nodes', async () => {
      expect(container.children.length).is.equal(5);
    });
  });

  context('maxNode = 5', () => {
    const as = new AlignmentStrategy();
    const x = 0;
    const y = 0;
    const width = 0;
    const height = 0;
    const maxNodes = 5;
    const container = new Container(as, x, y, width, height, maxNodes);
    
    container.pushNode(
      new Node(),
      new Node(),
      new Node(),
      new Node(),
      new Node(),
    );
    
    const targetNode = new Node();
    container.pushNode(targetNode);

    it('container has 5 nodes and last node is trgetNode', async () => {
      expect(container.children.length).is.equal(5);
      expect(container.children[4]).is.equal(targetNode);
    });
  });
});

describe('container.unshiftNode()', () => {
  context('maxNode = -1', () => {
    const as = new AlignmentStrategy();
    const x = 0;
    const y = 0;
    const width = 0;
    const height = 0;
    const container = new Container(as, x, y, width, height);

    container.unshiftNode(
      new Node(),
      new Node(),
      new Node(),
      new Node(),
      new Node(),
    );

    it('container has 5 nodes', async () => {
      expect(container.children.length).is.equal(5);
    });
  });

  context('maxNode = 5', () => {
    const as = new AlignmentStrategy();
    const x = 0;
    const y = 0;
    const width = 0;
    const height = 0;
    const maxNodes = 5;
    const container = new Container(as, x, y, width, height, maxNodes);
    
    container.unshiftNode(
      new Node(),
      new Node(),
      new Node(),
      new Node(),
      new Node(),
    );
    
    const targetNode = new Node();
    container.unshiftNode(targetNode);

    it('container has 5 nodes and first node is trgetNode', async () => {
      expect(container.children.length).is.equal(5);
      expect(container.children[0]).is.equal(targetNode);
    });
  });
});

describe('container.getNext()', () => {
  context('nomal', () => {
    const as = new AlignmentStrategy();
    const container = new Container(as);

    const targetNode = new Node();

    container.pushNode(
      new Node(),
      new Node(),
      targetNode,
    );

    container.getNext(Direction.Up);
    container.getNext(Direction.Up);
    const checkNode = container.getNext(Direction.Up);

    it('container\'s current index should be 2', async () => {
      expect(container.currentIndex).is.equal(2);
    });

    it('checkNode should be targetNode', async () => {
      expect(checkNode).is.equal(targetNode);
    });
  });

  describe('container.getCurrent()', () => {
    context('nomal', () => {
      const as = new AlignmentStrategy();
      const container = new Container(as);
  
      const targetNode = new Node();
  
      container.pushNode(
        targetNode,
      );
  
      const firstCurrentNode = container.getCurrent();
      container.getNext(Direction.Up);
      const secondCurrentNode = container.getCurrent();
  
      it('firstNode should be null', async () => {
        expect(firstCurrentNode).is.null;
      });
  
      it('secondNode should be targetNode', async () => {
        expect(secondCurrentNode).is.equal(targetNode);
      });
    });
  });
  
});
