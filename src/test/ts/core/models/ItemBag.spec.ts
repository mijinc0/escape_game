import 'mocha';
import { expect } from 'chai';
import { Item } from '../../../../ts/core/models/Item';
import { ItemBag } from '../../../../ts/core/models/ItemBag';

describe('itemBag.has()', () => {
  context('normal', () => {
    const itemBag = new ItemBag();
    const item = new Item('item', 'test item');
    itemBag.add(item, 10);

    it('should be true (key: string)', async () => {
      expect(itemBag.has('item')).is.true;
    });

    it('should be true (key: object)', async () => {
      expect(itemBag.has(item)).is.true;
    });
  });
});

describe('itemBag.getSize()', () => {
  context('normal', () => {
    const itemBag = new ItemBag();
    const item = new Item('item', 'test item');
    itemBag.add(item, 10);

    it('should have 10 items (key: string)', async () => {
      expect(itemBag.getSize('item')).is.equals(10);
    });

    it('should have 10 items (key: object)', async () => {
      expect(itemBag.getSize(item)).is.equals(10);
    });
  });
});

describe('itemBag.add()', () => {
  context('normal', () => {
    const itemBag = new ItemBag();
    const item = new Item('item', 'test item');
    itemBag.add(item, 10);

    it('should have 10 items', async () => {
      expect(itemBag.getSize(item)).is.equals(10);
    });
  });

  context('normal (overlimit)', () => {
    const itemBag = new ItemBag();
    const item = new Item('item', 'test item');
    itemBag.add(item, 100);

    it('should have 99(max size) items', async () => {
      expect(itemBag.getSize(item)).is.equals(99);
    });
  });
});

describe('itemBag.lost()', () => {
  context('normal', () => {
    const itemBag = new ItemBag();
    const item = new Item('item', 'test item');
    itemBag.add(item, 10);
    itemBag.lost(item, 5);

    it('should have 5 items', async () => {
      expect(itemBag.getSize(item)).is.equals(5);
    });
  });

  context('normal (overlimit)', () => {
    const itemBag = new ItemBag();
    const item = new Item('item', 'test item');
    itemBag.add(item, 10);
    itemBag.lost(item, 100);

    it('should have 0(min size) items', async () => {
      expect(itemBag.getSize(item)).is.equals(0);
    });
  });
});

describe('itemBag.getItem()', () => {
  context('normal', () => {
    const itemBag = new ItemBag();
    const item = new Item('item', 'test item');
    itemBag.add(item, 10);

    const storedItem = itemBag.getItem(item);

    it('should get item', async () => {
      expect(!!storedItem).is.true;
    });
  });

  context('normal', () => {
    const itemBag = new ItemBag();
    const item = new Item('item', 'test item');

    const storedItem = itemBag.getItem(item);

    it('should return null', async () => {
      expect(storedItem).is.null;
    });
  });
});
