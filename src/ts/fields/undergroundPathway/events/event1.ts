import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { GameGlobal } from '../../../GameGlobal';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignor
const texts = GameGlobal.texts.event.get('undergroundPathway_event1');

/**
 * endingEvent B
 */
export default Field.EventEntryFactory.create(1, [
  cmd.cameraEffectNight(),
  cmd.cameraFadeInAll(2000),
  cmd.changeActorDirection(-1, Model.Direction.Right),
  cmd.message(texts.get(0)),
  cmd.message(texts.get(1)),
  cmd.moveActor(-1, 512, 352),
  cmd.moveActor(-1, 512, 128),
  cmd.sleep(500),
  cmd.message(texts.get(2)),
  cmd.message(texts.get(3)),
  cmd.cameraFadeOut(10, false),
  cmd.message(texts.get(4)),
  cmd.message(texts.get(5)),
  cmd.sleep(800),
  cmd.moveField(FieldIds.LastRoom, 224, 276, Model.Direction.Down),
]);
