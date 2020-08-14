import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('roomA_event2');

/**
 * bookshelf
 */
export default Field.EventEntryFactory.create(2, [cmd.message(texts.get(0)), cmd.message(texts.get(1))]);
