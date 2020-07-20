import * as Field from '../../../core/fields';
import { GameGlobal } from '../../../GameGlobal';
import { SceneEventOprationsFactory as op } from '../../../core/events/operations/SceneEventOprationsFactory';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore
export default Field.EventEntryFactory.create(
  0,
  [
    cmd.message('this is message\\!this event is page 0'),

    op.if(() => false)(
      cmd.message('this event is in block of operation if')
    ).else(
      cmd.message('this event is in block of operation else ')
    ),

    cmd.message('this is end of event \\V[test]'),
  ],
);
