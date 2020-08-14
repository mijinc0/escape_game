import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { GameItemIds } from '../../../items/GameItemIds';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('roomA_event7');

/**
 * key roomA
 */
export default Field.EventEntryFactory.create(7, [
  cmd.message(texts.get(0)),
  cmd.message(texts.get(1)),
  cmd.playSe(Assets.AssetCacheKey.audio('se_find_item'), 1, 0, 1, true),
  cmd.popGettingItemModal(GameItemIds.KeyRoomA),
  cmd.item(GameItemIds.KeyRoomA, +1),
]);
