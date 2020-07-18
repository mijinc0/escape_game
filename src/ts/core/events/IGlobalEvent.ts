import * as Scene from '../scenes';

/**
 * Phaser.Sceneの各フェーズ(init, create, update, destroy)で実行される
 */
export interface IGlobalEvent {
  init(scene: Scene.IFieldScene): void;

  create(scene: Scene.IFieldScene): void;

  update(scene: Scene.IFieldScene): void;

  destroy(scene: Scene.IFieldScene): void;
}
