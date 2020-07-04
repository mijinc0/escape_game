import { IGameGlobal } from '../IGameGlobal';
import { BodyConfig } from '../actors/BodyConfig';
import { Predicate } from '../models/Predicate';

export interface IActorStatusPage {
  eventId: number;
  
  eventEmitType: string;
  
  spriteKey: string;
  
  initFrame: number;
  
  bodyConfig?: BodyConfig;
  
  /**
   * スポーン条件
   */
  criteria?: Predicate<IGameGlobal>;
}