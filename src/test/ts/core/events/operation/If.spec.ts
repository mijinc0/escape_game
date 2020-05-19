import 'mocha';
import { expect } from 'chai';
import { If } from '../../../../../ts/core/events/operations/If';
import { IScenarioEvent } from '../../../../../ts/core/events/IScenarioEvent';

class TestEvent implements IScenarioEvent {
  isComplete: boolean;
  isAsync: boolean;

  constructor() {
    this.isComplete = false;
    this.isAsync = false;
  }

  update(frame: number): void {
    this.complete(frame);
  }

  complete(frame: number): void {
    this.isComplete = true;
  };
}

describe('if.update()', () => {
  context('nomal (signle condition)', () => {
    const eventQueue: IScenarioEvent[] = [];

    const eventIf = new If(
      (...events: IScenarioEvent[]) => {eventQueue.push(...events)},
      () => (true),
      // events
      new TestEvent(),
    );

    eventIf.update(0);

    it('event queue should have one event', async () => {
      expect(eventQueue.length).is.equal(1);
    });
  });

  context('nomal (signle condition) 2', () => {
    const eventQueue: IScenarioEvent[] = [];

    const eventIf = new If(
      (...events: IScenarioEvent[]) => {eventQueue.push(...events)},
      () => (false),
      // events
      new TestEvent(),
    );

    eventIf.update(0);

    it('event queue should have no event', async () => {
      expect(eventQueue.length).is.equal(0);
    });
  });

  context('nomal (multi conditions)', () => {
    const eventQueue: IScenarioEvent[] = [];

    const eventIf = new If(
      (...events: IScenarioEvent[]) => {eventQueue.push(...events)},
      () => (false),
      // 1 event
      new TestEvent(),
    ).elseIf(
      () => (true),
      // 2 events
      new TestEvent(),
      new TestEvent(),
    ).else(
      // 3 events
      new TestEvent(),
      new TestEvent(),
      new TestEvent(),
    );

    eventIf.update(0);

    it('event queue should have 2 events', async () => {
      expect(eventQueue.length).is.equal(2);
    });
  });

  context('nomal (multi conditions) 2', () => {
    const eventQueue: IScenarioEvent[] = [];

    const eventIf = new If(
      (...events: IScenarioEvent[]) => {eventQueue.push(...events)},
      () => (false),
      // 1 event
      new TestEvent(),
    ).elseIf(
      () => (false),
      // 2 events
      new TestEvent(),
      new TestEvent(),
    ).else(
      // 3 events
      new TestEvent(),
      new TestEvent(),
      new TestEvent(),
    );

    eventIf.update(0);

    it('event queue should have 3 events', async () => {
      expect(eventQueue.length).is.equal(3);
    });
  });

  context('nomal (multi conditions) 3', () => {
    const eventQueue: IScenarioEvent[] = [];

    const eventIf = new If(
      (...events: IScenarioEvent[]) => {eventQueue.push(...events)},
      () => (true),
      // 1 event
      new TestEvent(),
    ).elseIf(
      () => (true),
      // 2 events
      new TestEvent(),
      new TestEvent(),
    ).else(
      // 3 events
      new TestEvent(),
      new TestEvent(),
      new TestEvent(),
    );

    eventIf.update(0);

    it('event queue should have 1 event', async () => {
      expect(eventQueue.length).is.equal(1);
    });
  });
});