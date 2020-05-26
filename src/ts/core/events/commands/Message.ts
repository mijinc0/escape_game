import * as Phaser from 'phaser';
import { IScenarioEvent } from '../IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../ScenarioEventUpdateConfig';
import { Keys } from '../../models/Keys';
import { TextBox } from '../../ui/objects/TextBox';

export class Message implements IScenarioEvent {
  isComplete: boolean;
  isAsync: boolean;
  
  private message: string;
  private hasBackground: boolean;
  private align: string;
  private justify: string;
  private messageBuffers: string[];
  private messageChunkSize: number;
  private textBox: TextBox;
  private waitingCursor: Phaser.GameObjects.Text;
  
  // 全てのメッセージが表示された後にすぐキーの入力を受け付けると、
  // 短い文章を表示した時にキー入力判定が起きて文章を飛ばしてしまうことがあるため、
  // 最低限表示する長さを決めるタイマー
  private waitTimer: number;

  constructor(
    message: string,
    async = false,
    align = 'left',
    hasBackground = true,
    justify = 'bottom',
  ) {
    this.message = message;
    this.messageBuffers = [];

    this.messageChunkSize = 4;
    this.isAsync = async;
    this.isComplete = false; 
    this.align = align;
    this.hasBackground = hasBackground;
    this.justify = justify;

    this.textBox = null
    this.waitingCursor = null
    this.waitTimer = 0;
  }

  init(frame: number, config: ScenarioEventUpdateConfig): void {
    this.isComplete = false;

    if (!config.scene) {
      console.warn('ScenarioEventUpdateConfig has not current scene');
      return;
    }

    this.messageBuffers = this._createMessageBuffer(this.message);
    this.textBox = this._createTextBox(config.scene, this.justify, this.align, this.hasBackground);
    this.waitingCursor = this._createWaitingCursor(config.scene);
    this._beInvisibleWaitingCursor();
  }

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    if (!this.textBox) return;

    if (this._hasReadiedMessage()) {
      // 一番前のバッファからメッセージを出力する
      this._messageOutputFromBuffer();
    
    } else if(this.waitTimer < 24) {
      // 一番前のバッファから全てのメッセージが出力された直後の一時停止 (24フレーム停止)
      this.waitTimer++;

    } else {
      // 次のメッセージに進むためのキー入力待ち
      this._flashingKeyWaitCursor(frame);
      // 入力待ち
      this._waitKeyInput(config.keys);
      // バッファが空になったら完了

      if (this.messageBuffers.length === 0) this.complete();
    }
  }

  complete(): void {
    // オブジェクトを削除する
    this.waitingCursor.destroy();
    this.waitingCursor = null
    this.textBox = this.textBox.destroy();
    this.isComplete = true;
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

  private _hasReadiedMessage(): boolean {
    return this.messageBuffers[0] && this.messageBuffers[0].length > 0;
  }

  private _messageOutputFromBuffer(): void {
    if (this.messageBuffers.length === 0) return;

    // 切り出してtextObjectに追加、追加分をbufferから削除
    const nextChunk = this.messageBuffers[0].slice(0, this.messageChunkSize);
    this.textBox.addText(nextChunk);
    this.messageBuffers[0] = this.messageBuffers[0].slice(this.messageChunkSize);
  }

  private _waitKeyInput(keys?: Keys): void {
    if (!keys || !keys.action.isDown) return;

    // テキストをクリアして、最初のバッファを削除する
    this._beInvisibleWaitingCursor();
    this.textBox.setText('');
    this.messageBuffers = this.messageBuffers.slice(1);
    this.waitTimer = 0;
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