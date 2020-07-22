import * as Field from '../../../core/fields';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';
import { Direction } from '../../../core/models/Direction';

// prettier-ignore

/**
 * bookshelf
 */
export default Field.EventEntryFactory.create(
  2,
  [
    cmd.message(''),
  ]
);
