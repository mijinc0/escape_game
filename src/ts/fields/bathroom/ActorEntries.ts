import * as Actor from '../../core/actors';
import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';
import * as Render from '../../core/renders';
import { GameGlobal } from '../../GameGlobal';
import { GameFlagKeys } from '../../GameFlagKeys';
import { GameItemIds } from '../../items/GameItemIds';

// prettier-ignore
const actorEntries: Field.IFieldActorEntry[] = [
  {
    id: 0,
    name: 'door',
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
    name: 'showerhead',
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
    id: 2,
    name: 'bath',
    statusPages: [
      {
        eventId: 2,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 64, height: 64 },
        },
        criteria: () => (GameGlobal.flags.get(GameFlagKeys.DrainBathWater)),
      },

      {
        eventId: 2,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        renderType: Render.ActorRenderType.UnderActor,
        spriteKey: Asset.AssetCacheKey.spritesheet('bath'),
        initFrame: 0,
        bodyConfig: {
          size: { width: 64, height: 64 },
        },
      },
    ],
  },

  {
    id: 3,
    name: 'keyRoomE',
    statusPages: [
      {
        eventId: 3,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('someitem'),
        initFrame: 10,
        playAnim: true,
        renderType: Render.ActorRenderType.UnderActor,
        overlapOnly: true,
        criteria: () => (
          GameGlobal.flags.get(GameFlagKeys.RoomDDoorOpen) &&
          !GameGlobal.ownItems.has(GameItemIds.KeyRoomE)
        ),
      },
    ],
  },
];

export default actorEntries;