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
const texts = GameGlobal.texts.event.get('undergroundPathway_event0');

/**
 * endingEvent A
 */
export default Field.EventEntryFactory.create(
  0,
  [
    cmd.cameraEffectNight(),
    cmd.actorSpriteTint(3, 0x000000, 0, false),
    cmd.cameraFadeInAll(2000),
    cmd.changeActorDirection(-1, Model.Direction.Right),
    cmd.message(texts.get(0)),
    cmd.message(texts.get(1)),
    cmd.moveActor(-1, 512, 352),
    cmd.changeActorDirection(-1, Model.Direction.Up),
    cmd.sleep(800),
    cmd.message(texts.get(2)),
    cmd.moveActor(-1, 512, 224),
    cmd.message(texts.get(3)),
    cmd.actorSpriteTint(3, 0xffffff, 1000, false), 
    cmd.message(texts.get(4)),
    cmd.message(texts.get(5)),
    cmd.message(texts.get(6)),
    cmd.moveActor(3, 512, 300, 260, true, true, false, true),
    cmd.moveActor(-1, 512, 320),
    cmd.message(texts.get(7)),
    cmd.playSe(Assets.AssetCacheKey.audio('se_knife_stab'), null, null, null, true),
    cmd.cameraFadeOut(10, false),
    cmd.message(texts.get(8)),
    cmd.message(texts.get(9)),
    cmd.sleep(800),
    
  ],
);
