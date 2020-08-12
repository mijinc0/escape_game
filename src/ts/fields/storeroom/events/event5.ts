import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { GameGlobal } from '../../../GameGlobal';
import { GameFlagKeys } from '../../../GameFlagKeys';
import { GameVariableKeys } from '../../../GameVariableKeys';
import { GameItemIds } from '../../../items/GameItemIds';
import { SceneEventOprationsFactory as op } from '../../../core/events/operations/SceneEventOprationsFactory';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('storeroom_event5');

/**
 * safetybox
 */
export default Field.EventEntryFactory.create(5, [
  op
    .if(() => GameGlobal.flags.get(GameFlagKeys.StoreroomSafetyboxOpen))(
      cmd.message(texts.get(0)),
      cmd.message(texts.get(1)),
    )
    .else(
      cmd.message(texts.get(2)),
      cmd.message(texts.get(3)),

      op.if(() => GameGlobal.ownItems.has(GameItemIds.Hammer))(
        cmd.message(texts.get(4)),
        cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 7, true),
        cmd.playActorAnim(12, 'default', 0),
        cmd.message(texts.get(5)),
        cmd.message(texts.get(6)),
        cmd.playSe(Assets.AssetCacheKey.audio('se_find_item'), 1, 0, 1, true),
        cmd.popGettingItemModal(GameItemIds.KeyRoomD),
        cmd.item(GameItemIds.KeyRoomD, +1),
        cmd.flag(GameFlagKeys.StoreroomSafetyboxOpen, true),
      ),
    ),
]);
