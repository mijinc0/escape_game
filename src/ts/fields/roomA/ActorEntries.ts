import * as Actor from '../../core/actors';
import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';
import { GameFlagKeys } from '../../GameFlagKeys';
import { GameGlobal } from '../../GameGlobal';
import { GameItemIds } from '../../items/GameItemIds';

// prettier-ignore
const actorEntries: Field.IFieldActorEntry[] = [
  {
    id: 99,
    name: 'openingEvent',
    statusPages: [
      {
        eventId: 0,
        eventEmitType: Field.EventEmitType.Immediately,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        criteria: () => ( !GameGlobal.flags.get(GameFlagKeys.Opening) ),
      },
    ],
  },

  {
    id: 0,
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
    id: 1,
    name: 'bookShelf',
    statusPages: [
      {
        eventId: 2,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 44, height: 8 },
        },
      },
    ],
  },

  {
    id: 2,
    name: 'closetL',
    statusPages: [
      {
        eventId: 3,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 16, height: 8 },
        },
      },
    ],
  },

  {
    id: 3,
    name: 'closetR',
    statusPages: [
      {
        eventId: 3,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 16, height: 8 },
        },
      },
    ],
  },

  {
    id: 4,
    name: 'deskDrawer',
    statusPages: [
      {
        eventId: 4,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 16, height: 8 },
        },
      },
    ],
  },

  {
    id: 5,
    name: 'bed',
    statusPages: [
      {
        eventId: 5,
        eventEmitType: Field.EventEmitType.Search,
        overlapOnly: true,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 32, height: 48 },
        },
      },
    ],
  },

  {
    id: 6,
    name: 'memo',
    statusPages: [
      {
        eventId: 6,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('memo'),
        initFrame: 0,
        bodyConfig: {
          offset: { x: 0, y: 20 },
        },
      },
    ],
  },

    
  {
    id: 7,
    name: 'keyRoomA',
    statusPages: [
      {
        eventId: 7,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('someitem'),
        initFrame: 10,
        overlapOnly: true,
        criteria: () => (
          GameGlobal.flags.get(GameFlagKeys.ReadRoomAMemo) &&
          !GameGlobal.ownItems.has(GameItemIds.KeyRoomA)
        ),
      },
    ],
  },
];

export default actorEntries; 
