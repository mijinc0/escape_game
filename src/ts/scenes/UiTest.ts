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
import { OneWayPropertyBinder  } from '../core/newUi/utils/OneWayPropertyBinder ';

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
}