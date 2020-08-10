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
const texts = GameGlobal.texts.event.get('roomD_event4');

/**
 * hidden ladder (opened)
 */
export default Field.EventEntryFactory.create(
  4,
  [
    // 特定のアイテムがあれば先に進める。
    // 何も持っていない、ライターのみ、だと会話イベントのみで先に進めない。
    op.if(() => (GameGlobal.ownItems.has(GameItemIds.FlashLight)))(
      cmd.message(texts.get(0)),
      cmd.cameraFadeOutAll(),
      cmd.flag(GameFlagKeys.EndingB, true),
      cmd.moveField(FieldIds.UndergroundPathway, 64, 352, Model.Direction.Down),
    
    ).elseIf(() => (
      GameGlobal.ownItems.has(GameItemIds.Lighter) &&
      GameGlobal.ownItems.has(GameItemIds.LighterOil) 
    ))(
      cmd.message(texts.get(1)),
      cmd.choices(texts.get(2), [texts.get(3), texts.get(4)], GameVariableKeys.Choices, 1),
      
      op.if(() => (GameGlobal.variables.get(GameVariableKeys.Choices) === 0))(
        cmd.message(texts.get(5)),
        cmd.cameraFadeOutAll(),
        cmd.flag(GameFlagKeys.EndingA, true),
        cmd.moveField(FieldIds.UndergroundPathway, 64, 352, Model.Direction.Down),

      ).else(
        cmd.message(texts.get(6)),

      ),

    ).elseIf(() => (GameGlobal.ownItems.has(GameItemIds.Lighter)))(
      cmd.message(texts.get(7)),
      cmd.message(texts.get(8)),

    ).else(
      cmd.message(texts.get(9)),
    ),
  ],
);
