import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { GameItemIds } from '../../../items/GameItemIds';
import { SceneEventOprationsFactory as op } from '../../../core/events/operations/SceneEventOprationsFactory';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('roomG_event2');

/**
 * shelf
 */
export default Field.EventEntryFactory.create(2, [
  op
    .if(() => GameGlobal.ownItems.has(GameItemIds.Hammer))(cmd.message(texts.get(0)), cmd.message(texts.get(1)))
    .else(
      cmd.message(texts.get(2)),
      cmd.message(texts.get(3)),
      cmd.message(texts.get(4)),
      cmd.playSe(Assets.AssetCacheKey.audio('se_find_item'), 1, 0, 1, true),
      cmd.popGettingItemModal(GameItemIds.Hammer),
      cmd.item(GameItemIds.Hammer, +1),
    ),
]);
