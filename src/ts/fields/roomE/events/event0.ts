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
const texts = GameGlobal.texts.event.get('roomE_event0');

/**
 * doorL (hallway2FA)
 */
export default Field.EventEntryFactory.create(0, [
  op
    .if(() => GameGlobal.flags.get(GameFlagKeys.RoomElDoorOpen))(
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 1, true),
      cmd.playActorAnim(0, 'default'),
      cmd.cameraFadeOutAll(500),
      cmd.moveField(FieldIds.Hallway2FA, 334, 312, Model.Direction.Up),
    )
    .else(
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 5),
      cmd.message(texts.get(0)),
      cmd.flag(GameFlagKeys.RoomElDoorOpen, true),
      cmd.playActorAnim(0, 'default'),
      cmd.cameraFadeOutAll(500),
      cmd.moveField(FieldIds.Hallway2FA, 334, 312, Model.Direction.Up),
    ),
]);
