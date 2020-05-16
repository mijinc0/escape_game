import * as Phaser from 'phaser';
import { ScenarioEvent } from '../ScenarioEvent';
import { Keys } from '../../models/Keys';
import { TextBox } from '../../ui/objects/TextBox';

export class MessageCard {
  keys: Keys;

  private textBox: TextBox;
  private messageBuffers: string[];
  private messageChunkSize: number;
  private waitingCursor: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    message: string,
    align = 'left',
    hasBackground = true,
    justify = 'bottom',
    keys?: Keys,
  ) {
    this.messageChunkSize = 4;

    this.messageBuffers = this._createMessageBuffer(message);
    this.textBox = this._createTextBox(scene, justify, align, hasBackground);
    
    this.waitingCursor = this._createWaitingCursor(scene);
    this._beInvisibleWaitingCursor();
    
    this.keys = keys ? keys : null;
  }

  update(frame: number): void {
    if (this.messageBuffers.length === 0) {
      // 出力すべきメッセージが何もない
      return; 
      
    } else if (this.messageBuffers[0].length > 0) {
      // 一番前のバッファからメッセージを出力する
      this._messageOutputFromBuffer();
      return;

    } else {
      // 入力待ち
      this._waitKeyInput(frame);
      return;
    }
  }

  setMessage(message: string): void {
    this.messageBuffers = this._createMessageBuffer(message);
    this.textBox.setText('');
  }

  addMessage(message: string): void {
    const newBuffer = this._createMessageBuffer(message);
    this.messageBuffers.push(...newBuffer);
  }

  private _createTextBox(
    scene: Phaser.Scene,
    justify: string,
    align: string,
    hasBackground: boolean,
  ): TextBox {
    const width = scene.cameras.main.width - 20;
    const height = 160;
    const x = 10;
    const y = this._getPositionY(scene, justify, height);

    return new TextBox(
      scene,
      {
        text: '',
        fontSize: 20,
        fontFamily: 'monospace',
        color: 'white',
        isWraped: true,
        isCramped: true,
        hasBackground: hasBackground,
        backgroundAlpha: 0.8,
        backgroundColor: 0x000000,
        padding: 10,
        align: align,
      },
      width,
      height,
      x,
      y,
    );
  }

  private _createWaitingCursor(scene: Phaser.Scene): Phaser.GameObjects.Text {
    const x = this.textBox.position.x + this.textBox.size.width - 40;
    const y = this.textBox.position.y + this.textBox.size.height - 40;
    const waitingCursor = scene.add.text(x, y, '*', {fontSize: 24, fontFamily: 'monospace'});
    waitingCursor.setOrigin(0);

    return waitingCursor;
  }

  private _createMessageBuffer(message: string): string[] {
    const bufferSepalator = '\\!';
    return message.split(bufferSepalator);
  }

  private _getPositionY(scene: Phaser.Scene, justify: string, boxHeight: number): number {
    // 10pxだけマージンをとる
    switch(justify) {
      case 'top' :
        return 10;

      case 'center' :
        return (scene.cameras.main.height - boxHeight) / 2 + 10;

      case 'bottom' :
        return scene.cameras.main.height - boxHeight - 10;

      default :
        return 0;
    }
  }

  private _messageOutputFromBuffer(): void {
    if (this.messageBuffers.length === 0) return;

    // 切り出してtextObjectに追加、追加分をbufferから削除
    const nextChunk = this.messageBuffers[0].slice(0, this.messageChunkSize);
    this.textBox.addText(nextChunk);
    this.messageBuffers[0] = this.messageBuffers[0].slice(this.messageChunkSize);
  }

  private _waitKeyInput(frame: number): void {
    this._flashingKeyWaitCursor(frame);

    if (!this.keys || !this.keys.action.isDown) return;

    // テキストをクリアして、最初のバッファを削除する
    this._beInvisibleWaitingCursor();
    this.textBox.setText('');
    this.messageBuffers = this.messageBuffers.slice(1);
  }

  private _flashingKeyWaitCursor(frame: number): void {
    // 入力待ちのカーソルを16フレーム毎に点滅させる
    if ((frame % 16) === 0) this._toggleWaitingCursorVisible();
  }

  private _toggleWaitingCursorVisible(): void {
    this.waitingCursor.renderFlags ^= 1;
  }

  private _beInvisibleWaitingCursor(): void {
    this.waitingCursor.renderFlags &= ~1;
  }
}