import { IFieldScene } from '../scenes/IFieldScene';

/**
 * Phaser.Sceneの各フェーズ(init, create, update, destroy)で実行される
 */
export interface IGlobalEvent {
  init(scene: IFieldScene): void;

  create(scene: IFieldScene): void;
  
  update(scene: IFieldScene): void;
  
  destroy(scene: IFieldScene): void;
}