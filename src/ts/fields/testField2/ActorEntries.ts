import { ActorSpriteTypes } from '../../core/actors/ActorSpriteTypes';
import { IFieldActorEntry } from '../../core/fields/IFieldActorEntry';
import { AssetCacheKey } from '../../core/assets/AssetCacheKey';
import { EventEmitType } from '../../core/fields/EventEmitType';

export const ActorEntries: IFieldActorEntry[] = [
  {
    id: 0,
    name: 'door',
    position: {x: 352, y: 192},
    statusPages: [
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
  },
];