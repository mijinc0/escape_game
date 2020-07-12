import { Actor } from '../../core/actors/Actor';
import { ActorSpriteTypes } from '../../core/actors/ActorSpriteTypes';
import { IActorEntry } from '../../core/areas/IActorEntry';
import { ActorEntry } from '../../core/areas/ActorEntry';
import { AssetCacheKey } from '../../core/assets/AssetCacheKey';
import { EventEmitType } from '../../core/areas/EventEmitType';
import { Direction } from '../../core/models/Direction';

export const ActorEntries: IActorEntry[] = [
  new ActorEntry(
    new Actor(0, 'npc1'),
    [
      {
        eventId: 0,
        eventEmitType: EventEmitType.Search,
        spriteType: ActorSpriteTypes.FourWayAnims,
        spriteKey: AssetCacheKey.spritesheet('hero'),
        direction: Direction.Left,
        initFrame: 0,
        bodyConfig: {
          size: 0.8
        },
      },
    ],
  ),

  new ActorEntry(
    new Actor(1, 'npc2'),
    [
      {
        eventId: 0,
        eventEmitType: EventEmitType.Collide,
        spriteType: ActorSpriteTypes.FourWayAnims,
        spriteKey: AssetCacheKey.spritesheet('hero'),
        initFrame: 0,
      },
    ],
  ),

  new ActorEntry(
    new Actor(2, 'invisible_npc'),
    [
      {
        eventId: 1,
        eventEmitType: EventEmitType.Collide,
        overlapOnly: true,
        spriteType: ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: {width: 20, height: 30},
        },
      },
    ],
    {x: 100, y: 200},
  ),
];