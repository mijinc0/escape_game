import { Element } from '../Element';
import { Container } from '../containers/Container';
import { Keys } from '../../models/Keys';
import { ISelectorCursor } from './ISelectorCursor';
import { Direction } from '../Direction';
import { NodeStatus } from '../NodeStatus';

export class NodeSelector implements Element {
  public keys: Keys;
  public disable: boolean;
  // 入力イベント後、次に入力を受け付けるまでのクールタイム(フレーム数:厳密にはupdateが呼ばれた回数)
  public cooldownTime: number;

  private container: Container;
  private cursor: ISelectorCursor;
  private currentNodeIndex: number;
  private cooldownCount: number;

  constructor(
    container: Container,
    cursor: ISelectorCursor,
    keys?: Keys,
  ) {
    this.container = container;
    this.cursor = cursor;
    this.keys = keys ? keys : null;
    this.disable = false;
    this.currentNodeIndex = -1;
    this.cooldownTime = 10;
    this.cooldownCount = 0; 
  }

  update(frame?: number): void {
    if (!this.keys || this.disable) return;

    // 毎フレームキーの入力を受け付けるとセレクタが高速で移動しすぎるので、
    // クールダウンタイムを設けて0の時以外は操作を受け付けなくする
    this.cooldownCount = Math.max(0, this.cooldownCount - 1);
    if (this.cooldownCount != 0) return;

    // 各キーを押した時の操作
    if (this.keys.cursors.down.isDown) {
      this._goNext(Direction.Down);

    } else if (this.keys.cursors.right.isDown) {
      this._goNext(Direction.Right);
    
    } else if (this.keys.cursors.left.isDown) {
      this._goNext(Direction.Left);
    
    } else if (this.keys.cursors.up.isDown) {
      this._goNext(Direction.Up);

    } else if (this.keys.action.isDown) {
      this._select();
    }
  }

  destroy(): null {
    this.cursor.destroy();

    return null;
  }

  private _goNext(direction: Direction): void {
    // 次のノードのindexを要求する
    const nextNodeIndex = this.container.getNextNodeIndex(this.currentNodeIndex, direction);

    // 要求が無効であれば-1が返ってくるので即return
    if (nextNodeIndex < 0) return;
    
    // 現在のnodeからOnを消してDirtyを付与
    // カーソルが-1(初期値)の状態などではcurrentNodeが取得できない可能性がある
    const currentNode = this.container.children[this.currentNodeIndex];
    if (currentNode) {
      currentNode.removeStatus(NodeStatus.On);
      currentNode.dirty();
    }

    // 次のnodeにOnとDirtyを付与
    const nextNode = this.container.children[nextNodeIndex];
    nextNode.setStatus(NodeStatus.On);
    nextNode.dirty();

    // カーソルを移動させる
    this.cursor.on(nextNode);
    this.currentNodeIndex = nextNodeIndex;

    // クールダウンを設定して終了
    this.cooldownCount = this.cooldownTime;
  }

  private _select(): void {
    if (this.currentNodeIndex < 0 || this.currentNodeIndex >= this.container.children.length) return;

    const currentNode = this.container.children[this.currentNodeIndex];
    currentNode.select();

    this.cooldownCount = this.cooldownTime;
  }
}