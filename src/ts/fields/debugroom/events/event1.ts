import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { GameGlobal } from '../../../GameGlobal';
import { GameFlagKeys } from '../../../GameFlagKeys';
import { GameItemIds } from '../../../items/GameItemIds';
import { SceneEventOprationsFactory as op } from '../../../core/events/operations/SceneEventOprationsFactory';
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

    cmd.message('color filter red event start'),
    cmd.cameraAddColorFilter(0xff0000, 0.5, 1000, false),
    cmd.message('color filter red event start'),

    cmd.message('color filter green event start'),
    cmd.cameraAddColorFilter(0x00ff00, 0.5, 1000, false),
    cmd.message('color filter green event start'),

    cmd.message('color filter blue event start'),
    cmd.cameraAddColorFilter(0x0000ff, 0.5, 1000, false),
    cmd.message('color filter blue event start'),

    cmd.cameraRemoveColorFilter(),
  ],
);
