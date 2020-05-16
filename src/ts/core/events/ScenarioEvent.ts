import { Keys } from '../models/Keys';

export interface ScenarioEvent {
  keys: Keys;
  isComplete: boolean;
  isAsync: boolean;

  update(frame: number): void;
}