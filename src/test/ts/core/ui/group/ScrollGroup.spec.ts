import 'mocha';
import { expect } from 'chai';
import { Direction } from '../../../../../ts/core/ui/Direction';
import { Element } from '../../../../../ts/core/ui/Element';
import { IElement } from '../../../../../ts/core/ui/IElement';
import { ScrollGroup } from '../../../../../ts/core/ui/group/ScrollGroup';
import { IAlignmentHandler } from '../../../../../ts/core/ui/group/IAlignmentHandler';

class TestAlignmentHandler implements IAlignmentHandler {
  align(elements: IElement[], anchor?: IElement): void {};

  getNextIndex(currentIndex: number, direction: Direction): number {
    return (direction === Direction.Down || direction === Direction.Right) ? (currentIndex + 1) : (currentIndex - 1); 
  };
}

describe('scrollGroup.push', () => {
  context('normal (maxSize = 5, scrollSize = 2)', () => {
    const maxSize = 5;
    const scrollSize = 2;

    const ah = new TestAlignmentHandler();

    const scrollGroup = new ScrollGroup(0, 0, 0, 0, null, ah, maxSize, scrollSize);

    const elementA = new Element();
    const elementB = new Element();
    const elementC = new Element();
    const elementD = new Element();
    const elementE = new Element();
    const elementF = new Element();
    const elementG = new Element();

    scrollGroup.push(elementA, elementB, elementC, elementD, elementE, elementF, elementG);

    it('group should have mazSize elements', async () => {
      expect(scrollGroup.entries.length).is.equal(maxSize);
    });

    it('first element should be equal elementC', async () => {
      expect(scrollGroup.entries[0]).is.equal(elementC);
    });
  });
});

describe('scrollGroup.unshift', () => {
  context('normal (maxSize = 5, scrollSize = 2)', () => {
    const maxSize = 5;
    const scrollSize = 2;

    const ah = new TestAlignmentHandler();

    const scrollGroup = new ScrollGroup(0, 0, 0, 0, null, ah, maxSize, scrollSize);

    const elementA = new Element();
    const elementB = new Element();
    const elementC = new Element();
    const elementD = new Element();
    const elementE = new Element();
    const elementF = new Element();
    const elementG = new Element();

    scrollGroup.unshift(elementA, elementB, elementC, elementD, elementE, elementF, elementG);

    it('group should have mazSize elements', async () => {
      expect(scrollGroup.entries.length).is.equal(maxSize);
    });

    it('first element should be equal elementA', async () => {
      expect(scrollGroup.entries[0]).is.equal(elementA);
    });
  });
});

describe('scrollGroup.setData', () => {
  context('normal (maxSize = 5, scrollSize = 2)', () => {
    const maxSize = 5;
    const scrollSize = 2;

    const ah = new TestAlignmentHandler();

    const scrollGroup = new ScrollGroup<string>(0, 0, 0, 0, null, ah, maxSize, scrollSize);

    const data = [
      '0apple',
      '1lemon',
      '2orange',
      '3kiwi',
      '4berry',
      '5meron',
      '6grapefruit',
      '7banana',
      '8avocado',
    ];

    const elementFactoryCallback = (name: string) => {
      const element = new Element();
      element.name = name;
      return element;
    };

    scrollGroup.setData(data, elementFactoryCallback);

    it('group has maxSize entries', async () => {
      expect(scrollGroup.entries.length).is.equal(maxSize);
    });

    it('first entry should be equal element what is created by "0apple"', async () => {
      expect(scrollGroup.entries[0].name).is.equal(data[0]);
    });
  });
});

describe('scrollGroup.getNext', () => {
  context('normal (maxSize = 5, scrollSize = 2)', () => {
    const maxSize = 5;
    const scrollSize = 2;

    const ah = new TestAlignmentHandler();

    const scrollGroup = new ScrollGroup<string>(0, 0, 0, 0, null, ah, maxSize, scrollSize);

    const data = [
      '0apple',
      '1lemon',
      '2orange',
      '3kiwi',
      '4berry', // 初期endIndex
      '5meron',
      '6grapefruit', // getNext後のendIndex
      '7banana',
      '8avocado',
    ];

    const elementFactoryCallback = (name: string) => {
      const element = new Element();
      element.name = name;
      return element;
    };

    scrollGroup.setData(data, elementFactoryCallback);

    // カーソルを強引に進める
    scrollGroup.currentIndex = maxSize - 1;

    const next = scrollGroup.getNext(Direction.Down);

    it('group has maxSize entries', async () => {
      expect(scrollGroup.entries.length).is.equal(maxSize);
    });

    it('element what is got by "getNext" should be equal element waht is created by "5meron"', async () => {
      expect(next.name).is.equal(data[5]);
    });

    it('last entry should be equal element what is created by "6grapefruit"', async () => {
      expect(scrollGroup.entries[maxSize - 1].name).is.equal(data[6]);
    });
  });
});

