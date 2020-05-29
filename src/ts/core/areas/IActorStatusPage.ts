import { IActorSpawnCondition } from './IActorSpawnCondition';
import { SpriteConfig } from '../actors/SpriteConfig';

export interface IActorStatusPage {
  spawnCondition?: IActorSpawnCondition;
  eventId: number;
  eventEmitType: string;
  spriteConfig: SpriteConfig;
  initFrame: number;
}