import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore

/**
 * transferHalway2FB
 */
export default Field.EventEntryFactory.create(
  1,
  [
    cmd.cameraFadeOutAll(500),
    cmd.moveField(FieldIds.Hallway2FB, 8, 256, Model.Direction.Right),
  ],
);
