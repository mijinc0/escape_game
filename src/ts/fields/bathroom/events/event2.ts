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
const texts = GameGlobal.texts.event.get('bathroom_event2');

/**
 * bath
 */
export default Field.EventEntryFactory.create(
  2,
  [
    op.if(() => (GameGlobal.flags.get(GameFlagKeys.DrainBathWater))) (
      cmd.message(texts.get(0)),
      cmd.message(texts.get(1)),
    
    ).else (
      cmd.message(texts.get(2)),
      cmd.message(texts.get(3)),
      cmd.choices(texts.get(4), [texts.get(5), texts.get(6)], GameVariableKeys.ChoiceDrainBathWater),

      op.if(() => (GameGlobal.variables.get(GameVariableKeys.ChoiceDrainBathWater) === 0)) (
        cmd.message(texts.get(7)),
        cmd.playActorAnim(2, 'default', 0),
        cmd.message(texts.get(8)),
        cmd.message(texts.get(9)),
        cmd.playSe(Assets.AssetCacheKey.audio('se_find_item'), 1, 0, 1, true),
        cmd.popGettingItemModal(GameItemIds.KeyRoomBC),
        cmd.flag(GameFlagKeys.DrainBathWater, true),

      ).else(
        cmd.message(texts.get(10)),

      ),
    ),
  ],
);
