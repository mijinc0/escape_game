import { Message } from './Message';
import { Item } from './Item';

export class SceneCommandsFactory {
  static message(
    message: string,
    isAsync = false,
    align = 'left',
    hasBackground = true,
    justify = 'bottom'
  ): Message {
    return new Message(message, isAsync, align, hasBackground, justify);
  }

  static item(
    itemName: string,
    delta: number,
    isAsync = false
  ): Item {
    return new Item(itemName, delta, isAsync);
  }
}