import * as Phaser from 'phaser';
import { Node } from '../Node';
import { NodeStatus } from '../NodeStatus';

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
    if (this.hasStatus(NodeStatus.Invisible, true)) {
      this.getGameObjects().forEach((getGameObject: Phaser.GameObjects.GameObject) => {
        getGameObject.renderFlags &= ~1;
      });
    } else {
      this.getGameObjects().forEach((getGameObject: Phaser.GameObjects.GameObject) => {
        getGameObject.renderFlags |= 1;
      });
    }

    super._updateInvisible();
  }
}