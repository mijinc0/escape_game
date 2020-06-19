import * as Phaser from 'phaser';
import { Keys } from '../core/input/Keys';
import { Direction } from '../core/newUi/Direction';
import { IElement } from '../core/newUi/IElement';
import { Group } from '../core/newUi/group/Group';
import { RangeAlignmentStrategy } from '../core/newUi/group/RangeAlignmentStrategy';
import { Rectangle } from '../core/newUi/phaserObject/Rectangle';
import { Text } from '../core/newUi/phaserObject/Text';
import { PhaserObjectFactory } from '../core/newUi/phaserObject/PhaserObjectFactory';
import { ISelector } from '../core/newUi/selector/ISelector';
import { SelectorFactory } from '../core/newUi/selector/SelectorFactory';
import { SelectorEventNames } from '../core/newUi/selector/SelectorEventNames';

export class UiTest extends Phaser.Scene {
  frame = 0;

  selector: ISelector;
  uiRoot: IElement;
  factory: PhaserObjectFactory;

  init(): void {
    console.log('start scene Opening');
  }

  preload (): void {}
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);

    this.factory = new PhaserObjectFactory(this);
  
    const root = this.factory.rectangle(10, 10, 600, 400, 0x000000, 0.2);
    this.uiRoot = root;

    const mainMenu = new Group(0, 0, 0, 0, root);

    const itemButton = this._createItemButtom();

    const backButton = new Group(10, 60, 100, 40);
    const backButtonBase = this.factory.rectangle(0, 0, 100, 40, 0x00ff00, 0.3);
    const backButtonText = this.factory.text(10, 10, 'back', {});
    backButton.push(backButtonBase, backButtonText);

    mainMenu.push(itemButton, backButton);

    const cursorKeys = this.input.keyboard.createCursorKeys();
    const keys = new Keys(cursorKeys, cursorKeys.space, cursorKeys.shift);
    const selectorFactory = new SelectorFactory(this);
    this.selector = selectorFactory.create(keys); 
    this.selector.setGroup(mainMenu);

    /*
    // 枠はこうやって描くよというやつ
    const graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 }});
    graphics.strokeRect(50, 50, 80, 40);
    graphics.strokeRect(150, 150, 80, 40);
    */
  }

  update(): void {
    this.frame++;
    
    if (this.frame === 90) {
      // this.uiRoot.y = 50;
      // this.uiRoot.height = 450
    }

    this.selector.update(this.frame);

  }

  private _createItemButtom(): Group {
    const itemButton = new Group(10, 10, 100, 40);
    const itemButtonBase = this.factory.rectangle(0, 0, 100, 40, 0xff0000, 0.3);
    const itemButtonText = this.factory.text(10, 10, 'item', {});
    itemButton.push(itemButtonBase, itemButtonText);

    itemButton.on(SelectorEventNames.Select, (thisButton: IElement, selector: ISelector) => {
      const itemListBg = this.factory.rectangle(200, 10, 200, 200, 0x000000, 0.5, this.uiRoot);
      const itemList = new Group(200, 10, 200, 200, this.uiRoot);

      const itemA = this.factory.rectangle(10, 10, 100, 20, 0x00ffff, 0.3)
      const itemB = this.factory.rectangle(10, 40, 100, 20, 0x00ffff, 0.3)
      const itemC = this.factory.rectangle(10, 70, 100, 20, 0x00ffff, 0.3)
      const itemD = this.factory.rectangle(10, 100, 100, 20, 0x00ffff, 0.3)

      itemList.push(itemA, itemB, itemC, itemD);

      this.selector.setGroup(itemList, [itemList, itemListBg]);
      const firstElement = itemList.getNext(Direction.Down);
      this.selector.cursor.goTo(firstElement);
    });

    return itemButton;
  }
}