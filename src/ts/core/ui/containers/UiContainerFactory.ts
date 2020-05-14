import { UiContainer } from './UiContainer';
import { CenterAlignmentStrategy } from './CenterAlignmentStrategy';
import { RangeAlignmentStrategy } from './RangeAlignmentStrategy'; 
import { TableAlignmentStrategy } from './TableAlignmentStrategy';
import { Direction } from '../Direction';

export class UiCointainerFactory {
  static createCenter(
    width: number,
    height: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): UiContainer {
    const ras = new CenterAlignmentStrategy()

    return new UiContainer(width, height, ras, x, y, maxNodes);
  }

  static createRightRange(
    width: number,
    height: number,
    margin: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): UiContainer {
    const ras = new RangeAlignmentStrategy(margin, Direction.Right)

    return new UiContainer(width, height, ras, x, y, maxNodes);
  }

  static createDownRange(
    width: number,
    height: number,
    margin: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): UiContainer {
    const ras = new RangeAlignmentStrategy(margin, Direction.Down)

    return new UiContainer(width, height, ras, x, y, maxNodes);
  }
  
  static createTable(
    width: number,
    height: number,
    rowSize: number,
    marginX: number,
    marginY: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): UiContainer {
    const tas = new TableAlignmentStrategy(rowSize, marginX, marginY);

    return new UiContainer(width, height, tas, x, y,  maxNodes);
  }
} 