import { Actor } from '../../core/actors/Actor';
import { ActorSpriteTypes } from '../../core/actors/ActorSpriteTypes';
import { IActorEntry } from '../../core/areas/IActorEntry';
import { AssetCacheKey } from '../../core/assets/AssetCacheKey';
import { EventEmitType } from '../../core/areas/EventEmitType';
import { Direction } from '../../core/models/Direction';

export const ActorEntries: IActorEntry[] = [
  {
    id: 0,
    name: 'npc1',
    statusPages: [
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
  },

  {
    id: 1,
    name: 'npc1',
    statusPages: [
      {
        eventId: 0,
        eventEmitType: EventEmitType.Collide,
        spriteType: ActorSpriteTypes.FourWayAnims,
        spriteKey: AssetCacheKey.spritesheet('hero'),
        initFrame: 0,
      },
    ],
  },

  {
    id: 2,
    name: 'invisible_npc',
    position: {x: 100, y: 200},
    statusPages: [
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
  },
];