import { IScenarioEvent } from './IScenarioEvent';
import { IRange } from './IRange';
import { Keys } from '../models/Keys';

type EventRange = IRange<IScenarioEvent>;

export class ScenarioEventManager {
  keys: Keys;

  private events: EventRange[];
  private currentEvents: IScenarioEvent[];

  constructor(keys?: Keys) {
    this.keys = keys ? keys : null;
    this.events = [];
    this.currentEvents = [];
  }

  start(eventRange: EventRange): void {
    if (this.currentEvents.length > 0 ) {
      console.warn('scenario event manager already has events');
      return;
    }

    this.events.push(eventRange);
    this.currentEvents = [];
    this._setNextEvnet();
  }

  update(frame: number): void {
    if (this.currentEvents.length === 0) return;

    this.currentEvents.forEach((event: IScenarioEvent) => {
      event.update(
        frame,
        {
          keys: this.keys,
          events: this.events,
          currentEvents: this.currentEvents,
        }, 
      );
    });

    // 未完了イベントのみを残す
    this.currentEvents = this.currentEvents.filter((event: IScenarioEvent) => (!event.isComplete));

    // 全てのイベントを取得済みではない、かつ、
    // 現在進行中のイベントが全て非同期イベントであれば、次のイベントをチャンクから取得しセットする
    if (this.events.length > 0 && this._hasNoSyncEvnetIntoCurrentEvents()) {
      this._setNextEvnet();
    }
  }

  getCurrentEventSize(): number {
    return this.currentEvents.length;
  }

  private _setNextEvnet(): void {
    if (this.events.length === 0) return;

    const frontRange = this.events[0];

    const next = frontRange.next();

    // 次のイベントの完了フラグが立っていない時だけ、イベントを追加する
    if (!next.isComplete) this.currentEvents.push(next);

    // 最初のイベントレンジが終了した(全てのイベントを取得した等の)場合、削除する
    if (frontRange.isComplete()) {
      this.events = this.events.slice(1);
    }

    // もし、次のイベントが最後でないかつ非同期イベントであれば、その次も取得する。
    if (this.events.length > 0 && next.isAsync) this._setNextEvnet();
  }

  private _hasNoSyncEvnetIntoCurrentEvents(): boolean {
    return !this.currentEvents.find((event: IScenarioEvent) => (!event.isAsync));
  }
}