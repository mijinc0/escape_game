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
const texts = GameGlobal.texts.event.get('hallway1FA_event4');

/**
 * transferRoomB
 */
export default Field.EventEntryFactory.create(
  4,
  [
    op.if(() => ( GameGlobal.flags.get(GameFlagKeys.RoomBDoorOpen) ))(
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 1, true),
      cmd.cameraFadeOut(500),
      cmd.moveField(FieldIds.RoomB, 384, 160, Model.Direction.Down),

    ).elseIf(() => ( GameGlobal.ownItems.has(GameItemIds.KeyRoomBC) )) (   
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 5),
      cmd.message(texts.get(0)),
      cmd.flag(GameFlagKeys.RoomBDoorOpen, true),
      cmd.cameraFadeOut(500),
      cmd.moveField(FieldIds.RoomB, 384, 160, Model.Direction.Down),
    
    ).else (
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 5),
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 5),
      cmd.message(texts.get(1)),
    ),
  ],
);
