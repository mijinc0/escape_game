import { ITransfrom } from './ITransfrom';
import { IEventEmitter } from './IEventEmitter';

export interface IElement extends IEventEmitter {
  x: number;

  y: number;

  deltaX: number;
  
  deltaY: number;
  
  width: number;
  
  height: number;
  
  anchor?: ITransfrom;

  destroy(fromScene?: boolean): void;
}