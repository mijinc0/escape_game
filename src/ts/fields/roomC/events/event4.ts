import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { GameFlagKeys } from '../../../GameFlagKeys';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('roomC_event4');

/**
 * memo
 */
export default Field.EventEntryFactory.create(4, [
  cmd.message(texts.get(0)),
  cmd.message(texts.get(1)),
  cmd.message(texts.get(2)),
  cmd.message(texts.get(3)),
  cmd.message(texts.get(4)),
  cmd.message(texts.get(5)),
  cmd.message(texts.get(6)),
  cmd.flag(GameFlagKeys.ReadRoomCMemo, true),
]);
