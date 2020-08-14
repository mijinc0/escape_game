import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore

/**
 * transferHalway1FB
 */
export default Field.EventEntryFactory.create(
  2,
  [
    cmd.cameraFadeOutAll(500),
    cmd.moveField(FieldIds.Hallway1FB, 10, 256, Model.Direction.Right),
  ],
);
