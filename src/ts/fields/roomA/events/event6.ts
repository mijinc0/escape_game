import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { GameFlagKeys } from '../../../GameFlagKeys';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('roomA_event6');

/**
 * deskDrawer
 */
export default Field.EventEntryFactory.create(6, [
  cmd.message(texts.get(0)),
  cmd.message(texts.get(1)),
  cmd.message(texts.get(2)),
  cmd.flag(GameFlagKeys.ReadRoomAMemo, true),
]);
