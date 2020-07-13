import { EventRange } from './EventRange';
import { IScenarioEvent } from './IScenarioEvent';
import { IFieldScene } from '../scenes/IFieldScene';

export interface IScenarioEventManager {
  scene: IFieldScene;

  events: EventRange[];

  currentEvents: IScenarioEvent[];

  start(eventRange: EventRange): void;

  update(): void;

  getCurrentEventSize(): number;

  isGoing(): boolean;
}