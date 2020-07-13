import * as Phaser from 'phaser';
import { IGameGlobal } from '../../../../ts/core/IGameGlobal';
import { IFieldScene } from '../../../../ts/core/scenes/IFieldScene';
import { IActor } from '../../../../ts/core/actors/IActor';
import { AreaActorsManager } from '../../../../ts/core/areas/AreaActorsManager';
import { IScenarioEventManager } from '../../../../ts/core/events/IScenarioEventManager';
import { Keys } from '../../../../ts/core/input/Keys';

/**
 * テストで使う時はこのクラスを継承して必要なところだけ動くようなクラスを作る
 */
export class TestFieldScene implements IFieldScene {
    get phaserScene(): Phaser.Scene {
      throw Error(this._getErrorMessage('phaserScene'));
    }    

    set phaserScene(v: Phaser.Scene) {
      throw Error(this._getErrorMessage('phaserScene'));
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

    get primaryActor(): IActor {
      throw Error(this._getErrorMessage('primaryActor'));
    }    

    set primaryActor(v: IActor) {
      throw Error(this._getErrorMessage('primaryActor'));
    }

    get actorsManager(): AreaActorsManager {
      throw Error(this._getErrorMessage('actorsManager'));
    }    

    set actorsManager(v: AreaActorsManager) {
      throw Error(this._getErrorMessage('actorsManager'));
    }

    get scenarioEventManager(): IScenarioEventManager {
      throw Error(this._getErrorMessage('scenarioEventManager'));
    }    

    set scenarioEventManager(v: IScenarioEventManager) {
      throw Error(this._getErrorMessage('scenarioEventManager'));
    }

    get keys(): Keys {
      throw Error(this._getErrorMessage('keys'));
    }    

    set keys(v: Keys) {
      throw Error(this._getErrorMessage('keys'));
    }

  private _getErrorMessage(functionName: string): string {
    return `illegal operation for TestFieldScene. "${functionName}"`;
  }
}