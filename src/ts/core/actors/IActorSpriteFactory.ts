import { IActorSprite } from './IActorSprite';
import { IBodyConfig } from './IBodyConfig';

export interface IActorSpriteFactory {
  create(x: number, y: number, spriteKey: string, initFrame: number, bodyConfig?: IBodyConfig): IActorSprite;
}