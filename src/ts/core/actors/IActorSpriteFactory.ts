import { IActorSprite } from './IActorSprite';
import { BodyConfig } from './BodyConfig';

export interface IActorSpriteFactory {
  create(x: number, y: number, spriteKey: string, initFrame: number, bodyConfig?: BodyConfig): IActorSprite;
}