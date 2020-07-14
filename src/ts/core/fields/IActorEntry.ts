import { IActorStatusPage } from './IActorStatusPage';
import { Position } from '../models/Position';

export interface IActorEntry {
  id: number;

  name: string;
  
  statusPages: IActorStatusPage[];
  
  position?: Position;
}