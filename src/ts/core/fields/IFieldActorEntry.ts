import * as Model from '../models';
import { IFieldActorStatusPage } from './IFieldActorStatusPage';

export interface IFieldActorEntry {
  id: number;

  name: string;

  statusPages: IFieldActorStatusPage[];

  position?: Model.Position;
}
