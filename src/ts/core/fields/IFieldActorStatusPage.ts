import * as Model from '../models';
import * as Actor from '../actors';

export interface IFieldActorStatusPage {
  eventId: number;

  eventEmitType: string;

  spriteType: Actor.ActorSpriteTypes;

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
  direction?: Model.Direction;

  /**
   * default = false
   */
  overlapOnly?: boolean;

  bodyConfig?: Actor.IBodyConfig;

  /**
   * スポーン条件
   */
  criteria?: () => boolean;
}
