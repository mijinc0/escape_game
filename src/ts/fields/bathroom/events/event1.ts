import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('bathroom_event1');

/**
 * showerhead
 */
export default Field.EventEntryFactory.create(1, [cmd.message(texts.get(0)), cmd.message(texts.get(1))]);
