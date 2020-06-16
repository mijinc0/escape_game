import { INode } from './INode';
import { ISelector } from './selector/ISelector';

type SelectorEvent = (target: IElement, selector: ISelector) => void;

export interface IElement extends INode {
  x: number;

  y: number;

  width: number;

  height: number;

  deltaX: number;

  deltaY: number;

  selectorOver(): void;

  addSelectorOverEvent(event: SelectorEvent): void;

  selectorOut(): void;

  addSelectorOutEvent(event: SelectorEvent): void;

  selectorSelect(): void;

  addSelectorSelectEvent(event: SelectorEvent): void;
}