import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore

/**
 * transferHalway2FA
 */
export default Field.EventEntryFactory.create(
  1,
  [
    cmd.cameraFadeOutAll(500),
    cmd.moveField(FieldIds.Hallway2FA, 600, 256, Model.Direction.Left),
  ],
);
