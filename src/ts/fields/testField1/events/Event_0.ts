import { GameGlobal } from '../../../GameGlobal';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';
import { SceneEventOprationsFactory as op } from '../../../core/events/operations/SceneEventOprationsFactory';
import { EventEntryFactory } from '../../../core/fields/EventEntryFactory';

export default EventEntryFactory.create(0, 
  cmd.message('this is message\\!this event is page 0'),

  op.if(() => (false))(
    cmd.message('this event is in block of operation if'),
  ).else(
    cmd.message('this event is in block of operation else '),
  ),

  cmd.addVariable('test', 100),

  op.loop(
    op.if(() => (GameGlobal.variables.get('loop') < 10))(
      cmd.message('loop now'),
      cmd.addVariable('loop', 1),
    ).else(
      op.break(),
    ),
  ),

  cmd.message('this is end of event \\V[test]'),
);