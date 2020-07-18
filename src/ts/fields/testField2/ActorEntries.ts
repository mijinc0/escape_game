import * as Actor from '../../core/actors';
import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';

export const ActorEntries: Field.IFieldActorEntry[] = [
  {
    id: 0,
    name: 'door',
    position: {x: 352, y: 192},
    statusPages: [
      {
        eventId: 0,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('door'),
        initFrame: 0,
        overlapOnly: true,
        bodyConfig: {
          size: 1,
        },
      },
    ],
  },

  {
    id: 1,
    name: 'item',
    position: {x: 288, y: 192},
    statusPages: [
      {
        eventId: 1,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        overlapOnly: true,
        bodyConfig: {
          size: {width: 32, height: 32},
        },
      },
    ],
  },
];