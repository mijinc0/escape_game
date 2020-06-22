import { ISelector } from './selector/ISelector';

type SelectorEvent = (target: ISelectorable, selector: ISelector) => void;

export interface ISelectorable {
  selectorOver(): void;

  addSelectorOverEvent(event: SelectorEvent): void;

  selectorOut(): void;

  addSelectorOutEvent(event: SelectorEvent): void;

  selectorSelect(): void;

  addSelectorSelectEvent(event: SelectorEvent): void;
}