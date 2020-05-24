import { CircularRange } from '../CircularRange';
import { IRange } from '../IRange';
import { IScenarioEvent } from '../IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../ScenarioEventUpdateConfig';

export class Break implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  constructor() {
    this.isComplete = false;
  }

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    // Breakは進行中のイベントリストのうち、最初のCircularRangeが見つかったところまでレンジを削除する
    // 見つからない場合は削除しない
    if (config.events) {
      const circularRangeIndex = config.events.findIndex((range: IRange<IScenarioEvent>) => (event instanceof CircularRange));
      config.events = config.events.slice(circularRangeIndex + 1);
    }

    this.complete();
    
    return;
  }
  
  complete(): void {
    this.isComplete = true;
  }
}