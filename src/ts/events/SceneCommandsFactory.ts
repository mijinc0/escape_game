import { GameGlobal } from '../GameGlobal';
import { Message } from './commands/Message';
import { MessageBufferFactory } from './commands/MessageBufferFactory';
import { Item } from './commands/Item';
import { Flag } from './commands/Flag';
import { Variable } from './commands/Variable';
import { Sleep } from './commands/Sleep';

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

  static sleep(frame: number): Sleep {
    return new Sleep(frame);
  }
}