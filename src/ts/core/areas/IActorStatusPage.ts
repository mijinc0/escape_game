import { IBodyConfig } from '../actors/IBodyConfig';

export interface IActorStatusPage {
  eventId: number;
  
  eventEmitType: string;
  
  /**
   * 指定が無い場合は透明のActor(bodyのみ)を作る
   */
  spriteKey?: string;
  
  /**
   * default = 0
   */
  initFrame?: number;

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