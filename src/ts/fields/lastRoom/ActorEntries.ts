import * as Actor from '../../core/actors';
import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';

// prettier-ignore
const actorEntries: Field.IFieldActorEntry[] = [
  {
    id: 0,
    name: 'endingEvent',
    statusPages: [
      {
        eventId: 0,
        eventEmitType: Field.EventEmitType.Immediately,
        spriteType: Actor.ActorSpriteTypes.Invisible,
      },
    ],
  },

  {
    id: 1,
    name: 'door',
    statusPages: [
      {
        eventId: -1,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('door'),
        initFrame: 0,
      },
    ],
  },
];

export default actorEntries;
