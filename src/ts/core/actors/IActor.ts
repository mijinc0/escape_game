import { GameFlags } from '../models/GameFlags';

export interface IActor {
  name: string;

  id: number;

  flags: GameFlags;
}