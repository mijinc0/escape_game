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
  private currentEvent: IScenarioEvent[];
  private eventQueue: IScenarioEvent[];

  constructor(keys?: Keys) {
    this.keys = keys ? keys : null;
    this.currentEvent = [];
    this.eventQueue = [];
  }

  start(events: IScenarioEvent[]): void {
    // 既にイベントがある場合は無視する
    if (this.isGoing()) {
      console.warn('scenario event manager already has events');
      return;
    }

    this.eventQueue = events;

    // 最初のイベントをキューから押し出すために、一度updateをする
    this.update(0);
  }

  update(frame: number): void {
    // 走らせるイベントが無い場合は即return
    if (!this.isGoing()) return;
  
    // 各イベントのupdate
    this.currentEvent.forEach((event: IScenarioEvent) => {
      this._update(frame, event);
    });

    // 終了したイベントを削除
    this.currentEvent = this.currentEvent.filter((event: IScenarioEvent) => (!event.isComplete));

    // 全てのイベントが終了したらcurrentEventが空になるので、次のイベントを取り出す
    if (this.currentEvent.length === 0) {
      this.currentEvent = this._getNextEventFromQueue();
    }
  }

  isGoing(): boolean {
    return (this.currentEvent.length > 0) || (this.eventQueue.length > 0);
  }

  clearEvent(): void {
    this.currentEvent = [];
    this.eventQueue = [];
  }

  getCurrentEventSize(): number {
    return this.currentEvent.length;
  }

  getAllEventSize(): number {
    return this.currentEvent.length + this.eventQueue.length;
  }

  interrupt(...events: IScenarioEvent[]): void {
    this.eventQueue.unshift(...events);
  }

  // private
  private _update(frame: number, event: IScenarioEvent): void {
    event.update(frame, this.keys, this.currentEvent);

    if (event.isComplete) event.complete(frame);
  }

  private _getNextEventFromQueue(): IScenarioEvent[] {
    const nextEvent = this.eventQueue.shift();

    if (!nextEvent) return [];

    // 次のイベントが非同期イベントの場合、その次のイベントを取り出して合わせたものを返す
    // これは再起するので、連続した非同期イベントを全て取り出す
    return nextEvent.isAsync ?
      [nextEvent].concat(this._getNextEventFromQueue()) :
      [nextEvent];
  }  
}