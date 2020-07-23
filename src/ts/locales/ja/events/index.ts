import * as Locales from '../../../core/locales';
import * as roomA from './roomA';

// prettier-ignore
const events = Locales.EventTextFactory.createFromMultipileConfigsChunks(
  roomA.default,
);

export default events;