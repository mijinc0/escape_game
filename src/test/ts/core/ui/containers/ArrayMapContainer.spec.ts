import 'mocha';
import { expect } from 'chai';
import { Node } from '../../../../../ts/core/ui/Node';
import { Direction } from '../../../../../ts/core/ui/Direction';
import { IAlignmentStrategy } from '../../../../../ts/core/ui/containers/IAlignmentStrategy';
import { ArrayMapContainer } from '../../../../../ts/core/ui/containers/ArrayMapContainer';

class AlignmentStrategy implements IAlignmentStrategy {
  /**
   * 指定した量だけインデックスを進めていく
   */
  incrementSize: number;

  constructor(incrementSize: number) {
    this.incrementSize = incrementSize;
  }

  align(parentNode: Node): void {}

  getNextNodeIndex(index: number, direction: Direction): number {
    return index + this.incrementSize;
  };
}

describe('arrayMapContainer.pushNode()', () => {
  context('error', () => {
    const mappedData: string[] = [];

    const uiNodeFactoryCallback = (arg: string) => {
      return new Node();
    };
    
    const as = new AlignmentStrategy(1);
    const dataAddingSize = 3;
    const x = 0;
    const y = 0;
    const width = 0;
    const height = 0;
    const maxNodes = 5;

    const arrayMapContainer = new ArrayMapContainer(mappedData, uiNodeFactoryCallback, as, dataAddingSize, x, y, width, height, maxNodes);

    it('should throw', async () => {
      expect(() => {
        arrayMapContainer.pushNode();
      }).to.throw;
    });
  });
});

describe('arrayMapContainer.unshiftNode()', () => {
  context('error', () => {
    const mappedData: string[] = [];

    const uiNodeFactoryCallback = (arg: string) => {
      return new Node();
    };
    
    const as = new AlignmentStrategy(1);
    const dataAddingSize = 3;
    const x = 0;
    const y = 0;
    const width = 0;
    const height = 0;
    const maxNodes = 5;

    const arrayMapContainer = new ArrayMapContainer(mappedData, uiNodeFactoryCallback, as, dataAddingSize, x, y, width, height, maxNodes);

    it('should throw', async () => {
      expect(() => {
        arrayMapContainer.unshiftNode();
      }).to.throw;
    });
  });
});

describe('arrayMapContainer.getCurrent()', () => {
  context('normal', () => {
    const mappedData: number[] = [1,2,3,4,5,6];

    const uiNodeFactoryCallback = (arg: number) => {
      return new Node(arg);
    };
    
    const as = new AlignmentStrategy(1);
    const dataAddingSize = 3;
    const x = 0;
    const y = 0;
    const width = 0;
    const height = 0;
    const maxNodes = 10;

    const arrayMapContainer = new ArrayMapContainer(mappedData, uiNodeFactoryCallback, as, dataAddingSize, x, y, width, height, maxNodes);

    const current = arrayMapContainer.getCurrent();

    it('the node that is got by start index is null', async () => {
      expect(current).is.null;
    });
  });
});

