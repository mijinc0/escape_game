import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
const texts = GameGlobal.texts.event.get('storeroom_event4');

/**
 * shelf
 */
export default Field.EventEntryFactory.create(4, [cmd.message(texts.get(0)), cmd.message(texts.get(1))]);
