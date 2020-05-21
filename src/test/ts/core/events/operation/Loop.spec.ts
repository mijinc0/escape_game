import 'mocha';
import { expect } from 'chai';
import { Loop } from '../../../../../ts/core/events/operations/Loop';

import { IScenarioEvent } from '../../../../../ts/core/events/IScenarioEvent';

class TestEvent implements IScenarioEvent {
  isComplete: boolean;
  isAsync: boolean;

  constructor() {
    this.isComplete = false;
    this.isAsync = false;
  }

  update(frame: number): void {
    this.isComplete = true;
  }
}

describe('Loop.update()', () => {
  context('nomal 1', () => {
    const trapEvent = new TestEvent();
    const eventLoop = new Loop(
      new TestEvent(),
      new TestEvent(),
      new TestEvent(),
      trapEvent,
      new TestEvent(),
    );

    // まだtrapEventに到達していない
    const roop = 3;
    for (let k = 0; k <  roop; k++) {
      eventLoop.update(k);
    }

    it('Loop event should not be complete', async () => {
      expect(eventLoop.isComplete).is.false;
    });

    it('trap event should not be complete', async () => {
      expect(trapEvent.isComplete).is.false;
    });
  });

  context('nomal 2', () => {
    const trapEvent = new TestEvent();
    const eventLoop = new Loop(
      new TestEvent(),
      new TestEvent(),
      new TestEvent(),
      trapEvent,
      new TestEvent(),
    );

    // まだtrapEventが発火される
    const roop = 4;
    for (let k = 0; k <  roop; k++) {
      eventLoop.update(k);
    }

    it('Loop event should not be complete', async () => {
      expect(eventLoop.isComplete).is.false;
    });

    it('trap event should be complete', async () => {
      expect(trapEvent.isComplete).is.true;
    });
  });

  context('nomal 3', () => {
    const trapEvent = new TestEvent();
    const eventLoop = new Loop(
      new TestEvent(),
      new TestEvent(),
      new TestEvent(),
      trapEvent,
      new TestEvent(),
    );

    // trapEventの次のイベントが発火
    const roop = 5;
    for (let k = 0; k <  roop; k++) {
      eventLoop.update(k);
    }

    it('Loop event should not be complete', async () => {
      expect(eventLoop.isComplete).is.false;
    });

    it('trap event should be complete', async () => {
      expect(trapEvent.isComplete).is.true;
    });
  });

  context('nomal 4', () => {
    const trapEvent = new TestEvent();
    const eventLoop = new Loop(
      new TestEvent(),
      new TestEvent(),
      new TestEvent(),
      trapEvent,
      new TestEvent(),
    );

    // 繰り返し2週目だがまだtrapEventに突入していない
    const roop = 7;
    for (let k = 0; k <  roop; k++) {
      eventLoop.update(k);
    }

    it('Loop event should not be complete', async () => {
      expect(eventLoop.isComplete).is.false;
    });

    it('trap event should not be complete', async () => {
      expect(trapEvent.isComplete).is.false;
    });
  });
});