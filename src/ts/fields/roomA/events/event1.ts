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
const texts = GameGlobal.texts.event.get('roomA_event1');

/**
 * door
 */
export default Field.EventEntryFactory.create(
  1,
  [
    op.if(() => ( GameGlobal.flags.get(GameFlagKeys.RoomADoorOpen) ))(
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 1, true),
      cmd.playActorAnim(0, 'default'),
      cmd.cameraFadeOutAll(500),
      cmd.moveField(FieldIds.Hallway1FB, 336, 300, Model.Direction.Up),

    ).elseIf(() => ( GameGlobal.ownItems.has(GameItemIds.KeyRoomA) )) (   
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 1),
      cmd.message(texts.get(0)),
      cmd.flag(GameFlagKeys.RoomADoorOpen, true),
      cmd.playActorAnim(0, 'default'),
      cmd.cameraFadeOutAll(500),
      cmd.moveField(FieldIds.Hallway1FB, 336, 300, Model.Direction.Up),
    
    ).else (
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 5),
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 5),
      cmd.message(texts.get(1)),
    ),
  ],
);
