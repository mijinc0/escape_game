import { IScenarioEvent } from '../IScenarioEvent';
import { CircularRange } from '../CircularRange';
import { ScenarioEventUpdateConfig } from '../ScenarioEventUpdateConfig';

export class Loop implements IScenarioEvent {
  readonly isAsync = false;
  
  isComplete: boolean;

  private eventRange: CircularRange<IScenarioEvent>;

  constructor(events: IScenarioEvent[]) {
    // 全てのイベントが非同期イベントだと、非同期イベントが無限に増えることになりかねないので、それは禁止する
    const hasSync = events.map((event: IScenarioEvent) => (!event.isAsync)).includes(true);
    if (!hasSync) throw Error('Loop event must has sync event.');

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