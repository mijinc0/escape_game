import { Container } from './Container';
import { CenterAlignmentStrategy } from './CenterAlignmentStrategy';
import { RangeAlignmentStrategy } from './RangeAlignmentStrategy'; 
import { TableAlignmentStrategy } from './TableAlignmentStrategy';
import { Direction } from '../Direction';

export class ContainerFactory {
  static createCenter(
    width?: number,
    height?: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): Container {
    const ras = new CenterAlignmentStrategy()

    return new Container(ras, width, height, x, y, maxNodes);
  }

  static createRightRange(
    margin: number,
    width?: number,
    height?: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): Container {
    const ras = new RangeAlignmentStrategy(margin, Direction.Right)

    return new Container(ras, width, height, x, y, maxNodes);
  }

  static createDownRange(
    margin: number,
    width?: number,
    height?: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): Container {
    const ras = new RangeAlignmentStrategy(margin, Direction.Down)

    return new Container(ras, width, height, x, y, maxNodes);
  }
  
  static createTable(
    marginX: number,
    marginY: number,
    rowSize: number,
    width?: number,
    height?: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): Container {
    const tas = new TableAlignmentStrategy(rowSize, marginX, marginY);

    return new Container(tas, width, height, x, y,  maxNodes);
  }
} 