import * as Actor from '../actors';
import { IFieldActorStatusPage } from './IFieldActorStatusPage';

export interface IActorEventManager {
  apply(actor: Actor.IActor, page: IFieldActorStatusPage): void;
}
