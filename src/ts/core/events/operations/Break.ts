import { CircularRange } from '../CircularRange';
import { EventRange } from '../EventRange';
import { IScenarioEvent } from '../IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../ScenarioEventUpdateConfig';

export class Break implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  constructor() {
    this.isComplete = false;
  }

  init(config: ScenarioEventUpdateConfig): void {
    this.isComplete = false;
  }

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    // Breakは進行中のイベントリストのうち、最初のCircularRangeが見つかったところまでレンジを削除する
    // 見つからない場合は削除しない
    if (config.events) {
      const circularRangeIndex = config.events.findIndex((range: EventRange) => (range instanceof CircularRange));
      // 参照元の配列を破壊する
      config.events.splice(0, circularRangeIndex + 1);
    }

    this.complete();
    
    return;
  }
  
  complete(): void {
    this.isComplete = true;
  }
}