import * as Actor from '../../core/actors';
import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';
import * as Render from '../../core/renders';
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
        eventId: 0,
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
    name: 'transferHollway1FB',
    statusPages: [
      {
        eventId: 2,
        eventEmitType: Field.EventEmitType.Collide,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 64, height: 8 },
        },
      },
    ],
  },

  {
    id: 3,
    name: 'hiddenladder',
    statusPages: [
      // 床を外してハシゴを出現させた後
      {
        eventId: 4,
        eventEmitType: Field.EventEmitType.Collide,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('hiddenladder'),
        initFrame: 1,
        renderType: Render.ActorRenderType.UnderActor,
        criteria: () => (GameGlobal.flags.get(GameFlagKeys.FindHiddenLadder)),
      },

      // 床を外す前
      {
        eventId: 3,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('hiddenladder'),
        initFrame: 0,
        renderType: Render.ActorRenderType.UnderActor,
        overlapOnly: true,
      },
    ],
  },
];

export default actorEntries; 
