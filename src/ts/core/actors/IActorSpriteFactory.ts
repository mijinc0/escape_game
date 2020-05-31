import { IActorSprite } from './IActorSprite';
import { SpriteConfig } from './SpriteConfig';
import { BodyConfig } from './BodyConfig';

export interface IActorSpriteFactory {
  loadMultipileAssets(configs: SpriteConfig[]): void;

  loadAssets(config: SpriteConfig): void;

  create(x: number, y: number, spriteKey: string, initFrame: number, bodyConfig?: BodyConfig): IActorSprite;
}