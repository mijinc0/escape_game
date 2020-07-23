import * as Actor from '../../core/actors';
import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';

// prettier-ignore
const actorEntries: Field.IFieldActorEntry[] = [
  {
    id: 0,
    name: 'transferHallway2FB',
    statusPages: [
      {
        eventId: 0,
        eventEmitType: Field.EventEmitType.Collide,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 64, height: 8 },
        },
      },
    ],
  },

  {
    id: 1,
    name: 'door',
    statusPages: [
      {
        eventId: 1,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('door'),
        initFrame: 0,
      },
    ],
  },

  {
    id: 2,
    name: 'transferHallway1FA',
    statusPages: [
      {
        eventId: 2,
        eventEmitType: Field.EventEmitType.Collide,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 96 },
        },
      },
    ],
  },

  {
    id: 3,
    name: 'transferRoomA',
    statusPages: [
      {
        eventId: 3,
        eventEmitType: Field.EventEmitType.Collide,
        overlapOnly: true,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 64, height: 8 },
        },
      },
    ],
  },
];

export default actorEntries; 
