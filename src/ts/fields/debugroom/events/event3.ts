import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore

/**
 * door (RoomA)
 */
export default Field.EventEntryFactory.create(
  3,
  [
    cmd.moveField(FieldIds.RoomA, 288, 256, Model.Direction.Down),
  ],
);
