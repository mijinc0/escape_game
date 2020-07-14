import { IFieldScene } from '../../../../ts/core/scenes/IFieldScene';
import { IScenarioEventManager } from '../../../../ts/core/events/IScenarioEventManager';
import { IScenarioEvent } from '../../../../ts/core/events/IScenarioEvent';
import { EventRange } from '../../../../ts/core/events/EventRange';

/**
 * テストで使う時はこのクラスを継承して必要なところだけ動くようなクラスを作る
 */
export class TestScenarioEventManager implements IScenarioEventManager {
  get scene(): IFieldScene {
    throw Error(this._getErrorMessage('scene'));
  }
    
  set scene(v: IFieldScene) {
    throw Error(this._getErrorMessage('scene'));      
  }

  get events(): EventRange[] {
    throw Error(this._getErrorMessage('events'));
  }
    
  set events(v: EventRange[]) {
    throw Error(this._getErrorMessage('events'));      
  }

  get currentEvents(): IScenarioEvent[] {
    throw Error(this._getErrorMessage('currentEvents'));
  }
    
  set currentEvents(v: IScenarioEvent[]) {
    throw Error(this._getErrorMessage('currentEvents'));      
  }

  get isGoing(): boolean {
    throw Error(this._getErrorMessage('isGoing'));
  }

  set isGoing(v: boolean) {
    throw Error(this._getErrorMessage('isGoing'));
  }

  start(eventRange: EventRange): void {
    throw Error(this._getErrorMessage('start'));
  }

  update(): void {
    throw Error(this._getErrorMessage('update'));
  }

  getCurrentEventSize(): number {
    throw Error(this._getErrorMessage('getCurrentEventSize'));
  }

  emit(event: string, ...args: any[]): boolean {
    throw Error(this._getErrorMessage('getCurrentEventSize'));
  }

  on(event: string, listener: (...args: any[]) => void): this {
    throw Error(this._getErrorMessage('getCurrentEventSize'));
  }

  private _getErrorMessage(functionName: string): string {
    return `illegal operation for TestScenarioEventManager. "${functionName}"`;
  }
}