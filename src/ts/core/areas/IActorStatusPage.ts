import { IGameGlobal } from '../IGameGlobal';
import { SpriteConfig } from '../actors/SpriteConfig';
import { BodyConfig } from '../actors/BodyConfig';
import { Predicate } from '../models/Predicate';

export interface IActorStatusPage {
  eventId: number;
  eventEmitType: string;
  spriteConfig: SpriteConfig;
  initFrame: number;
  bodyConfig?: BodyConfig;
  criteria?: Predicate<IGameGlobal>;
}