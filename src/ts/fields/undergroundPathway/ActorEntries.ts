import * as Actor from '../../core/actors';
import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';
import { GameGlobal } from '../../GameGlobal';
import { GameFlagKeys } from '../../GameFlagKeys';

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
        criteria: () => (GameGlobal.flags.get(GameFlagKeys.EndingA)),
      },

      {
        eventId: 1,
        eventEmitType: Field.EventEmitType.Immediately,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        criteria: () => (GameGlobal.flags.get(GameFlagKeys.EndingB)),
      },
    ],
  },

  {
    id: 1,
    name: 'ladderL',
    statusPages: [
      {
        eventId: -1,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('ladder'),
        initFrame: 0,
      },
    ],
  },

  {
    id: 2,
    name: 'ladderR',
    statusPages: [
      {
        eventId: -1,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('ladder'),
        initFrame: 0,
      },
    ],
  },

  {
    id: 3,
    name: 'enemy',
    statusPages: [
      {
        eventId: -1,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.OneWayAnim,
        spriteKey: Asset.AssetCacheKey.spritesheet('enemy'),
        initFrame: 0,
        criteria: () => (GameGlobal.flags.get(GameFlagKeys.EndingA)),
      },
    ],
  },
];

export default actorEntries;