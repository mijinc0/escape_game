import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';
import { EventEntryFactory } from '../../../core/areas/EventEntryFactory';
import { Direction } from '../../../core/models/Direction';

export default EventEntryFactory.create(0,
  cmd.playActorAnim(0, 'default', false),
  cmd.cameraFadeOut(300),
  cmd.moveArea(-1, 50, 100, Direction.Left),
);