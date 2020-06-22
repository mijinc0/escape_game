import * as Phaser from 'phaser';
import { Rectangle } from './Rectangle';
import { Text } from './Text';
import { IElement } from '../IElement';

export class PhaserObjectFactory {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  rectangle(x: number, y: number, width?: number, height?: number, fillColor?: number, fillAlpha?: number, anchor?: IElement): Phaser.GameObjects.Rectangle&IElement {
    const go = new Rectangle(this.scene, x, y, width, height, fillColor, fillAlpha);
    go.anchor = anchor ? anchor : null;
    go.setOrigin(0);
    this.scene.add.existing(go);
    return go;
  }

  text(x: number, y: number, text: string|string[], style: Phaser.Types.GameObjects.Text.TextStyle, anchor?: IElement): Phaser.GameObjects.Text&IElement {
    const go = new Text(this.scene, x, y, text, style);
    go.anchor = anchor ? anchor : null;
    go.setOrigin(0);
    this.scene.add.existing(go);
    return go;
  }
}