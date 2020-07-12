import { Actor } from '../../core/actors/Actor';
import { ActorSpriteTypes } from '../../core/actors/ActorSpriteTypes';
import { IActorEntry } from '../../core/areas/IActorEntry';
import { ActorEntry } from '../../core/areas/ActorEntry';
import { AssetCacheKey } from '../../core/assets/AssetCacheKey';
import { EventEmitType } from '../../core/areas/EventEmitType';

export const ActorEntries: IActorEntry[] = [
  new ActorEntry(
    new Actor(0, 'door'),
    [
      {
        eventId: 0,
        eventEmitType: EventEmitType.Search,
        spriteType: ActorSpriteTypes.OneWayAnim,
        spriteKey: AssetCacheKey.spritesheet('door'),
        initFrame: 0,
        overlapOnly: true,
        bodyConfig: {
          size: 1,
        },
      },
    ],
    {x: 352, y: 192},
  ),
];