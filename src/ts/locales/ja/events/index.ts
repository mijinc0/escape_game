import * as Locales from '../../../core/locales';
import * as bathroom from './bathroom';
import * as hallway1FA from './hallway1FA';
import * as hallway1FB from './hallway1FB';
import * as hallway2FA from './hallway2FA';
import * as hallway2FB from './hallway2FB';
import * as roomA from './roomA';
import * as roomB from './roomB';
import * as roomC from './roomC';
import * as roomD from './roomD';
import * as roomE from './roomE';
import * as roomF from './roomF';
import * as roomG from './roomG';
import * as storeroom from './storeroom';
import * as toilet from './toilet';
import * as undergroundPathway from './undergroundPathway';

// prettier-ignore
const events = Locales.EventTextFactory.createFromMultipileConfigsChunks(
  bathroom.default,
  hallway1FA.default,
  hallway1FB.default,
  hallway2FA.default,
  hallway2FB.default,
  roomA.default,
  roomB.default,
  roomC.default,
  roomD.default,
  roomE.default,
  roomF.default,
  roomG.default,
  storeroom.default,
  toilet.default,
  undergroundPathway.default,
);

export default events;