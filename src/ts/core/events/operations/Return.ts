import * as Scene from '../../scenes';
import { IScenarioEvent } from '../IScenarioEvent';

export class Return implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  constructor() {
    this.isComplete = false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;
  }

  update(scene: Scene.IFieldScene): void {
    // 全てのイベントレンジを破棄する
    const events = scene.scenarioEventManager.events;
    events.splice(0);

    // 進行中のイベントを全てcompleteする
    const currentEvents = scene.scenarioEventManager.currentEvents;
    currentEvents.forEach((event: IScenarioEvent) => {
      event.complete();
      // 殆どの場合、complete()でフラグが立つが、念の為立てておく
      event.isComplete = true;
    });

    this.complete();

    return;
  }

  complete(): void {
    this.isComplete = true;
  }
}