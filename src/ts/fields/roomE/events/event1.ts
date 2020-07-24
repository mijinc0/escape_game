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
const texts = GameGlobal.texts.event.get('roomE_event1');

/**
 * doorR (hallway2FB)
 */
export default Field.EventEntryFactory.create(
  1,
  [
    op.if(() => ( GameGlobal.flags.get(GameFlagKeys.RoomErDoorOpen) ))(
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 1, true),
      cmd.playActorAnim(1, 'default'),
      cmd.cameraFadeOut(500),
      cmd.moveField(FieldIds.Hallway2FB, 336, 312, Model.Direction.Up),

    ).else (   
      cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 5),
      cmd.message(texts.get(0)),
      cmd.flag(GameFlagKeys.RoomErDoorOpen, true),
      cmd.playActorAnim(1, 'default'),
      cmd.cameraFadeOut(500),
      cmd.moveField(FieldIds.Hallway2FB, 336, 312, Model.Direction.Up),
    )
  ],
);
