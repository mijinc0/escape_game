import * as Assets from '../../../core/assets';
import * as Field from '../../../core/fields';
import * as Model from '../../../core/models';
import { FieldIds } from '../../FieldIds';
import { GameGlobal } from '../../../GameGlobal';
import { GameFlagKeys } from '../../../GameFlagKeys';
import { GameItemIds } from '../../../items/GameItemIds';
import { SceneEventOprationsFactory as op } from '../../../core/events/operations/SceneEventOprationsFactory';
import { ScenarioEventCommandsFactory as cmd } from '../../../events/ScenarioEventCommandsFactory';

// prettier-ignore

/**
 * memo
 */
export default Field.EventEntryFactory.create(
  2,
  [
    cmd.message('TestEvent'),
    cmd.actorSpriteTint(-1, 0x000000, 1000),
    cmd.actorSpriteTint(-1, 0xffffff, 1000),
    cmd.message('end'),
  ],
);
