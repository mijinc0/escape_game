import { TestArea } from './test/TestArea';
import { IArea } from '../core/areas/IArea';

export const GameAreas = new Map<number, IArea>([
  [TestArea.id, TestArea],
]);