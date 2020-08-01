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
const texts = GameGlobal.texts.event.get('roomD_event3');

/**
 * hidden ladder
 */
export default Field.EventEntryFactory.create(
  3,
  [
    cmd.message(texts.get(0)),
    cmd.message(texts.get(1)),

    op.if(() => (GameGlobal.flags.get(GameFlagKeys.FindHiddenLadder)))(
      // 移動するイベントがここに来る

    ).elseIf(() => (GameGlobal.ownItems.has(GameItemIds.Barl)))(
      cmd.message(texts.get(2)),
      // TODO: 主人公を定位置に移動させるイベントを作らないといけない。

    ).else(
      cmd.message(texts.get(3)),
      cmd.flag(GameFlagKeys.SearchHiddenLadder, true),
    ),
  ],
);
