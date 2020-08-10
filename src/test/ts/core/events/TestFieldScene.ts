import * as Phaser from 'phaser';
import * as Actor from '../../../../ts/core/actors';
import * as Audio from '../../../../ts/core/audios';
import * as Field from '../../../../ts/core/fields';
import * as Event from '../../../../ts/core/events';
import * as Scene from '../../../../ts/core/scenes';
import * as Input from '../../../../ts/core/input';
import * as Render from '../../../../ts/core/renders';
import { IGameGlobal } from '../../../../ts/core/IGameGlobal';

/**
 * テストで使う時はこのクラスを継承して必要なところだけ動くようなクラスを作る
 */
export class TestFieldScene implements Scene.IFieldScene {
  get phaserScene(): Phaser.Scene {
    throw Error(this._getErrorMessage('phaserScene'));
  }

  set phaserScene(v: Phaser.Scene) {
    throw Error(this._getErrorMessage('phaserScene'));
  }

  get uiScene(): Phaser.Scene {
    throw Error(this._getErrorMessage('uiScene'));
  }

  set uiScene(v: Phaser.Scene) {
    throw Error(this._getErrorMessage('uiScene'));
  }

  get frame(): number {
    throw Error(this._getErrorMessage('frame'));
  }

  set frame(v: number) {
    throw Error(this._getErrorMessage('frame'));
  }

  get gameGlobal(): IGameGlobal {
    throw Error(this._getErrorMessage('gameGlobal'));
  }

  set gameGlobal(v: IGameGlobal) {
    throw Error(this._getErrorMessage('gameGlobal'));
  }

  get primaryActor(): Actor.IActor {
    throw Error(this._getErrorMessage('primaryActor'));
  }

  set primaryActor(v: Actor.IActor) {
    throw Error(this._getErrorMessage('primaryActor'));
  }

  get actorsManager(): Field.FieldActorsManager {
    throw Error(this._getErrorMessage('actorsManager'));
  }

  set actorsManager(v: Field.FieldActorsManager) {
    throw Error(this._getErrorMessage('actorsManager'));
  }

  get scenarioEventManager(): Event.IScenarioEventManager {
    throw Error(this._getErrorMessage('scenarioEventManager'));
  }

  set scenarioEventManager(v: Event.IScenarioEventManager) {
    throw Error(this._getErrorMessage('scenarioEventManager'));
  }

  get audioManager(): Audio.IAudioManager {
    throw Error(this._getErrorMessage('scenarioEventManager'));
  }

  set audioManager(v: Audio.IAudioManager) {
    throw Error(this._getErrorMessage('audioManager'));
  }

  get cameraEffectManager(): Render.CameraEffectManager {
    throw Error(this._getErrorMessage('cameraEffectManager'));
  }

  set cameraEffectManager(v: Render.CameraEffectManager) {
    throw Error(this._getErrorMessage('cameraEffectManager'));
  }

  get keys(): Input.Keys {
    throw Error(this._getErrorMessage('keys'));
  }

  set keys(v: Input.Keys) {
    throw Error(this._getErrorMessage('keys'));
  }

  private _getErrorMessage(functionName: string): string {
    return `illegal operation for TestFieldScene. "${functionName}"`;
  }
}
