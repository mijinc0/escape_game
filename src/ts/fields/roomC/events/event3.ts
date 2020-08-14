import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('roomC_event3');

/**
 * bookShelfs (未使用)
 */
export default Field.EventEntryFactory.create(3, [cmd.message(texts.get(0)), cmd.message(texts.get(1))]);
