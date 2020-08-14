import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore

/**
 * transferHallway1FB
 */
export default Field.EventEntryFactory.create(
  3,
  [
    cmd.cameraFadeOutAll(500),
    cmd.moveField(FieldIds.Hallway1FB, 528, 168, Model.Direction.Down),
  ],
);
