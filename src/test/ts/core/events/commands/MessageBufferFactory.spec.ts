import 'mocha';
import { expect } from 'chai';
import { IGameGlobal } from '../../../../../ts/core/IGameGlobal';
import { GameVariables } from '../../../../../ts/core/models/GameVariables';
import { MessageBufferFactory } from '../../../../../ts/events/commands/MessageBufferFactory';

describe('messageBufferFactory.create()', () => {
  context('normal', () => {
    const testGameGlobal: IGameGlobal = {
      flags: null,
      variables: new GameVariables(),
      items: null,
      ownItems: null,
    };

    testGameGlobal.variables.set(11, 10);
    testGameGlobal.variables.set(22, 5);

    const mbf = new MessageBufferFactory(testGameGlobal);
    const message = 'I have \\V[11] apples and \\V[22] oranges.';
    const expected = 'I have 10 apples and 5 oranges.';
    const buffer = mbf.create(message);

    it('buffer[0] should equal expected', async () => {
      expect(buffer[0]).is.equal(expected);
    });
  });

  context('normal 2', () => {
    const testGameGlobal: IGameGlobal = {
      flags: null,
      variables: null,
      items: null,
      ownItems: null,
    };

    const mbf = new MessageBufferFactory(testGameGlobal);
    const message = 'line1\\!line2\\!line3';
    const buffer = mbf.create(message);

    it('buffer has 3 elements', async () => {
      expect(buffer.length).is.equal(3);
    });
  });
});
