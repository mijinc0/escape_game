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
 * transferRoomA
 */
export default Field.EventEntryFactory.create(
  3,
  [
    cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 5, true),
    cmd.cameraFadeOut(500),
    cmd.moveField(FieldIds.RoomA, 320, 160, Model.Direction.Down),
  ],
);
