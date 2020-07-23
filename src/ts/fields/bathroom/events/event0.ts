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
 * door (hallway1FA)
 */
export default Field.EventEntryFactory.create(
  0,
  [
    cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 1, true),
    cmd.playActorAnim(0, 'default'),
    cmd.cameraFadeOut(500),
    cmd.moveField(FieldIds.Hallway1FA, 112, 312, Model.Direction.Up),
  ],
);
