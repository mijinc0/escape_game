import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore

/**
 * transferHallway1FA
 */
export default Field.EventEntryFactory.create(
  2,
  [
    cmd.cameraFadeOutAll(500),
    cmd.moveField(FieldIds.Hallway1FA, 598, 256, Model.Direction.Left),
  ],
);
