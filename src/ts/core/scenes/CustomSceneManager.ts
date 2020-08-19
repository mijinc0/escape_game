import * as Phaser from 'phaser';
import { SceneType } from './SceneType';
import { ICustomScene } from './ICustomScene';
import { IFieldScene } from './IFieldScene';
import { IUiScene } from './IUiScene';
import { ICustomSceneManager } from './ICustomSceneManager';

export class CustomSceneManager implements ICustomSceneManager {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  get field(): IFieldScene|null {
    const fieldScene = this.scene.scene.get('field');

    return this._isFieldScene(fieldScene) ? fieldScene : null;
  }

  get ui(): IUiScene|null {
    const uiScene = this.scene.scene.get('ui');

    return this._isUiScene(uiScene) ? uiScene : null;
  }
  
  private _isFieldScene(scene: any): scene is IFieldScene {
    return this._isCustomScene(scene) && scene.type === SceneType.Field;
  }

  private _isUiScene(scene: any): scene is IUiScene {
    return this._isCustomScene(scene) && scene.type === SceneType.Ui;
  }

  private _isCustomScene(scene: any): scene is ICustomScene {
    return scene.hasOwnProperty('type');
  }
}