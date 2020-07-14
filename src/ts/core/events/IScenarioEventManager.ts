import { EventRange } from './EventRange';
import { IScenarioEvent } from './IScenarioEvent';
import { IFieldScene } from '../scenes/IFieldScene';

export interface IScenarioEventManager {
  scene: IFieldScene;

  events: EventRange[];

  currentEvents: IScenarioEvent[];

  isGoing: boolean;

  start(eventRange: EventRange): void;

  update(): void;

  getCurrentEventSize(): number;

  emit(event: string, ...args: any[]): boolean;

  /**
   * eventは以下の通り
   * -    start : this.start(eventRange)実行時に発火される
   * - complete : currentEventsが空になったタイミングで発火される
   * 
   * @param event 
   * @param listener 
   */
  on(event: string, listener: (...args: any[]) => void): this;
}