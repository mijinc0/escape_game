import { SceneCommandsFactory as cmd } from '../../../events/SceneCommandsFactory';
import { EventEntryFactory } from '../../../core/areas/EventEntryFactory';
import { Direction } from '../../../core/models/Direction';

export default EventEntryFactory.create(1,
  cmd.cameraFadeOut(300),
  cmd.moveArea(-2, 50, 100, Direction.Left),
);