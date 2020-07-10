import { IArea } from '../core/areas/IArea';
import { TestArea } from './testArea1/TestArea';
import { TestArea2 } from './testArea2/TestArea';

export const GameAreas = new Map<number, IArea>([
  [TestArea.id, TestArea],
  [TestArea2.id, TestArea2],
]);