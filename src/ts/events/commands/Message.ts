import * as Phaser from 'phaser';
import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { Keys } from '../../core/input/Keys';
import { MessageBox } from '../../ui/messageBox/MessageBox';
import { IFieldScene } from '../../core/scenes/IFieldScene';

type MessageBufferFactoryCallback = (message: string) => string[];

export class Message implements IScenarioEvent {
  isComplete: boolean;
  isAsync: boolean;

  private message: string;
  private hasBackground: boolean;
  private align: string;
  private justify: string;
  private messageBuffers: string[];
  private messageChunkSize: number;
  private messageBox: MessageBox;

  // 全てのメッセージが表示された後にすぐキーの入力を受け付けると、
  // 短い文章を表示した時にキー入力判定が起きて文章を飛ばしてしまうことがあるため、
  // 最低限表示する長さを決めるタイマー
  private waitTimer: number;

  private messageBufferFactoryCallback: MessageBufferFactoryCallback;

  constructor(
    message: string,
    async = false,
    align = 'left',
    hasBackground = true,
    justify = 'bottom',
    messageBufferFactoryCallback: MessageBufferFactoryCallback,
  ) {
    this.message = message;
    this.messageBuffers = [];

    this.messageChunkSize = 4;
    this.isAsync = async;
    this.isComplete = false;
    this.align = align;
    this.hasBackground = hasBackground;
    this.justify = justify;

    this.messageBox = null;
    this.waitTimer = 0;

    this.messageBufferFactoryCallback = messageBufferFactoryCallback;
  }

  init(scene: IFieldScene): void {
    this.isComplete = false;
    this.messageBuffers = this._createMessageBuffer(this.message);
    this.messageBox = this._createMessageBox(scene.customScene.ui.phaserScene, this.justify, this.align, this.hasBackground);

    this._hideWaitingCursor();
  }

  update(scene: IFieldScene): void {
    if (!this.messageBox) return;

    if (this._hasReadiedMessage()) {
      // 一番前のバッファからメッセージを出力する
      this._messageOutputFromBuffer();
    } else if (this.waitTimer < 20) {
      // 一番前のバッファから全てのメッセージが出力された直後の一時停止 (20フレーム停止)
      this.waitTimer++;
    } else {
      // 次のメッセージに進むためのキー入力待ち
      this._flashingKeyWaitCursor(scene.frame);
      // 入力待ち
      this._waitKeyInput(scene.keys);
      // バッファが空になったら完了

      if (this.messageBuffers.length === 0) this.complete();
    }
  }

  complete(): void {
    // オブジェクトを削除する
    this.messageBox.destroy();
    this.messageBox = null;
    this.isComplete = true;
  }

  setMessage(message: string): void {
    this.messageBuffers = this._createMessageBuffer(message);
    this.messageBox.text = '';
  }

  addMessage(message: string): void {
    const newBuffer = this._createMessageBuffer(message);
    this.messageBuffers.push(...newBuffer);
  }

  private _createMessageBox(scene: Phaser.Scene, justify: string, align: string, hasBackground: boolean): MessageBox {
    const width = scene.cameras.main.width - 20;
    const height = 160;
    const x = this._getPositionX(scene, 10);
    const y = this._getPositionY(scene, justify, height);

    return new MessageBox(
      {
        scene: scene,
        text: '',
      },
      x,
      y,
      width,
      height,
    );
  }

  private _createMessageBuffer(message: string): string[] {
    return this.messageBufferFactoryCallback(message);
  }

  private _getPositionX(scene: Phaser.Scene, x: number): number {
    const displayArea = scene.cameras.main.worldView;
    return displayArea.x + x;
  }

  private _getPositionY(scene: Phaser.Scene, justify: string, boxHeight: number): number {
    const displayArea = scene.cameras.main.worldView;

    // 10pxだけマージンをとる
    switch (justify) {
      case 'top':
        return displayArea.y + 10;

      case 'center':
        return displayArea.y + (scene.cameras.main.height - boxHeight) / 2 + 10;

      case 'bottom':
        return displayArea.y + scene.cameras.main.height - boxHeight - 10;

      default:
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
    this.messageBox.text += nextChunk;
    this.messageBuffers[0] = this.messageBuffers[0].slice(this.messageChunkSize);
  }

  private _waitKeyInput(keys?: Keys): void {
    if (!keys || !keys.action.isDown) return;

    // テキストをクリアして、最初のバッファを削除する
    this._hideWaitingCursor();
    this.messageBox.text = '';
    this.messageBuffers = this.messageBuffers.slice(1);
    this.waitTimer = 0;
  }

  private _flashingKeyWaitCursor(frame: number): void {
    // 入力待ちのカーソルを16フレーム毎に点滅させる
    if (frame % 16 === 0) this._toggleWaitingCursorVisible();
  }

  private _toggleWaitingCursorVisible(): void {
    this.messageBox.toggleWaitingCursorVisible();
  }

  private _hideWaitingCursor(): void {
    this.messageBox.hideWaitingCursor();
  }
}
