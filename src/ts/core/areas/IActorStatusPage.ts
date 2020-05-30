import { IGameGlobal } from '../IGameGlobal';
import { SpriteConfig } from '../actors/SpriteConfig';
import { Predicate } from '../models/Predicate';

export interface IActorStatusPage {
  criteria?: Predicate<IGameGlobal>;
  eventId: number;
  eventEmitType: string;
  isOverlap: boolean;
  spriteConfig: SpriteConfig;
  initFrame: number;
}