describe('arrayMapContainer.getNext()', () => {
  // 最初のgetNextで先頭のノードが取得できるパターン
  // (childrenは内部で操作されない)
  context('normal', () => {
    const mappedData: number[] = [1, 2, 3, 4, 5, 6];

    // どのnumberから生成されたか分かるようにwidthにmappedDataの数字を入れる
    const uiNodeFactoryCallback = (arg: number) => {
      return new Node(arg);
    };
    
    const as = new AlignmentStrategy(1);
    const dataAddingSize = 3;
    const x = 0;
    const y = 0;
    const width = 0;
    const height = 0;
    const maxNodes = 10;

    const arrayMapContainer = new ArrayMapContainer(mappedData, uiNodeFactoryCallback, as, dataAddingSize, x, y, width, height, maxNodes);

    const beforeFrontCild = arrayMapContainer.children[0];
    const next = arrayMapContainer.getNext(Direction.Up);
    const afterFrontCild = arrayMapContainer.children[0];

    it('next node is created by mappedData[0]', async () => {
      expect(next.position.x).equals(1);
    });

    it('beforeFrontCild equals afterFrontCild', async () => {
      expect(beforeFrontCild).equals(afterFrontCild);
    });
  });

  // getNextによるchildrenの操作が加わるパターン
  // (内部でpushNodeが起こってchildrenの後ろにノードが追加される)
  context('normal 2 (index++)', () => {
    const mappedData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // どのnumberから生成されたか分かるようにxにmappedDataの数字を入れる
    const uiNodeFactoryCallback = (arg: number) => {
      return new Node(arg);
    };
    
    const as = new AlignmentStrategy(1);
    const dataAddingSize = 3;
    const x = 0;
    const y = 0;
    const width = 0;
    const height = 0;
    const maxNodes = 4;

    const arrayMapContainer = new ArrayMapContainer(mappedData, uiNodeFactoryCallback, as, dataAddingSize, x, y, width, height, maxNodes);

    arrayMapContainer.currentIndex = 3;

    const beforeChildrenSize = arrayMapContainer.children.length;
    const beforeLastChild = arrayMapContainer.children[beforeChildrenSize - 1];
    const current = arrayMapContainer.getCurrent();
    const next = arrayMapContainer.getNext(Direction.Up);
    const afterChildrenSize = arrayMapContainer.children.length;
    const afterLastChild = arrayMapContainer.children[afterChildrenSize - 1];

    console.log(arrayMapContainer.children.map(c => (c.position.x)));

    // 操作前も後もmaxNodesであることの確認
    it('before children size equals maxNodes', async () => {
      expect(beforeChildrenSize).equals(maxNodes);
    });

    it('after children size equals maxNodes', async () => {
      expect(afterChildrenSize).equals(maxNodes);
    });

    // indexが1つ増えるのに対して、dataAddingSize分のノードが追加されていることの確認
    it('before last node is created by 4', async () => {
      expect(beforeLastChild.position.x).equals(4);
    });

    it('after last node is created by 7', async () => {
      expect(afterLastChild.position.x).equals(7);
    });

    // nextNodeの結果が正しいことの確認
    it('current node is created by 4', async () => {
      expect(current.position.x).equals(4);
    });

    it('next node is created by 5', async () => {
      expect(next.position.x).equals(5);
    });
  });

  // getNextによるchildrenの操作が加わるパターン
  // (内部でunshiftNodeが起こってchildrenの前方にノードが追加される)
  context('normal 3 (index--)', () => {
    const mappedData: number[] = [6, 7, 8, 9];

    // どのnumberから生成されたか分かるようにwidthにmappedDataの数字を入れる
    const uiNodeFactoryCallback = (arg: number) => {
      return new Node(arg);
    };

    // new AlignmentStrategyの引数を負の値にすることでgetNextの度にインデックスが前に戻る
    const as = new AlignmentStrategy(-1);
    const dataAddingSize = 3;
    const x = 0;
    const y = 0;
    const width = 0;
    const height = 0;
    const maxNodes = 4;

    const arrayMapContainer = new ArrayMapContainer(mappedData, uiNodeFactoryCallback, as, dataAddingSize, x, y, width, height, maxNodes);

    // 後からarrayDataの配列に[1,2,3,4,5]を差し込むことでchildrenの操作が進んだ状態にする
    arrayMapContainer.arrayData.splice(0, 0, ...[3, 4, 5]);
    arrayMapContainer.currentIndex = 0;

    const beforeChildrenSize = arrayMapContainer.children.length;
    const beforeFirstChild = arrayMapContainer.children[0];
    const current = arrayMapContainer.getCurrent();
    const next = arrayMapContainer.getNext(Direction.Up);
    const afterChildrenSize = arrayMapContainer.children.length;
    const afterFirstChild = arrayMapContainer.children[0];

    // 操作前も後もmaxNodesであることの確認
    it('before children size equals maxNodes', async () => {
      expect(beforeChildrenSize).equals(maxNodes);
    });

    it('after children size equals maxNodes', async () => {
      expect(afterChildrenSize).equals(maxNodes);
    });

    // indexが1つ減るのに対して、dataAddingSize分のノードが前方に追加されていることの確認
    it('after first node is created by 6', async () => {
      expect(beforeFirstChild.position.x).equals(6);
    });

    it('after first node is created by 3', async () => {
      expect(afterFirstChild.position.x).equals(3);
    });

    // nextNodeの結果が正しいことの確認
    it('current node is created by 6', async () => {
      expect(current.position.x).equals(6);
    });

    it('next node is created by 5', async () => {
      expect(next.position.x).equals(5);
    });
  });

  // arrayDataが操作途中で終端に到達したパターン
  context('normal 4', () => {
    const mappedData: number[] = [1, 2, 3];

    // どのnumberから生成されたか分かるようにwidthにmappedDataの数字を入れる
    const uiNodeFactoryCallback = (arg: number) => {
      return new Node(arg);
    };

    const as = new AlignmentStrategy(1);
    const dataAddingSize = 2;
    const x = 0;
    const y = 0;
    const width = 0;
    const height = 0;
    const maxNodes = 2;

    const arrayMapContainer = new ArrayMapContainer(mappedData, uiNodeFactoryCallback, as, dataAddingSize, x, y, width, height, maxNodes);

    arrayMapContainer.currentIndex = 1;

    const beforeChildrenSize = arrayMapContainer.children.length;
    const beforeLastChild = arrayMapContainer.children[1];
    const next = arrayMapContainer.getNext(Direction.Up);
    const afterChildrenSize = arrayMapContainer.children.length;
    const afterLastChild = arrayMapContainer.children[1];

    // 操作前も後もmaxNodesであることの確認
    it('before children size equals maxNodes', async () => {
      expect(beforeChildrenSize).equals(maxNodes);
    });

    it('after children size equals maxNodes', async () => {
      expect(afterChildrenSize).equals(maxNodes);
    });

    // indexが1つ増えるのに対して、dataAddingSize分のノードを加えようとしたが、
    // arrayDataの終端に達してしまったので可能な範囲で追加されたことを確認する
    it('after first node is created by 2', async () => {
      expect(beforeLastChild.position.x).equals(2);
    });

    it('after first node is created by 3', async () => {
      expect(afterLastChild.position.x).equals(3);
    });

    // nextNodeの結果が正しいことの確認
    it('next node is created by 3', async () => {
      expect(next.position.x).equals(3);
    });
  });
});