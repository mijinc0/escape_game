import { IScenarioEvent } from '../../../../ts/core/events/IScenarioEvent';

/**
 * 何もしないupdate()されたらcompleteになるだけのテスト用イベント
 */
export class TestEvent implements IScenarioEvent {
  isComplete: boolean;
  isAsync: boolean;

  constructor() {
    this.isComplete = false;
    this.isAsync = false;
  }

  init(): void {}

  update(): void {
    this.complete();
  }
  
  complete(): void {
    this.isComplete = true;
  }
}