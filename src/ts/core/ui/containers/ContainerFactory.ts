import { Container } from './Container';
import { CenterAlignmentStrategy } from './CenterAlignmentStrategy';
import { RangeAlignmentStrategy } from './RangeAlignmentStrategy'; 
import { TableAlignmentStrategy } from './TableAlignmentStrategy';
import { Direction } from '../Direction';

export class ContainerFactory {
  static createCenter(
    width: number,
    height: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): Container {
    const ras = new CenterAlignmentStrategy()

    return new Container(width, height, ras, x, y, maxNodes);
  }

  static createRightRange(
    width: number,
    height: number,
    margin: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): Container {
    const ras = new RangeAlignmentStrategy(margin, Direction.Right)

    return new Container(width, height, ras, x, y, maxNodes);
  }

  static createDownRange(
    width: number,
    height: number,
    margin: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): Container {
    const ras = new RangeAlignmentStrategy(margin, Direction.Down)

    return new Container(width, height, ras, x, y, maxNodes);
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
  ): Container {
    const tas = new TableAlignmentStrategy(rowSize, marginX, marginY);

    return new Container(width, height, tas, x, y,  maxNodes);
  }
} 