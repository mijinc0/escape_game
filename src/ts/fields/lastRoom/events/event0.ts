import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { GameGlobal } from '../../../GameGlobal';
import { GameFlagKeys } from '../../../GameFlagKeys';
import { GameItemIds } from '../../../items/GameItemIds';
import { SceneEventOprationsFactory as op } from '../../../core/events/operations/SceneEventOprationsFactory';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignor
const texts = GameGlobal.texts.event.get('lastRoom_event0');

/**
 * endingEvent
 */
export default Field.EventEntryFactory.create(
  0,
  [
    cmd.cameraFadeInAll(2000),
    cmd.message(texts.get(0)),
    cmd.message(texts.get(1)),
    
    op.if(() => (GameGlobal.flags.get(GameFlagKeys.EndingA)))(
      cmd.message(texts.get(2)),

    ).else(
      cmd.message(texts.get(3)),
    ),
    
    cmd.message(texts.get(4)),
    cmd.message(texts.get(5)),
    cmd.message(texts.get(6)),

    cmd.moveActor(-1, 288, 280, 100),
    cmd.message(texts.get(7)),
    cmd.moveActor(-1, 288, 208, 100),
    cmd.moveActor(-1, 224, 208, 100),
    cmd.changeActorDirection(-1, Model.Direction.Up),
    cmd.sleep(1000),
    cmd.moveActor(-1, 288, 224, 100),
    cmd.moveActor(-1, 288, 176, 100),
    
    cmd.playSe(Assets.AssetCacheKey.audio('se_door'), 1, 0, 1, true),
    cmd.playActorAnim(1, 'default'),
    cmd.sleep(800),
    cmd.actorSpriteTint(-1, 0x000000, 1000),
    cmd.actorSpriteAlpha(-1, 0, 2000),

    // go ending scene
    cmd.cameraFadeOut(3000),
    cmd.ending(),
  ],
);
