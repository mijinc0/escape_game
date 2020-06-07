import { INodeSelector } from './INodeSelector';
import { IContainer } from '../containers/IContainer';
import { Keys } from '../../input/Keys';
import { ISelectorCursor } from './ISelectorCursor';
import { Direction } from '../Direction';
import { NodeStatus } from '../NodeStatus';
import { NodeStatusUtil } from '../utils/NodeStatusUtil';

export class NodeSelector implements INodeSelector {
  keys: Keys;
  disable: boolean;
  // 入力イベント後、次に入力を受け付けるまでのクールタイム(フレーム数:厳密にはupdateが呼ばれた回数)
  cooldownTime: number;
  
  private container: IContainer;
  private cursor: ISelectorCursor;
  private cooldownCount: number;

  constructor(
    container: IContainer,
    cursor: ISelectorCursor,
    keys?: Keys,
  ) {
    this.container = container;
    this.cursor = cursor;
    this.keys = keys ? keys : null;
    this.disable = false;
    this.cooldownTime = 10;
    this.cooldownCount = 0; 
  }

  update(frame: number): void {
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

    }　else if (this.keys.cancel.isDown) {
      this._cancel();
    }　
  }

  destroy(): null {
    this.cursor.destroy();

    return null;
  }

  setContainer(container: IContainer, destroy?: boolean): void {
    if (destroy) this.container.destroy();

    this.container = container;
  }

  private _select(): void {
    const currentNode = this.container.getCurrent();

    if (!currentNode) return;

    currentNode.select();

    this.cooldownCount = this.cooldownTime;
  }

  private _cancel(): void {
    const currentNode = this.container.getCurrent();

    if (!currentNode) return;

    currentNode.cancel();

    this.cooldownCount = this.cooldownTime;
  }

  private _goNext(direction: Direction): void {
    const currentNode = this.container.getCurrent();
    const nextNode = this.container.getNext(direction);

    // 次のノードが無ければ即return 何もしない
    if (!nextNode) return;
    
    // 現在のnodeがある場合はOnを消してDirtyを付与
    // カーソルが-1(初期値)の状態などではcurrentNodeが取得できない可能性がある
    if (currentNode) {
      NodeStatusUtil.removeStatus(currentNode, NodeStatus.On);
      currentNode.dirty();
    }

    // 次のnodeにOnとDirtyを付与
    NodeStatusUtil.setStatus(nextNode, NodeStatus.On);
    nextNode.dirty();

    // カーソルを移動させる
    this.cursor.on(nextNode);

    // クールダウンを設定して終了
    this.cooldownCount = this.cooldownTime;
  }
}