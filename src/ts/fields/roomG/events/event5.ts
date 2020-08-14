import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('roomG_event5');

/**
 * bed R
 */
export default Field.EventEntryFactory.create(5, [cmd.message(texts.get(0)), cmd.message(texts.get(1))]);
