import * as Model from '../models';
import * as Actor from '../actors';
import * as Render from '../renders';

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
   * 'default'でActorSpriteにセットされたアニメーションを
   * スポーン時に再生するかどうか。(repeat = -1)
   * 
   * default = false;
   */
  playAnim?: boolean;

  /**
   * default = false
   */
  overlapOnly?: boolean;

  bodyConfig?: Actor.IBodyConfig;

  renderType?: Render.ActorRenderType;

  /**
   * スポーン条件
   */
  criteria?: () => boolean;
}
