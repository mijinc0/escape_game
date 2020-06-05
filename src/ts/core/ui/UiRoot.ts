import { Element } from './Element';

export class UiRoot implements Element {
  elements: Element[];

  constructor(...elements: Element[]) {
    this.elements = elements;
  }

  update(frame: number): void {
    this.elements.forEach((element: Element) => {
      element.update(frame);
    });
  } 

  destroy(): null {
    this.elements.forEach((element: Element) => {
      element.destroy();
    });

    this.elements = [];

    return null;
  }
}