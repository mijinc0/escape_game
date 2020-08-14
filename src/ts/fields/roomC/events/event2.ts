import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('roomC_event2');

/**
 * shelfR
 */
export default Field.EventEntryFactory.create(2, [
  cmd.message(texts.get(0)),
  cmd.playSe(Assets.AssetCacheKey.audio('se_open_drawer'), 1, 0, 5),
  cmd.message(texts.get(1)),
]);
