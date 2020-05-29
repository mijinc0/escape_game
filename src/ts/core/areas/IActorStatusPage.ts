import { IActorSpawnCriteria } from './IActorSpawnCriteria';
import { SpriteConfig } from '../actors/SpriteConfig';

export interface IActorStatusPage {
  spawnCriteria?: IActorSpawnCriteria;
  eventId: number;
  eventEmitType: string;
  spriteConfig: SpriteConfig;
  initFrame: number;
}