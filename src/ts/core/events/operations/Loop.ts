import { IScenarioEvent } from '../IScenarioEvent';
import { CircularRange } from '../CircularRange';
import { ScenarioEventUpdateConfig } from '../ScenarioEventUpdateConfig';

export class Loop implements IScenarioEvent {
  readonly isAsync = false;
  
  isComplete: boolean;

  private eventRange: CircularRange<IScenarioEvent>;

  constructor(events: IScenarioEvent[]) {
    // Loopに非同期イベントがあると不穏なのでとりあえず禁止しておく
    const hasAsync = events.map((event: IScenarioEvent) => (event.isAsync)).includes(true);
    if (hasAsync) throw Error('Loop event can not have async event.');

    this.eventRange = new CircularRange(events);
    this.isComplete = false;
  }

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    // 回転し続けるイベントレンジを割り込ませることで繰り返し処理を作る
    // このイベントレンジは自力では完了できないので、止める時は内部でBreakを使って外から破棄する必要がある
    if (config.events) config.events.unshift(this.eventRange);

    this.complete();

    return;
  }

  complete(): void {
    this.isComplete = true;
  }
}