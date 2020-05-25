import { Actor } from '../../core/actors/Actor';
import { IActor } from '../../core/actors/IActor';
import { ActorEntry } from '../../core/areas/ActorEntry';
import { SpriteConfigs } from '../../sprites/SpriteConfigs';

export const ActorEntries: ActorEntry[] = [
  new ActorEntry('hero', 0, {x: 0, y: 0}, SpriteConfigs.hero, 0, Actor),
];