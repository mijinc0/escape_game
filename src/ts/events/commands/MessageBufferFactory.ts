import { IMessageBufferFactory } from './IMessageBufferFactory';
import { IGameGlobal } from '../../core/IGameGlobal';

export class MessageBufferFactory implements IMessageBufferFactory {
  private gameGlobal: IGameGlobal;

  constructor(gameGlobal: IGameGlobal) {
    this.gameGlobal = gameGlobal;
  }

  create(message: string): string[] {
    message = this._replaceVariables(message);

    const bufferSepalator = '\\!';
    return message.split(bufferSepalator);
  }

  private _replaceVariables(message: string): string {
    const variableChars = message.match(/\\V\[\w+\]/g);

    if (!variableChars) return message;

    variableChars.forEach((variableChar: string) => {
      // \\V[key] から key を抜き出す
      const variableKey = variableChar.slice(3, variableChar.length - 1);
      const variable = this.gameGlobal.variables.get(variableKey);
      message = message.replace(variableChar, variable.toString());
    });

    return message;
  }
}
