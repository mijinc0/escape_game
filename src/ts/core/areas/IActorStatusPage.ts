import { IBodyConfig } from '../actors/IBodyConfig';
import { ActorSpriteTypes } from '../actors/ActorSpriteTypes';
import { Direction } from '../models/Direction';

export interface IActorStatusPage {
  eventId: number;
  
  eventEmitType: string;

  spriteType: ActorSpriteTypes;
  
  /**
   * 指定が無い場合は透明のActor(bodyのみ)を作る
   */
  spriteKey?: string;
  
  /**
   * default = 0
   */
  initFrame?: number;

  /**
   * default = Down
   */
  direction?: Direction;

  /**
   * default = false
   */
  overlapOnly?: boolean;
  
  bodyConfig?: IBodyConfig;
  
  /**
   * スポーン条件
   */
  criteria?: () => boolean;
}