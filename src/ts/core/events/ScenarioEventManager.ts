import { IScenarioEventManager } from './IScenarioEventManager';
import { IScenarioEvent } from './IScenarioEvent';
import { Keys } from '../models/Keys';

/*
{
  id: 1,
  event: [
    cmd.message('saeoigjoiajieg', true),

    op.if(() => {GameFlag.hasFlag('sometiong')},

      cmd.message('asegoeasio'),
    ).elseIf('var: 100')(
      cmd.message('asegoeasio'),

    ).endIf(),

    op.while('times:5')(
      cmd.message('asegoeasio'),
      cmd.item('stick', -1),
      cmd.message('asegoeasio'),
      cmd.flag('opening', true), 
      cmd.message('asegoeasio'),
      cmd.var('stage', 10),
    ),
  ]
}
*/

export class ScenarioEventManager implements IScenarioEventManager {
  keys: Keys;
  isGoing: boolean;
  
  private events: IScenarioEvent[];
  private currentEvents: IScenarioEvent[];
  private nextIndex: number;

  constructor(keys?: Keys) {
    this.keys = keys ? keys : null;
    this.events = [];
    this.nextIndex = 0;
    this.isGoing = false;
  }

  start(events: IScenarioEvent[]): void {
    if (this.isGoing) {
      console.warn('scenario event manager already has events');
      return;
    }

    this.events = events;
    this.currentEvents = []
    this.nextIndex = 0;
    this.isGoing = true;

    // 最初のイベントをcurrentEventsにセットするために一度updateする必要がある
    this.update(0);
  }

  endEvent(): void {
    this.clearEvent();
  }

  update(frame: number): void {
    // 走らせるイベントが無い場合は即return
    if (!this.isGoing) return;
  
    this.currentEvents.forEach((event: IScenarioEvent) => {
      event.update(frame, this.keys, this);
    });

    // 完了したイベントを削除
    this.currentEvents = this._getIncompleteEnvets(this.currentEvents);

    // currentEventsから同期イベントがなくなれば次のイベントを取得する
    const hasSyncEvent = !!this.currentEvents.find((event: IScenarioEvent) => (!event.isAsync));

    if (this._isEnd()) {
      // 終了
      this.endEvent();
  
    } else if (hasSyncEvent || this.nextIndex >= this.events.length) {
      // currentEventsの終了待ち
      return;

    } else { 
      // 次のイベントを取得する
      this._goNextEvents();
    }
  }

  clearEvent(): void {
    this.events = [];
    this.currentEvents = [];
    this.nextIndex = 0;
    this.isGoing = false;
  }

  getCurrentEventSize(): number {
    return this.isGoing ? this.currentEvents.length : 0;
  }

  getAllEventSize(): number {
    return this.events.length;
  }

  // private
  private _goNextEvents(): void {
    const nextEvent = this.events[this.nextIndex];

    if (!nextEvent) return;

    // 次のイベントに完了フラグラ立っていなければcurrentsEventsの中に押し込む
    if (!nextEvent.isComplete) this.currentEvents.push(nextEvent);

    // インデックスをひとつ進める
    this.nextIndex++;

    // 次のイベントが非同期イベントまたは完了済みイベントなら、その次のイベントを取得する
    if (nextEvent.isAsync || nextEvent.isComplete) this._goNextEvents();
  }
 
  private _getIncompleteEnvets(events: IScenarioEvent[]): IScenarioEvent[] {
    return events.filter((event: IScenarioEvent) => (!event.isComplete));
  }

  private _isEnd(): boolean {
    return (this.currentEvents.length === 0) && (this.nextIndex >= this.events.length);
  }
}