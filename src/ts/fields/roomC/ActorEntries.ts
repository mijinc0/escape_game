import * as Actor from '../../core/actors';
import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';
import { GameFlagKeys } from '../../GameFlagKeys';
import { GameGlobal } from '../../GameGlobal';
import { GameItemIds } from '../../items/GameItemIds';

// prettier-ignore
const actorEntries: Field.IFieldActorEntry[] = [
  {
    id: 0,
    name: 'shelfL',
    statusPages: [
      {
        eventId: 1,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 1,
    name: 'shelfR',
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
    id: 2,
    name: 'bookShelf0',
    statusPages: [
      {
        eventId: 5,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 44, height: 8 },
        },
      },
    ],
  },

  {
    id: 3,
    name: 'bookShelf1',
    statusPages: [
      {
        eventId: 6,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 44, height: 8 },
        },
      },
    ],
  },

  {
    id: 4,
    name: 'bookShelf2',
    statusPages: [
      {
        eventId: 7,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 44, height: 8 },
        },
      },
    ],
  },

  {
    id: 5,
    name: 'bookShelf3',
    statusPages: [
      {
        eventId: 8,
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
    name: 'bookShelf4',
    statusPages: [
      {
        eventId: 9,
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
    name: 'bookShelf5',
    statusPages: [
      {
        eventId: 10,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 44, height: 8 },
        },
      },
    ],
  },

  {
    id: 8,
    name: 'bookShelf6',
    statusPages: [
      {
        eventId: 11,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 44, height: 8 },
        },
      },
    ],
  },

  {
    id: 9,
    name: 'bookShelf7',
    statusPages: [
      {
        eventId: 12,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 44, height: 8 },
        },
      },
    ],
  },

  {
    id: 10,
    name: 'bookShelf8',
    statusPages: [
      {
        eventId: 13,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 44, height: 8 },
        },
      },
    ],
  },

  {
    id: 11,
    name: 'bookShelf9',
    statusPages: [
      {
        eventId: 14,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 44, height: 8 },
        },
      },
    ],
  },

  {
    id: 12,
    name: 'transferHollway1FA',
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
    id: 13,
    name: 'memo',
    statusPages: [
      {
        eventId: 4,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('memo'),
        initFrame: 0,
      },
    ],
  },

  {
    id: 14,
    name: 'safetyboxKey',
    statusPages: [
      {
        eventId: 15,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('someitem'),
        playAnim: true,
        initFrame: 0,
        criteria: () => (!GameGlobal.ownItems.has(GameItemIds.RoomGSafetyboxKey)),
      },
    ],
  },
];

export default actorEntries; 
