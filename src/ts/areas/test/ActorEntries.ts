import { SpriteConfigs } from '../../sprites/SpriteConfigs';
import { Actor } from '../../core/actors/Actor';
import { ActorEntry } from '../../core/areas/ActorEntry';
import { EventEmitType } from '../../core/areas/EventEmitType';
import { Direction } from '../../core/models/Direction';

export const ActorEntries: ActorEntry[] = [
  new ActorEntry(
    new Actor(0, 'hero'),
    {x: 100, y: 100},
    Direction.Down,
    [
      {
        eventId: 0,
        eventEmitType: EventEmitType.Search,
        spriteConfig: SpriteConfigs.hero,
        initFrame: 0,
        bodyConfig: {
          overlapOnly: true,
          size: 0.8
        },
      },
    ],
  ),

  new ActorEntry(
    new Actor(1, 'hero'),
    {x: 200, y: 100},
    Direction.Down,
    [
      {
        eventId: 0,
        eventEmitType: EventEmitType.Collide,
        spriteConfig: SpriteConfigs.hero,
        initFrame: 0,
      },
    ],
  ),
];