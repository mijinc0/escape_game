import { IRange } from './IRange';
import { IScenarioEvent } from './IScenarioEvent';
import { Keys } from '../models/Keys';

type EventRange = IRange<IScenarioEvent>;

/**
 * 1. イベントはRangeと呼ばれる構造体にまとめられたものを1ブロックとして管理する
 * 2. イベントは先頭のRangeから順次取得され、currentEventsに放り込まれる
 * 3. 取得したイベントが同期イベントの場合、そのイベントがcurentEventsから消えない限り次のイベントは取得しない
 * 4. 取得したイベントが非同期イベントの場合、そのまた次のイベントも同時に取得する(同期イベントの取得又は全てのイベントが取得されるまで繰り返される)
 * 5. currentEventsに収められたイベントはマネージャーがupdateされるとupdateされる
 * 6. 完了したイベントはcurrentEventsから削除される
 * 7. イベントを割り込ませたい場合はeventsの先頭にRangeを差し込めば良い
 * 8. break等でイベントをRange単位でスキップさせたい場合はそのRangeをeventsから削除すれば良い
 */
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

    // 1. 先頭のレンジを取得する
    const frontRange = this.events[0];

    // 2. 先頭のレンジから次のイベントを要求する
    const next = frontRange.next();

    // 3. 次のイベントの完了フラグが立っていない時だけ、イベントを追加する
    if (!next.isComplete) this.currentEvents.push(next);

    // 4. 最初のイベントレンジが終了した(全てのイベントを取得した等の)場合、削除する
    if (frontRange.isComplete()) {
      this.events = this.events.slice(1);
    }

    // 5. もし、次のイベントが最後でないかつ非同期イベントであれば、その次も取得する。
    //    イベントを全て取得したレンジは4の段階で破棄されているので、次があるかどうかは
    //    this.events.length > 0 で分かる
    if (this.events.length > 0 && next.isAsync) this._setNextEvnet();
  }

  private _hasNoSyncEvnetIntoCurrentEvents(): boolean {
    return !this.currentEvents.find((event: IScenarioEvent) => (!event.isAsync));
  }
}