import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { GameItemIds } from '../../../items/GameItemIds';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('roomE_event5');

/**
 * flashlight
 */
export default Field.EventEntryFactory.create(5, [
  cmd.message(texts.get(0)),
  cmd.message(texts.get(1)),
  cmd.message(texts.get(2)),
  cmd.playSe(Assets.AssetCacheKey.audio('se_find_item'), 1, 0, 1, true),
  cmd.popGettingItemModal(GameItemIds.FlashLight),
  cmd.item(GameItemIds.FlashLight, +1),
]);
