import * as Phaser from 'phaser';
import { Node } from '../Node';
import { NodeStatus } from '../NodeStatus';
import { NodeStatusUtil } from '../utils/NodeStatusUtil';
import { PhaserObjectNodePositionUtil } from '../utils/PhaserObjectNodePositionUtil';

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

  protected _updatePosition(): void {
    // このノードが管理しているPhaserオブジェクトの位置も変える
    this.getGameObjects().forEach((gameObject: Phaser.GameObjects.GameObject) => {
      if (this._isPhasersTransform(gameObject)) {
        const deltaPosition = PhaserObjectNodePositionUtil.getDeltaPosition(gameObject);

        gameObject.setPosition(
          this.getAbsX() + deltaPosition.x,
          this.getAbsY() + deltaPosition.y,
        );
      }
    });
  }

  private _isPhasersTransform(obj: any): obj is Phaser.GameObjects.Components.Transform {
    return 'setPosition' in obj;
  }
}