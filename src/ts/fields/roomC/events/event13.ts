import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { GameFlagKeys } from '../../../GameFlagKeys';
import { SceneEventOprationsFactory as op } from '../../../core/events/operations/SceneEventOprationsFactory';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('roomC_event13');

/**
 * bookShelfs 8
 *
 */
export default Field.EventEntryFactory.create(13, [
  op
    .if(() => GameGlobal.flags.get(GameFlagKeys.ReadRoomCMemo))(cmd.message(texts.get(0)))
    .else(cmd.message(texts.get(1))),

  cmd.message(texts.get(2)),
]);
