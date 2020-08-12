import * as Field from '../core/fields';
import { Debugroom } from './debugroom/Debugroom';
import { Bathroom } from './bathroom/Bathroom';
import { Hallway1FA } from './hallway1FA/Hallway1FA';
import { Hallway1FB } from './hallway1FB/Hallway1FB';
import { Hallway2FA } from './hallway2FA/Hallway2FA';
import { Hallway2FB } from './hallway2FB/Hallway2FB';
import { RoomA } from './roomA/RoomA';
import { RoomB } from './roomB/RoomB';
import { RoomC } from './roomC/RoomC';
import { RoomD } from './roomD/RoomD';
import { RoomE } from './roomE/RoomE';
import { RoomF } from './roomF/RoomF';
import { RoomG } from './roomG/RoomG';
import { Storeroom } from './storeroom/Storeroom';
import { Toilet } from './toilet/Toilet';
import { UndergroundPathway } from './undergroundPathway/UndergroundPathway';
import { LastRoom } from './lastRoom/LastRoom';

export const GameFields = new Map<number, Field.IField>([
  [Debugroom.id, Debugroom],
  [Bathroom.id, Bathroom],
  [Hallway1FA.id, Hallway1FA],
  [Hallway1FB.id, Hallway1FB],
  [Hallway2FA.id, Hallway2FA],
  [Hallway2FB.id, Hallway2FB],
  [RoomA.id, RoomA],
  [RoomB.id, RoomB],
  [RoomC.id, RoomC],
  [RoomD.id, RoomD],
  [RoomE.id, RoomE],
  [RoomF.id, RoomF],
  [RoomG.id, RoomG],
  [Storeroom.id, Storeroom],
  [Toilet.id, Toilet],
  [UndergroundPathway.id, UndergroundPathway],
  [LastRoom.id, LastRoom],
]);
