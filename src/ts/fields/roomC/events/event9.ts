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
const texts = GameGlobal.texts.event.get('roomC_event9');

/**
 * bookShelfs 4
 */
export default Field.EventEntryFactory.create(
  9,
  [
    op.if(() => (GameGlobal.flags.get(GameFlagKeys.ReadRoomCMemo)))(
      cmd.message(texts.get(0)),
    ).else(
      cmd.message(texts.get(1)),
    ),

    cmd.message(texts.get(2)),
  ],
);
