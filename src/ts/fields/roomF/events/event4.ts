import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore

/**
 * transferHollway2FA
 */
export default Field.EventEntryFactory.create(
  4,
  [
    cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 1, true),
    cmd.cameraFadeOutAll(500),
    cmd.moveField(FieldIds.Hallway2FA, 320, 224, Model.Direction.Down),
  ],
);
