import { GameGlobal } from '../../../GameGlobal';
import { SceneCommandsFactory as cmd } from '../../../events/SceneCommandsFactory';
import { SceneEventOprationsFactory as op } from '../../../core/events/operations/SceneEventOprationsFactory';
import { EventEntryFactory } from '../../../core/areas/EventEntryFactory';

export const Event0 = EventEntryFactory.create(0, 
  cmd.message('this is message\\!this event is page 0'),

  op.if(() => (false))(
    cmd.message('this event is in block of operation if'),
  ).else(
    cmd.message('this event is in block of operation else '),
  ),

  cmd.addVariable('test', 100),

  op.loop(
    op.if(() => (false))(
      cmd.message('loop now'),
    ).else(
      op.break(),
    ),
  ),

  cmd.message('this is end of event \\V[test]'),
);