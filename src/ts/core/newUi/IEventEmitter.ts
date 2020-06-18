import { EventEmitter } from 'events';

export interface IEventEmitter {
  emit(type: string | symbol, ...args: any[]): boolean;

  on(event: string | symbol, fn: Function, context?: any): this;
}