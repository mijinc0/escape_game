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
const texts = GameGlobal.texts.event.get('roomG_event8');

/**
 * bed L
 */
export default Field.EventEntryFactory.create(
  8,
  [
    op.if(() => (GameGlobal.ownItems.has(GameItemIds.LighterOil)))(
      cmd.message(texts.get(0)),
      cmd.message(texts.get(1)),

    ).else(
      cmd.message(texts.get(2)),
      cmd.message(texts.get(3)),
      cmd.message(texts.get(4)),

      op.if(() => (GameGlobal.ownItems.has(GameItemIds.Barl)))(
        cmd.message(texts.get(5)),
        cmd.sleep(20),
        cmd.message(texts.get(6)),
        cmd.sleep(20),
        cmd.message(texts.get(7)),
        cmd.sleep(20),
        cmd.message(texts.get(8)),
        cmd.playSe(Assets.AssetCacheKey.audio('se_find_item'), 1, 0, 1, true),
        cmd.popGettingItemModal(GameItemIds.LighterOil),
        cmd.item(GameItemIds.LighterOil, +1),
      ),
    ),
  ],
);
