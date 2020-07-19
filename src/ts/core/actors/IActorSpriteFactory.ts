import { IActorSprite } from './IActorSprite';
import { IBodyConfig } from './IBodyConfig';

export interface IActorSpriteFactory {
  createOneWayAnimActorSprite(
    x: number,
    y: number,
    spriteKey: string,
    initFrame: number,
    bodyConfig?: IBodyConfig,
  ): IActorSprite;

  createFourWayAnimsActorSprite(
    x: number,
    y: number,
    spriteKey: string,
    initFrame: number,
    bodyConfig?: IBodyConfig,
  ): IActorSprite;

  createInvisibleActorSprite(x: number, y: number, bodyConfig?: IBodyConfig): IActorSprite;

  bodySetting(sprite: IActorSprite, bodyConfig?: IBodyConfig): void;
}
