import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { GameGlobal } from '../../../GameGlobal';
import { GameFlagKeys } from '../../../GameFlagKeys';
import { GameItemIds } from '../../../items/GameItemIds';
import { SceneEventOprationsFactory as op } from '../../../core/events/operations/SceneEventOprationsFactory';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignor
const texts = GameGlobal.texts.event.get('undergroundPathway_event0');

/**
 * endingEvent A
 */
export default Field.EventEntryFactory.create(
  0,
  [
    cmd.cameraColorAdjustment(0, [0.1, 0.1, 0.3], null, 0.5),
    cmd.cameraFadeInAll(2000),
    cmd.changeActorDirection(-1, Model.Direction.Right),
    cmd.message(texts.get(0)),
    cmd.message(texts.get(1)),
  ],
);
