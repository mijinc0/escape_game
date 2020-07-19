import { EventEmitter } from 'events';
import { IElement } from './IElement';

export class Element implements IElement {
  /**
   * デバッグ時に使えるように設けたプロパティ
   */
  name: string;

  deltaX: number;

  deltaY: number;

  width: number;

  height: number;

  anchor?: IElement;

  private events: EventEmitter;

  constructor(dx = 0, dy = 0, width = 0, height = 0, anchor?: IElement) {
    this.name = '';
    this.anchor = anchor ? anchor : null;
    this.deltaX = dx;
    this.deltaY = dy;
    this.width = width;
    this.height = height;
    this.events = new EventEmitter();
  }

  get x(): number {
    return this.anchor ? this.anchor.x + this.deltaX : this.deltaX;
  }

  set x(x: number) {
    this.deltaX = this.anchor ? this.anchor.x - x : x;
  }

  get y(): number {
    return this.anchor ? this.anchor.y + this.deltaY : this.deltaY;
  }

  set y(y: number) {
    this.deltaY = this.anchor ? this.anchor.y - y : y;
  }

  destroy(fromScene?: boolean): void {}

  /**
   * EveneEmitterを継承しないのは、Phaserが使っている`ementemitter3`との差を吸収するため
   *
   * @param type
   * @param args
   */
  emit(type: string | symbol, ...args: any[]): boolean {
    return this.events.emit(type.toString(), ...args);
  }

  /**
   * EveneEmitterを継承しないのは、Phaserが使っている`ementemitter3`との差を吸収するため
   *
   * @param event
   * @param fn
   * @param context
   */
  on(event: string | symbol, fn: (...args: any[]) => void, context?: any): this {
    fn = context ? fn.bind(context) : fn;

    this.events.on(event.toString(), fn);

    return this;
  }
}
