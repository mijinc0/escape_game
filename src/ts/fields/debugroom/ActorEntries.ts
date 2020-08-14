import * as Actor from '../../core/actors';
import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';

// prettier-ignore
const actorEntries: Field.IFieldActorEntry[] = [
  {
    id: 0,
    name: 'demoA',
    statusPages: [
      {
        eventId: 0,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('demosprite'),
        overlapOnly: true,
        initFrame: 3,
      },
    ],
  },

  {
    id: 1,
    name: 'eventA',
    statusPages: [
      {
        eventId: 1,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('memo'),
        initFrame: 0,
      },
    ],
  },

  {
    id: 2,
    name: 'eventA',
    statusPages: [
      {
        eventId: 2,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('memo'),
        initFrame: 0,
      },
    ],
  },

  {
    id: 3,
    name: 'eventA',
    statusPages: [
      {
        eventId: 3,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('door'),
        initFrame: 0,
      },
    ],
  },
];

export default actorEntries;
