import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('roomF_event2');

/**
 * shelf
 */
export default Field.EventEntryFactory.create(2, [cmd.message(texts.get(0)), cmd.message(texts.get(1))]);
