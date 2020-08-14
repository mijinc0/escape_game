import * as Actor from '../../core/actors';
import * as Field from '../../core/fields';

// prettier-ignore
const actorEntries: Field.IFieldActorEntry[] = [
  {
    id: 0,
    name: 'toilet',
    statusPages: [
      {
        eventId: 0,
        eventEmitType: Field.EventEmitType.Search,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 32, height: 32 },
        },
      },
    ],
  },

  {
    id: 1,
    name: 'transferHallway1FA',
    statusPages: [
      {
        eventId: 1,
        eventEmitType: Field.EventEmitType.Collide,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 32, height: 8 },
        },
      },
    ],
  },
];

export default actorEntries;
