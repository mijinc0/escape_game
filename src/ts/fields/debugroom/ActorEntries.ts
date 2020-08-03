import * as Actor from '../../core/actors';
import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';
import { GameGlobal } from '../../GameGlobal';
import { GameFlagKeys } from '../../GameFlagKeys';

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
    name: 'event',
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
];

export default actorEntries;