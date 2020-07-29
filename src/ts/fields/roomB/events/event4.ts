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
const texts = GameGlobal.texts.event.get('roomB_event4');

/**
 * closet LR
 */
export default Field.EventEntryFactory.create(
  4,
  [
    op.if(() => (GameGlobal.flags.get(GameFlagKeys.RoomBSafetyboxOpen)))(
      cmd.message(texts.get(0)),
      cmd.message(texts.get(1)),

    ).else(
      cmd.message(texts.get(2)),
      cmd.message(texts.get(3)),
      cmd.message(texts.get(4)),
      cmd.passcode(4, GameVariableKeys.RoomBSatetyboxPasscode),
      
      cmd.sleep(6),

      // 金庫の鍵の答えは 5287
      op.if(() => (GameGlobal.variables.get(GameVariableKeys.RoomBSatetyboxPasscode) === 5287))(
        cmd.playSe(Assets.AssetCacheKey.audio('se_find_item'), 1, 0, 1, true),
        cmd.playActorAnim(5, 'default', 0),
        cmd.message(texts.get(5)),
        cmd.message(texts.get(6)),
        cmd.message(texts.get(7)),
        cmd.playSe(Assets.AssetCacheKey.audio('se_find_item'), 1, 0, 1, true),
        cmd.popGettingItemModal(GameItemIds.KeyRoomFG),
        cmd.item(GameItemIds.KeyRoomFG, +1),
        cmd.flag(GameFlagKeys.RoomBSafetyboxOpen, true),

      ).else(
        cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 7),
        cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 7),
        cmd.message(texts.get(8)),

      ),
    ),
  ],
);
