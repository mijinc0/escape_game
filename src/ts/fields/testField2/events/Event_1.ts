import * as Field from '../../../core/fields';
import * as Asset from '../../../core/assets';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

export default Field.EventEntryFactory.create(1,
  cmd.message('you got a key'),
  cmd.playSe(Asset.AssetCacheKey.audio('se_find_item'), 1, 0, 1.3, true),
  cmd.popGettingItemModal('silverKeyA'),
  cmd.item('silverKeyA', 1),
  cmd.item('silverKeyB', 1),
  cmd.item('silverKeyC', 1),
  cmd.item('silverKeyD', 1),
  cmd.item('silverKeyE', 1),
  cmd.item('silverKeyF', 1),
);