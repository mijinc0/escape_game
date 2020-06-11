import { Container } from './Container';
import { CenterAlignmentStrategy } from './CenterAlignmentStrategy';
import { RangeAlignmentStrategy } from './RangeAlignmentStrategy'; 
import { TableAlignmentStrategy } from './TableAlignmentStrategy';
import { Direction } from '../Direction';

export class ContainerFactory {
  static createCenter(
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    maxNodes?: number,
  ): Container {
    const ras = new CenterAlignmentStrategy()

    return new Container(ras, x, y, width, height, maxNodes);
  }

  static createRightRange(
    margin: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    maxNodes?: number,
  ): Container {
    const ras = new RangeAlignmentStrategy(margin, Direction.Right)

    return new Container(ras, x, y, width, height, maxNodes);
  }

  static createDownRange(
    margin: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    maxNodes?: number,
  ): Container {
    const ras = new RangeAlignmentStrategy(margin, Direction.Down)

    return new Container(ras, x, y, width, height, maxNodes);
  }
  
  static createTable(
    marginX: number,
    marginY: number,
    rowSize: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    maxNodes?: number,
  ): Container {
    const tas = new TableAlignmentStrategy(rowSize, marginX, marginY);

    return new Container(tas, x, y, width, height, maxNodes);
  }
} 