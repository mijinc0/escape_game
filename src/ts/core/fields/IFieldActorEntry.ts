import { IFieldActorStatusPage } from './IFieldActorStatusPage';
import { Position } from '../models/Position';

export interface IFieldActorEntry {
  id: number;

  name: string;
  
  statusPages: IFieldActorStatusPage[];
  
  position?: Position;
}