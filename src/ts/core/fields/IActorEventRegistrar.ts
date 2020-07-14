import { IActorStatusPage } from './IActorStatusPage';
import { IActor } from '../actors/IActor';
 
export interface IActorEventRegistrar {
  regist(actor: IActor, page: IActorStatusPage): void;
}