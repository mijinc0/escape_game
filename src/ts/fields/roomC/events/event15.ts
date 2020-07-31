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
const texts = GameGlobal.texts.event.get('roomC_event15');

/**
 * safetybox key
 */
export default Field.EventEntryFactory.create(
  15,
  [
    cmd.message(texts.get(0)),
    cmd.message(texts.get(1)),

    op.if(() => (GameGlobal.ownItems.has(GameItemIds.BlokenDish)))(
      cmd.message(texts.get(2)),
      cmd.message(texts.get(3)),
      cmd.message(texts.get(4)),
      cmd.playSe(Assets.AssetCacheKey.audio('se_find_item'), 1, 0, 1, true),
      cmd.popGettingItemModal(GameItemIds.RoomGSafetyboxKey),
      cmd.item(GameItemIds.RoomGSafetyboxKey, +1),
      cmd.message(texts.get(5)),

    ).else(
      cmd.message(texts.get(6)),
      cmd.flag(GameFlagKeys.SearchRoomGSofa, true),
    ),
  ],
);
