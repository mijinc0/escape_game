import { IFieldActorStatusPage } from './IFieldActorStatusPage';
import { IActor } from '../actors/IActor';
 
export interface IActorEventRegistrar {
  regist(actor: IActor, page: IFieldActorStatusPage): void;
}