import * as Field from '../../../core/fields';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore

/**
 * showerhead
 */
export default Field.EventEntryFactory.create(
  1,
  [
    cmd.message('fadeOut event start'),
    cmd.cameraFadeOut(1000),
    cmd.message('fadeOut event end'),

    cmd.message('fadeIn event start'),
    cmd.cameraFadeIn(1000),
    cmd.message('fadeIn event end'),

    cmd.message('fadeOutAll event start'),
    cmd.cameraFadeOutAll(1000),
    cmd.message('fadeOut event end'),

    cmd.message('fadeInAll event start'),
    cmd.cameraFadeInAll(1000),
    cmd.message('fadeIn event end'),

  ],
);
