import { IScenarioEvent } from './IScenarioEvent';
import { Keys } from '../models/Keys';

export interface IScenarioEventManager {
  keys: Keys;
  isGoing: boolean;

  start(events: IScenarioEvent[]): void;

  update(frame: number): void;

  clearEvent(): void;

  getCurrentEventSize(): number;

  getAllEventSize(): number;
}