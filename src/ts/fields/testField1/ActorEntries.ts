import * as Actor from '../../core/actors';
import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';
import * as Model from '../../core/models';

export const ActorEntries: Field.IFieldActorEntry[] = [
  {
    id: 0,
    name: 'npc1',
    statusPages: [
      {
        eventId: 0,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.FourWayAnims,
        spriteKey: Asset.AssetCacheKey.spritesheet('hero'),
        direction: Model.Direction.Left,
        initFrame: 0,
        bodyConfig: {
          size: 0.8,
        },
      },
    ],
  },

  {
    id: 1,
    name: 'npc1',
    statusPages: [
      {
        eventId: 0,
        eventEmitType: Field.EventEmitType.Collide,
        spriteType: Actor.ActorSpriteTypes.FourWayAnims,
        spriteKey: Asset.AssetCacheKey.spritesheet('hero'),
        initFrame: 0,
      },
    ],
  },

  {
    id: 2,
    name: 'invisible_npc',
    position: { x: 100, y: 200 },
    statusPages: [
      {
        eventId: 1,
        eventEmitType: Field.EventEmitType.Collide,
        overlapOnly: true,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 20, height: 30 },
        },
      },
    ],
  },
];
