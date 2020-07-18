import * as Scene from '../scenes';
 
export interface IScenarioEvent {
  isComplete: boolean;

  isAsync: boolean;

  /**
   * 通常は、この中で isComplete = false をしてやる必要がある
   * これは、同じイベントを2度呼び出した時に、前回の処理で isCompleteフラグが立ってしまっているから
   * 
   * イベントはinitによって初期化され、使いまわされるので、状態内部の破壊的な処理を避けること
   * @param config 
   */
  init(scene: Scene.IFieldScene): void;

  update(scene: Scene.IFieldScene): void;

  complete(): void;
}