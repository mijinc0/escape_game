import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { GameGlobal } from '../../../GameGlobal';
import { GameFlagKeys } from '../../../GameFlagKeys';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('roomA_event0');

/**
 * Opening
 */
export default Field.EventEntryFactory.create(0, [
  cmd.cameraFadeIn(3000),
  cmd.sleep(3000),
  cmd.message(texts.get(0)),
  cmd.message(texts.get(1)),
  cmd.sleep(800),
  cmd.changeActorDirection(-1, Model.Direction.Right),
  cmd.sleep(800),
  cmd.changeActorDirection(-1, Model.Direction.Up),
  cmd.sleep(800),
  cmd.changeActorDirection(-1, Model.Direction.Left),
  cmd.sleep(800),
  cmd.changeActorDirection(-1, Model.Direction.Down),
  cmd.sleep(1000),
  cmd.message(texts.get(2)),
  cmd.changeActorDirection(-1, Model.Direction.Down),
  cmd.sleep(1000),
  cmd.message(texts.get(3)),
  cmd.message(texts.get(4)),

  cmd.flag(GameFlagKeys.Opening, true),
]);
