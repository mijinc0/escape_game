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

    cmd.message('color adjustment red event start'),
    cmd.cameraColorAdjustment(1000, [1.0, 0.0, 0.0]),
    cmd.message('color adjustment red event end'),

    cmd.message('color adjustment green event start'),
    cmd.cameraColorAdjustment(1000, [0.0, 1.0, 0.0]),
    cmd.message('color adjustment green event end'),

    cmd.message('color adjustment blue event start'),
    cmd.cameraColorAdjustment(1000, [0.0, 0.0, 1.0]),
    cmd.message('color adjustment blue event end'),

    cmd.cameraRemoveColorFilter(),
  ],
);
