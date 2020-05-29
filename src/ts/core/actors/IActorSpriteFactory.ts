import { IActorSprite } from './IActorSprite';
import { SpriteConfig } from './SpriteConfig';

export interface IActorSpriteFactory {
  loadMultipileAssets(configs: SpriteConfig[]): void;

  loadAssets(config: SpriteConfig): void;

  create(x: number, y: number, spriteKey: string, initFrame: number): IActorSprite;
}