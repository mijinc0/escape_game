import { IScenarioEvent } from './IScenarioEvent';
import { IRelationalChunk } from './IRelationalChunk';
import { Keys } from '../models/Keys';

export type ScenarioEventUpdateConfig = {
  keys?: Keys,
  belongingChunk?: IRelationalChunk<IScenarioEvent>,
}