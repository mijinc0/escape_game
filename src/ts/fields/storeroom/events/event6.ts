import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { GameFlagKeys } from '../../../GameFlagKeys';
import { GameItemIds } from '../../../items/GameItemIds';
import { SceneEventOprationsFactory as op } from '../../../core/events/operations/SceneEventOprationsFactory';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('storeroom_event6');

/**
 * shelfC
 */
export default Field.EventEntryFactory.create(6, [
  cmd.message(texts.get(0)),
  cmd.message(texts.get(1)),

  op
    .if(() => GameGlobal.flags.get(GameFlagKeys.SearchHiddenLadder) && !GameGlobal.ownItems.has(GameItemIds.Barl))(
      cmd.message(texts.get(2)),
      cmd.message(texts.get(3)),
      cmd.playSe(Assets.AssetCacheKey.audio('se_find_item'), 1, 0, 1, true),
      cmd.popGettingItemModal(GameItemIds.Barl),
      cmd.item(GameItemIds.Barl, +1),
    )
    .else(cmd.message(texts.get(4))),
]);
