import { EventEmitter } from 'events';
import { IElement } from './IElement';
import { ISelector } from './selector/ISelector';

type SelectorEvent = (target: IElement, selector: ISelector) => void;

export class Element extends EventEmitter implements IElement {
  parent: Element;
  
  children: Element[];
  
  deltaX: number;
  
  deltaY: number;

  width: number;

  height: number;

  get x(): number {
    return this.parent ? (this.parent.x + this.deltaX) : this.deltaX;
  }

  set x(x: number) {
    this.deltaX = this.parent ? (x - this.parent.x) : x;
  }

  get y(): number {
    return this.parent ? (this.parent.y + this.deltaY) : this.deltaY;
  }

  set y(y: number) {
    this.deltaY = this.parent ? (y - this.parent.y) : y;
  }

  selectorOver(): void {
    this.emit('selectorOver');
  };

  addSelectorOverEvent(event: SelectorEvent): void {
    this.on('selectorOver', event);
  };

  selectorOut(): void {
    this.emit('selectorOut');
  };

  addSelectorOutEvent(event: SelectorEvent): void {
    this.on('selectorOut', event);
  };

  selectorSelect(): void {
    this.emit('selectorSelect');
  };

  addSelectorSelectEvent(event: SelectorEvent): void {
    this.on('selectorSelect', event);
  };
}