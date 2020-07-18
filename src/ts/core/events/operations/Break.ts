import * as Scene from '../../scenes';
import { CircularRange } from '../CircularRange';
import { EventRange } from '../EventRange';
import { IScenarioEvent } from '../IScenarioEvent';

export class Break implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  constructor() {
    this.isComplete = false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;
  }

  update(scene: Scene.IFieldScene): void {
    // Breakは進行中のイベントリストのうち、最初のCircularRangeが見つかったところまでレンジを削除する
    // 見つからない場合は削除しない
    const events = scene.scenarioEventManager.events;
    const circularRangeIndex = events.findIndex(
      (range: EventRange) => range instanceof CircularRange,
    );
    // 参照元の配列を破壊する
    if (circularRangeIndex !== -1) {
      events.splice(0, circularRangeIndex + 1);
    }

    this.complete();

    return;
  }

  complete(): void {
    this.isComplete = true;
  }
}
