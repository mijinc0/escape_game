import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore

/**
 * transferBathroom
 */
export default Field.EventEntryFactory.create(
  3,
  [
    cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 1, true), 
    cmd.cameraFadeOutAll(500),
    cmd.moveField(FieldIds.Bathroom, 400, 162, Model.Direction.Down),
  ],
);
