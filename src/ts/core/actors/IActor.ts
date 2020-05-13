import { GameFlags } from '../models/GameFlags';

export interface IActor {
  name: string;

  flags: GameFlags;
}