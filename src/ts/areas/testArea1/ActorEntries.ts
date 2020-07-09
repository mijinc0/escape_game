import { Actor } from '../../core/actors/Actor';
import { ActorEntry } from '../../core/areas/ActorEntry';
import { AssetCacheKey } from '../../core/assets/AssetCacheKey';
import { EventEmitType } from '../../core/areas/EventEmitType';
import { Direction } from '../../core/models/Direction';

export const ActorEntries: ActorEntry[] = [
  new ActorEntry(
    new Actor(0, 'npc1'),
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

  new ActorEntry(
    new Actor(2, 'invisible_npc'),
    Direction.Down,
    [
      {
        eventId: 0,
        eventEmitType: EventEmitType.Search,
        overlapOnly: true,
        bodyConfig: {
          size: {width: 20, height: 30},
        },
      },
    ],
    {x: 100, y: 200},
  ),
];