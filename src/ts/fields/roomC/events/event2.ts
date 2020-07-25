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
const texts = GameGlobal.texts.event.get('roomC_event2');

/**
 * shelfR
 */
export default Field.EventEntryFactory.create(
  2,
  [
    cmd.message(texts.get(0)),
    cmd.playSe(Assets.AssetCacheKey.audio('se_open_drawer'), 1, 0, 5),
    cmd.message(texts.get(1)),
  ],
);
