import { IScenarioEvent } from './IScenarioEvent';
import { Keys } from '../models/Keys';

export interface IScenarioEventManager {
  keys: Keys;

  start(events: IScenarioEvent[]): void;

  update(frame: number): void ;

  isGoing(): boolean;

  clearEvent(): void;

  getCurrentEventSize(): number;

  getAllEventSize(): number;

  interrupt(...events: IScenarioEvent[]): void; 
}