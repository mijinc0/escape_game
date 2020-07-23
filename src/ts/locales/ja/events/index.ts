import * as Locales from '../../../core/locales';
import * as roomA from './roomA';
import * as hallway1FA from './hallway1FA';
import * as hallway1FB from './hallway1FB';

// prettier-ignore
const events = Locales.EventTextFactory.createFromMultipileConfigsChunks(
  roomA.default,
  hallway1FA.default,
  hallway1FB.default,
);

export default events;