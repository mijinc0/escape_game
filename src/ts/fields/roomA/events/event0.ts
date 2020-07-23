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
const texts = GameGlobal.texts.event.get('roomA_event0');

/**
 * Opening
 */
export default Field.EventEntryFactory.create(
  0,
  [
    cmd.cameraFadeIn(3000),
    cmd.cameraFadeOut(2000),
    cmd.cameraFadeIn(5000),
    cmd.message('GAME START'),
    cmd.flag(GameFlagKeys.Opening, true),
  ],
);
