import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import * as Asset from '../../../core/assets';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
export default Field.EventEntryFactory.create(
  0,
  [
    cmd.playSe(Asset.AssetCacheKey.audio('se_door'), 1, 0, 1.3, true),
    cmd.playActorAnim(0, 'default', false),
    cmd.cameraFadeOut(300),
    cmd.moveField(-1, 50, 100, Model.Direction.Left),
  ],
);
