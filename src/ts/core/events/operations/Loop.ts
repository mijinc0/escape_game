import { IScenarioEvent } from '../IScenarioEvent';
import { ScenarioEventManager } from '../ScenarioEventManager';
import { Keys } from '../../models/Keys';

export class Loop implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  private sceneEventManager: ScenarioEventManager;
  private events: IScenarioEvent[];

  constructor (...events: IScenarioEvent[]) {
    this.sceneEventManager = new ScenarioEventManager();
    this.events = events;
    this.isComplete = false;
  }

  update(frame: number, keys?: Keys): void {
    if (this.isComplete) return;

    if (this.sceneEventManager.isGoing) {
      this._update(frame, keys);
    } else {
      this._resetEvents();
      this.sceneEventManager.start(this.events);
      this._update(frame, keys);
    }
  }

  private _update(frame: number, keys?: Keys): void {
    this.sceneEventManager.keys = keys;
    this.sceneEventManager.update(frame);
  }

  /**
   * 全てのイベントのisCompleteフラグを下ろす
   */
  private _resetEvents(): void {
    this.events.forEach((event: IScenarioEvent) => {
      event.isComplete = false;
    });
  }
}