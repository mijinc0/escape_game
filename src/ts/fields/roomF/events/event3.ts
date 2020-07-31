import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { GameGlobal } from '../../../GameGlobal';
import { GameFlagKeys } from '../../../GameFlagKeys';
import { GameItemIds } from '../../../items/GameItemIds';
import { SceneEventOprationsFactory as op } from '../../../core/events/operations/SceneEventOprationsFactory';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('roomF_event3');

/**
 * displayShelf
 */
export default Field.EventEntryFactory.create(
  3,
  [
    cmd.message(texts.get(0)),

    op.if(() => (!GameGlobal.ownItems.has(GameItemIds.BlokenDish)))(
      cmd.playSe(Assets.AssetCacheKey.audio('se_glass_break'), 1, 0, 1, false),
      cmd.message(texts.get(1)),
      
      op.if(() => (GameGlobal.flags.get(GameFlagKeys.SearchRoomGSofa)))(
        cmd.message(texts.get(2)),
      ).else(
        cmd.message(texts.get(3)),
      ),

      cmd.playSe(Assets.AssetCacheKey.audio('se_find_item'), 1, 0, 1, true),
      cmd.popGettingItemModal(GameItemIds.BlokenDish),
      cmd.item(GameItemIds.BlokenDish, +1),

    ).else(
      cmd.message(texts.get(4)),
    ),
  ],
);
