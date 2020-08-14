import * as Field from '../../../core/fields';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore

/**
 * memo
 */
export default Field.EventEntryFactory.create(
  2,
  [
    cmd.message('TestEvent'),
    cmd.actorSpriteTint(-1, 0x000000, 1000),
    cmd.actorSpriteTint(-1, 0xffffff, 1000),
    cmd.message('end'),
  ],
);
