import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';
import { EventEntryFactory } from '../../../core/fields/EventEntryFactory';

export default EventEntryFactory.create(1,
  cmd.message('you got a key'),
  cmd.popGettingItemModal('silverKeyA'),
  cmd.item('silverKeyA', 1),
  cmd.item('silverKeyB', 1),
  cmd.item('silverKeyC', 1),
  cmd.item('silverKeyD', 1),
  cmd.item('silverKeyE', 1),
  cmd.item('silverKeyF', 1),
);