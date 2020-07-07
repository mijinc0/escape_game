import { IBodyConfig } from '../actors/IBodyConfig';

export interface IActorStatusPage {
  eventId: number;
  
  eventEmitType: string;
  
  spriteKey: string;
  
  initFrame: number;

  overlapOnly?: boolean;
  
  bodyConfig?: IBodyConfig;
  
  /**
   * スポーン条件
   */
  criteria?: () => boolean;
}