import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { GameGlobal } from '../../../GameGlobal';
import { GameFlagKeys } from '../../../GameFlagKeys';
import { GameItemIds } from '../../../items/GameItemIds';
import { SceneEventOprationsFactory as op } from '../../../core/events/operations/SceneEventOprationsFactory';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('roomD_event3');

/**
 * hidden ladder (closed)
 */
export default Field.EventEntryFactory.create(3, [
  op
    .if(() => GameGlobal.ownItems.has(GameItemIds.Barl))(
      cmd.message(texts.get(0)),
      cmd.message(texts.get(1)),
      cmd.message(texts.get(2)),
      cmd.moveActor(-1, 192, 128),
      cmd.changeActorDirection(-1, Model.Direction.Left),
      cmd.sleep(20),
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 3, true),
      cmd.playActorAnim(3, 'default'),
      cmd.sleep(20),
      cmd.message(texts.get(3)),
      cmd.message(texts.get(4)),
      cmd.message(texts.get(5)),
      cmd.flag(GameFlagKeys.FindHiddenLadder, true),
    )
    .else(
      cmd.message(texts.get(6)),
      cmd.message(texts.get(7)),
      cmd.message(texts.get(8)),
      cmd.flag(GameFlagKeys.SearchHiddenLadder, true),
    ),
]);
