import { IScenarioEventManager } from './IScenarioEventManager';
import { IScenarioEvent } from './IScenarioEvent';
import { IRelationalChunk } from './IRelationalChunk';
import { Keys } from '../models/Keys';

type EventChunk = IRelationalChunk<IScenarioEvent>;

export class ScenarioEventManager implements IScenarioEventManager {
  keys: Keys;

  private currentChunk: EventChunk;
  private currentEvents: IScenarioEvent[];

  constructor(keys?: Keys) {
    this.keys = keys ? keys : null;
    this.currentChunk = null;
    this.currentEvents = [];
  }

  start(eventChunk: EventChunk): void {
    if (this.currentChunk && !this.currentChunk.isComplete()) {
      console.warn('scenario event manager already has events');
      return;
    }

    this.currentChunk = eventChunk;
    this.currentEvents = [];
    this._setNextEvnet();
  }

  update(frame: number): void {
    if (!this.currentChunk) return;

    this.currentEvents.forEach((event: IScenarioEvent) => {
      event.update(
        frame,
        {
          keys: this.keys,
          belongingChunk: this.currentChunk,
        }, 
      );
    });

    // 未完了イベントのみを残す
    this.currentEvents = this.currentEvents.filter((event: IScenarioEvent) => (!event.isComplete));

    // currentChunkから全てのイベントを取得済みではない、かつ、
    // 現在進行中のイベントが全て非同期イベントであれば、次のイベントをチャンクから取得しセットする
    if (!this.currentChunk.isComplete() && this._hasNoSyncEvnetIntoCurrentEvents()) {
      this._setNextEvnet();
    }
  }

  getCurrentEventSize(): number {
    return this.currentEvents.length;
  }

  private _setNextEvnet(): void {
    if (this.currentChunk.isComplete()) return;

    const next = this.currentChunk.next();

    this.currentEvents.push(next.value);

    // もし、次のイベントが最後でないかつ非同期イベントであれば、その次も取得する。
    if (!next.done && next.value.isAsync) this._setNextEvnet();
  }

  private _hasNoSyncEvnetIntoCurrentEvents(): boolean {
    return !this.currentEvents.find((event: IScenarioEvent) => (!event.isAsync));
  }
}