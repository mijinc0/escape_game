import { IScenarioEvent } from '../IScenarioEvent';
import { ScenarioEventManager } from '../ScenarioEventManager';
import { Keys } from '../../models/Keys';

// 条件分岐の条件
type ConditionCallback = () => boolean;
type ConditionEntry = {conditionCallback: ConditionCallback, events: IScenarioEvent[]};

export class If implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  private sceneEventManager: ScenarioEventManager;
  private events: ConditionEntry[];

  constructor (conditionCallback: ConditionCallback, ...events: IScenarioEvent[]) {
    this.sceneEventManager = new ScenarioEventManager();
    this.events = [{conditionCallback: conditionCallback, events: events}];
    this.isComplete = false;
  }

  update(frame: number, keys?: Keys): void {
    if (this.isComplete) return;

    if (this.sceneEventManager.isGoing) {
      this._update(frame, keys)
    } else {
      this._start();
    }
  }

  elseIf(conditionCallback: ConditionCallback, ...events: IScenarioEvent[]): If {
    this.events.push({conditionCallback: conditionCallback, events: events});
    return this;
  }

  else (...events: IScenarioEvent[]): void {
    this.events.push({conditionCallback: () => (true), events: events});
  }

  private _update(frame: number, keys?: Keys): void {
    this.sceneEventManager.keys = keys;
    this.sceneEventManager.update(frame);
    // 上記のupdateで終了していればcomplete
    if (!this.sceneEventManager.isGoing) this.isComplete = true;
  }

  private _start(): void {
    // 1. conditionCallbackの結果が最初にtrueになるentryを取得する
    const entry = this.events.find((entry: ConditionEntry) => (entry.conditionCallback()));

    // 2. entryがある場合はstart、無ければ即終了
    if (entry) {
      this.sceneEventManager.start(entry.events);
    } else {
      this.isComplete = true;
    }
  }
}