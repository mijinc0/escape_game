import { Message } from './Message';
import { MessageBufferFactory } from './MessageBufferFactory';
import { Item } from './Item';
import { Flag } from './Flag';
import { Variable } from './Variable';
import { GameGlobal } from '../../GameGlobal';

export class SceneCommandsFactory {
  static messageBufferFactory = new MessageBufferFactory(GameGlobal);

  static message(
    message: string,
    isAsync = false,
    align = 'left',
    hasBackground = true,
    justify = 'bottom'
  ): Message {
    return new Message(
      message,
      isAsync,
      align,
      hasBackground,
      justify,
      this.messageBufferFactory.create.bind(this.messageBufferFactory),
    );
  }

  static item(itemName: string, delta: number): Item {
    return new Item(itemName, delta);
  }

  static flag(key: string, value: boolean): Flag {
    const _value = value ? 1 : -1;
    return new Flag(key, _value);
  }

  static toggleFlag(key: string): Flag {
    return new Flag(key, 0);
  }

  static setVariable(key: string, value: number): Variable {
    return new Variable(key, value, 0);
  }

  static addVariable(key: string, value: number): Variable {
    return new Variable(key, value, 1);
  }

  static substractVariable(key: string, value: number): Variable {
    return new Variable(key, value, -1);
  }
}