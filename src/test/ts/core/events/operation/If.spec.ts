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
    this.isComplete = true;
  }
}

describe('if.update()', () => {
  context('nomal (one condition) 1', () => {
    const events = [
      new TestEvent(),
    ];
    const eventIf = new If(() => (true), ...events);

    eventIf.update(0);

    it('eventIf should not be complete', async () => {
      expect(eventIf.isComplete).is.false;
    });
  });

  context('nomal (one condition) 2', () => {
    const events = [
      new TestEvent(),
    ];
    const eventIf = new If(() => (false), ...events);

    eventIf.update(0);

    it('eventIf should be complete', async () => {
      expect(eventIf.isComplete).is.true;
    });
  });

  context('nomal (one condition) 3', () => {
    const events = [
      new TestEvent(),
    ];
    const eventIf = new If(() => (true), ...events);

    eventIf.update(0);
    eventIf.update(1);

    it('eventIf should be complete', async () => {
      expect(eventIf.isComplete).is.true;
    });
  });

  context('nomal (2 conditions)', () => {
    const events = [
      new TestEvent(),
    ];
    const eventIf = new If(() => (false), ...events);

    eventIf.elseIf(
      () => (true),
      ...events
    );

    eventIf.update(0);

    it('eventIf should not be complete', async () => {
      expect(eventIf.isComplete).is.false;
    });
  });

  context('nomal (2 conditions) 2', () => {
    const events = [
      new TestEvent(),
    ];
    const eventIf = new If(() => (false), ...events);

    eventIf.elseIf(
      () => (false),
      ...events
    );

    eventIf.update(0);

    it('eventIf should be complete', async () => {
      expect(eventIf.isComplete).is.true;
    });
  });

  context('nomal (3 conditions)', () => {
    const events = [
      new TestEvent(),
    ];
    const eventIf = new If(() => (false), ...events);

    eventIf.elseIf(
      () => (false),
      ...events
    ).else(
      ...events
    );

    eventIf.update(0);

    it('eventIf should not be complete', async () => {
      expect(eventIf.isComplete).is.false;
    });
  });
});