import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore

/**
 * transferHollway2FB
 */
export default Field.EventEntryFactory.create(
  6,
  [
    cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 1, true),
    cmd.cameraFadeOutAll(500),
    cmd.moveField(FieldIds.Hallway2FB, 256, 224, Model.Direction.Down),
  ],
);
