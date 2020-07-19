import * as Field from '../../../core/fields';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';
import { Direction } from '../../../core/models/Direction';

export default Field.EventEntryFactory.create(1, cmd.cameraFadeOut(300), cmd.moveField(-2, 50, 100, Direction.Left));
