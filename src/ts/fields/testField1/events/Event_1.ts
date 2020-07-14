import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';
import { EventEntryFactory } from '../../../core/fields/EventEntryFactory';
import { Direction } from '../../../core/models/Direction';

export default EventEntryFactory.create(1,
  cmd.cameraFadeOut(300),
  cmd.moveField(-2, 50, 100, Direction.Left),
);