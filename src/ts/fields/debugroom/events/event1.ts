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

    cmd.message('color adjustment red event start'),
    cmd.cameraColorAdjustment(2000, [1.0, 0.0, 0.0]),
    cmd.message('color adjustment red event end'),

    cmd.cameraRemoveColorFilter(),
  ],
);
