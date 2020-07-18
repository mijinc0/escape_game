import * as Actor from '../actors';
import { IFieldActorStatusPage } from './IFieldActorStatusPage';

export interface IActorEventRegistrar {
  regist(actor: Actor.IActor, page: IFieldActorStatusPage): void;
}
