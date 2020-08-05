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
const texts = GameGlobal.texts.event.get('hallway2FA_event0');

/**
 * door (roomF)
 */
export default Field.EventEntryFactory.create(
  0,
  [
    op.if(() => ( GameGlobal.flags.get(GameFlagKeys.RoomFDoorOpen) ))(
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 1, true),
      cmd.playActorAnim(0, 'default'),
      cmd.cameraFadeOutAll(500),
      cmd.moveField(FieldIds.RoomF, 370, 344, Model.Direction.Up),

    ).elseIf(() => ( GameGlobal.ownItems.has(GameItemIds.KeyRoomFG) )) (   
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 5),
      cmd.message(texts.get(0)),
      cmd.flag(GameFlagKeys.RoomFDoorOpen, true),
      cmd.playActorAnim(0, 'default'),
      cmd.cameraFadeOutAll(500),
      cmd.moveField(FieldIds.RoomF, 370, 344, Model.Direction.Up),
    
    ).else (
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 5),
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 5),
      cmd.message(texts.get(1)),
    ),
  ],
);
