import * as Phaser from 'phaser';
import { Node } from '../Node';
import { NodeStatus } from '../NodeStatus';
import { NodeStatusUtil } from '../utils/NodeStatusUtil';

export abstract class PhaserObjectNode extends Node {
  /**
   * 関連するPhaser.GameObjectをdestroyするようにする
   */
  destroy(): null {
    this.getGameObjects().forEach((gameObject: Phaser.GameObjects.GameObject) => {
      gameObject.destroy();
    });
    
    // Nodeクラスには子ノードも連動してdestroyする命令が入っているのでNodeクラスのdestroyも実行する
    return super.destroy();
  }

  movePosition(deltaX: number, deltaY: number): void {
    // このノードが管理しているPhaserオブジェクトの位置も変える
    this.getGameObjects().forEach((gameObject: Phaser.GameObjects.GameObject) => {
      if (this._isPhasersTransform(gameObject)) {
        gameObject.setPosition(
          gameObject.x + deltaX,
          gameObject.y + deltaY,
        );
      }
    });
    
    super.movePosition(deltaX, deltaY);
  }

  abstract getGameObjects(): Phaser.GameObjects.GameObject[];

  protected _updateInvisible(): void {
    // 自身から祖先ノードを辿って、どこかしらのノードにInvisibleがセットされていたら非表示にする
    if (NodeStatusUtil.hasStatus(this, NodeStatus.Invisible, true)) {
      this.getGameObjects().forEach((gameObject: Phaser.GameObjects.GameObject) => {
        gameObject.renderFlags &= ~1;
      });
    } else {
      this.getGameObjects().forEach((gameObject: Phaser.GameObjects.GameObject) => {
        gameObject.renderFlags |= 1;
      });
    }

    super._updateInvisible();
  }

  private _isPhasersTransform(obj: any): obj is Phaser.GameObjects.Components.Transform {
    return 'setPosition' in obj;
  }
}