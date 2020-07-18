import { IActorSprite } from './IActorSprite';

export interface ILayeredSprite {
  add(key: string, sprite: IActorSprite): void;

  remove(key: string, destroy: boolean): boolean;
}
