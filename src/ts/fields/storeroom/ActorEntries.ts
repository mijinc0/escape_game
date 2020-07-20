import * as Actor from '../../core/actors';
import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';

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
    name: 'bookShelf',
    statusPages: [
      {
        eventId: 1,
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
    name: 'displayShelfL',
    statusPages: [
      {
        eventId: 2,
        eventEmitType: Field.EventEmitType.Search,
        overlapOnly: true,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 3,
    name: 'displayShelfR',
    statusPages: [
      {
        eventId: 3,
        eventEmitType: Field.EventEmitType.Search,
        overlapOnly: true,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 4,
    name: 'closetA',
    statusPages: [
      {
        eventId: 4,
        eventEmitType: Field.EventEmitType.Search,
        overlapOnly: true,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 5,
    name: 'closetB',
    statusPages: [
      {
        eventId: 4,
        eventEmitType: Field.EventEmitType.Search,
        overlapOnly: true,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 6,
    name: 'shelfA',
    statusPages: [
      {
        eventId: 4,
        eventEmitType: Field.EventEmitType.Search,
        overlapOnly: true,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 7,
    name: 'shelfB',
    statusPages: [
      {
        eventId: 4,
        eventEmitType: Field.EventEmitType.Search,
        overlapOnly: true,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 8,
    name: 'closetC',
    statusPages: [
      {
        eventId: 4,
        eventEmitType: Field.EventEmitType.Search,
        overlapOnly: true,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 9,
    name: 'closetD',
    statusPages: [
      {
        eventId: 4,
        eventEmitType: Field.EventEmitType.Search,
        overlapOnly: true,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 10,
    name: 'shelfC',
    statusPages: [
      {
        eventId: 4,
        eventEmitType: Field.EventEmitType.Search,
        overlapOnly: true,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },

  {
    id: 11,
    name: 'shelfD',
    statusPages: [
      {
        eventId: 4,
        eventEmitType: Field.EventEmitType.Search,
        overlapOnly: true,
        spriteType: Actor.ActorSpriteTypes.Invisible,
        bodyConfig: {
          size: { width: 8, height: 8 },
        },
      },
    ],
  },
];

export default actorEntries; 
