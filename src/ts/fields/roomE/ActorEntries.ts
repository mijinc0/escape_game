import * as Actor from '../../core/actors';
import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';
import { GameGlobal } from '../../GameGlobal';
import { GameItemIds } from '../../items/GameItemIds';

// prettier-ignore
const actorEntries: Field.IFieldActorEntry[] = [
  {
    id: 0,
    name: 'doorL',
    statusPages: [
      {
        eventId: 0,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('door'),
        initFrame: 0,
      },
    ],
  },

  {
    id: 1,
    name: 'doorR',
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
    name: 'shelfA',
    statusPages: [
      {
        eventId: 2,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 3,
    name: 'shelfB',
    statusPages: [
      {
        eventId: 2,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 4,
    name: 'shelfC',
    statusPages: [
      {
        eventId: 2,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 5,
    name: 'bookShelfL',
    statusPages: [
      {
        eventId: 3,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 44, height: 8 },
        },
      },
    ],
  },

  {
    id: 6,
    name: 'displayShelfR',
    statusPages: [
      {
        eventId: 3,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 44, height: 8 },
        },
      },
    ],
  },

  {
    id: 7,
    name: 'displayShelfL',
    statusPages: [
      {
        eventId: 4,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 8,
    name: 'displayShelfR',
    statusPages: [
      {
        eventId: 4,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 9,
    name: 'flashlight',
    statusPages: [
      {
        eventId: 5,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        overlapOnly: true,
        bodyConfig: {
          size: { width: 16, height: 16 },
        },
        criteria: () => (!GameGlobal.ownItems.has(GameItemIds.FlashLight)),
      },
    ],
  },
];

export default actorEntries;
