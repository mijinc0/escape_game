import { Actor } from '../../core/actors/Actor';
import { ActorEntry } from '../../core/areas/ActorEntry';
import { AssetCacheKey } from '../../core/assets/AssetCacheKey';
import { EventEmitType } from '../../core/areas/EventEmitType';
import { Direction } from '../../core/models/Direction';

export const ActorEntries: ActorEntry[] = [
  new ActorEntry(
    new Actor(0, 'npc1'),
    {x: 240, y: 500},
    Direction.Down,
    [
      {
        eventId: 0,
        eventEmitType: EventEmitType.Search,
        spriteKey: AssetCacheKey.spritesheet('hero'),
        initFrame: 0,
        overlapOnly: true,
        bodyConfig: {
          size: 0.8
        },
      },
    ],
  ),

  new ActorEntry(
    new Actor(1, 'npc2'),
    {x: 200, y: 100},
    Direction.Down,
    [
      {
        eventId: 0,
        eventEmitType: EventEmitType.Collide,
        spriteKey: AssetCacheKey.spritesheet('hero'),
        initFrame: 0,
      },
    ],
  ),
];