describe('scrollGroup.getNext', () => {
  context('normal (maxSize = 5, scrollSize = 2)', () => {
    const maxSize = 5;
    const scrollSize = 2;

    const ah = new TestAlignmentHandler();

    const scrollGroup = new ScrollGroup<string>(0, 0, 0, 0, null, ah, maxSize, scrollSize);

    const data = [
      '0apple',
      '1lemon',
      '2orange', // getNext(Up)前のIndex
      '3kiwi',
      '4berry',
      '5meron',
      '6grapefruit',
      '7banana',
      '8avocado',
    ];

    const elementFactoryCallback = (name: string) => {
      const element = new Element();
      element.name = name;
      return element;
    };

    scrollGroup.setData(data, elementFactoryCallback);

    // カーソルを強引に進める
    scrollGroup.currentIndex = maxSize - 1;
    // 2回getNextでカーソルが"6grapefruit"を指す
    scrollGroup.getNext(Direction.Down);
    scrollGroup.getNext(Direction.Down);
    // カーソルを強引に戻す
    scrollGroup.currentIndex = 0;
  
    // この状態でgetNext(Direction.Up)すると、前に戻る
    const next = scrollGroup.getNext(Direction.Up);

    it('group has maxSize entries', async () => {
      expect(scrollGroup.entries.length).is.equal(maxSize);
    });

    it('element what is got by "getNext" should be equal element waht is created by "1lemon"', async () => {
      expect(next.name).is.equal(data[1]);
    });

    it('first entry should be equal element what is created by "0apple"', async () => {
      expect(scrollGroup.entries[0].name).is.equal(data[0]);
    });
  });
});

describe('scrollGroup.getNext (over data)', () => {
  context('normal (maxSize = 5, scrollSize = 2)', () => {
    const maxSize = 5;
    const scrollSize = 2;

    const ah = new TestAlignmentHandler();

    const scrollGroup = new ScrollGroup<string>(0, 0, 0, 0, null, ah, maxSize, scrollSize);

    const data = [
      '0apple',
      '1lemon',
      '2orange',
      '3kiwi',
      '4berry',
      '5meron',
      '6grapefruit',
      '7banana',
      '8avocado',
    ];

    const elementFactoryCallback = (name: string) => {
      const element = new Element();
      element.name = name;
      return element;
    };

    scrollGroup.setData(data, elementFactoryCallback);
    
    // dataから生成して取ろうにも、dataの範囲を逸脱するのでindex = 0のelementが返ってくる
    const next = scrollGroup.getNext(Direction.Up);

    it('group has maxSize entries', async () => {
      expect(scrollGroup.entries.length).is.equal(maxSize);
    });

    it('element what is got by "getNext" should be equal element waht is created by "1lemon"', async () => {
      expect(next.name).is.equal(data[0]);
    });
  });
});

describe('scrollGroup.getNext (over data)', () => {
  context('normal (maxSize = 5, scrollSize = 2)', () => {
    const maxSize = 5;
    const scrollSize = 2;

    const ah = new TestAlignmentHandler();

    const scrollGroup = new ScrollGroup<string>(0, 0, 0, 0, null, ah, maxSize, scrollSize);

    const data = [
      '0apple',
      '1lemon',
      '2orange',
      '3kiwi',
    ];

    const elementFactoryCallback = (name: string) => {
      const element = new Element();
      element.name = name;
      return element;
    };

    scrollGroup.setData(data, elementFactoryCallback);
    
    // 強制的にカーソルを最後にする
    scrollGroup.currentIndex = scrollGroup.entries.length - 1;
    // dataから生成して取ろうにも、dataの範囲を逸脱するのでindex = 3のelementが返ってくる
    const next = scrollGroup.getNext(Direction.Down);

    it('group has data size entries', async () => {
      expect(scrollGroup.entries.length).is.equal(data.length);
    });

    it('element what is got by "getNext" should be equal element waht is created by "3kiwi"', async () => {
      expect(next.name).is.equal(data[3]);
    });
  });
});

describe('entry.x', () => {
  context('normal', () => {
    const maxSize = 5;
    const scrollSize = 2;

    // use default
    const ah: IAlignmentHandler = null;

    const scrollGroup = new ScrollGroup(10, 20, 0, 0, null, ah, maxSize, scrollSize);

    const elementA = new Element(10, 20);
    const elementB = new Element(20, 40);
    const elementC = new Element(30, 60);

    scrollGroup.push(elementA, elementB, elementC);

    it('scrollGroup has 3 entries', async () => {
      expect(scrollGroup.entries.length).is.equal(3);
    });
    
    it('elementA.x is 20', async () => {
      expect(elementA.x).is.equal(20);
    });

    it('elementB.x is 30', async () => {
      expect(elementB.x).is.equal(30);
    });

    it('elementC.x is 40', async () => {
      expect(elementC.x).is.equal(40);
    });
  });
});