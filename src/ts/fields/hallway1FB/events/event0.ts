import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore

/**
 * transferHallway2FB
 */
export default Field.EventEntryFactory.create(
  0,
  [
    cmd.cameraFadeOutAll(500),
    cmd.moveField(FieldIds.Hallway2FB, 528, 310, Model.Direction.Up),
  ],
);
