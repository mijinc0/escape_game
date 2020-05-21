import { Keys } from '../models/Keys';
 
export interface IScenarioEvent {
  isComplete: boolean;
  isAsync: boolean;

  /**
   * 
   * @param frame 実行時のフレーム
   * @param asyncEvents このイベントと一緒に実行されるイベント群
   */
  update(frame: number, keys?: Keys, context?: any): void;
}