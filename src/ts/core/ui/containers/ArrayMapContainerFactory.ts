import { ArrayMapContainer } from './ArrayMapContainer';
import { CenterAlignmentStrategy } from './CenterAlignmentStrategy';
import { RangeAlignmentStrategy } from './RangeAlignmentStrategy'; 
import { TableAlignmentStrategy } from './TableAlignmentStrategy';
import { Direction } from '../Direction';
import { INode } from '../INode';

type UiNodeFactoryCallback<T> = (instance: T) => INode;

export class ArrayMapContainerFactory {
  static createCenter<T>(
    arrayData: Array<T>,
    uiNodeFactoryCallback: UiNodeFactoryCallback<T>,
    dataAddingSize?: number,
    width?: number,
    height?: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): ArrayMapContainer<T> {
      
    const ras = new CenterAlignmentStrategy()

    return new ArrayMapContainer(arrayData, uiNodeFactoryCallback, ras, width, height, x, y, maxNodes);
  }

  static createRightRange<T>(
    arrayData: Array<T>,
    uiNodeFactoryCallback: UiNodeFactoryCallback<T>,
    margin: number,
    dataAddingSize?: number,
    width?: number,
    height?: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): ArrayMapContainer<T> {
    dataAddingSize = dataAddingSize ? dataAddingSize : 1;
    const ras = new RangeAlignmentStrategy(margin, Direction.Right)

    return new ArrayMapContainer(arrayData, uiNodeFactoryCallback, ras, dataAddingSize, width, height, x, y, maxNodes);
  }

  static createDownRange<T>(
    arrayData: Array<T>,
    uiNodeFactoryCallback: UiNodeFactoryCallback<T>,
    margin: number,
    dataAddingSize?: number,
    width?: number,
    height?: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): ArrayMapContainer<T> {
    dataAddingSize = dataAddingSize ? dataAddingSize : 1;

    const ras = new RangeAlignmentStrategy(margin, Direction.Down)

    return new ArrayMapContainer(arrayData, uiNodeFactoryCallback, ras, dataAddingSize, width, height, x, y, maxNodes);
  }
  
  static createTable<T>(
    arrayData: Array<T>,
    uiNodeFactoryCallback: UiNodeFactoryCallback<T>,
    marginX: number,
    marginY: number,
    rowSize: number,
    dataAddingSize?: number,
    width?: number,
    height?: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ): ArrayMapContainer<T> {
    dataAddingSize = dataAddingSize ? dataAddingSize : rowSize;

    const tas = new TableAlignmentStrategy(rowSize, marginX, marginY);

    return new ArrayMapContainer(arrayData, uiNodeFactoryCallback, tas, dataAddingSize, width, height, x, y, maxNodes);
  }
}