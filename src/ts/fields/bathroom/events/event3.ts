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
const texts = GameGlobal.texts.event.get('bathroom_event3');

/**
 * key roomE
 */
export default Field.EventEntryFactory.create(
  3,
  [
    cmd.message(texts.get(0)),
    cmd.message(texts.get(1)),
    cmd.playSe(Assets.AssetCacheKey.audio('se_find_item'), 1, 0, 1, true),
    cmd.popGettingItemModal(GameItemIds.KeyRoomE),
    cmd.item(GameItemIds.KeyRoomE, +1),
    cmd.sleep(1000),
    cmd.message(texts.get(2)),
    cmd.message(texts.get(3)),
  ]
);
