import { IScenarioEvent } from '../IScenarioEvent';
import { CircularRange } from '../CircularRange';
import { IFieldScene } from '../../scenes/IFieldScene';

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

  init(scene: IFieldScene): void {
    this.isComplete = false;
  }

  update(scene: IFieldScene): void {
    // 回転し続けるイベントレンジを割り込ませることで繰り返し処理を作る
    // このイベントレンジは自力では完了できないので、止める時は内部でBreakを使って外から破棄する必要がある
    const events = scene.scenarioEventManager.events;

    events.unshift(this.eventRange);

    this.complete();

    return;
  }

  complete(): void {
    this.isComplete = true;
  }
}