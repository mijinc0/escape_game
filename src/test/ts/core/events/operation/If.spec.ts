import 'mocha';
import { expect } from 'chai';
import { If } from '../../../../../ts/core/events/operations/If';
import { IRange } from '../../../../../ts/core/events/IRange';
import { IScenarioEvent } from '../../../../../ts/core/events/IScenarioEvent';

class TestEvent implements IScenarioEvent {
  isComplete: boolean;
  isAsync: boolean;

  constructor() {
    this.isComplete = false;
    this.isAsync = false;
  }

  init(): void {}

  update(frame: number): void {
    this.complete();
  }
  
  complete(): void {
    this.isComplete = true;
  }
}

describe('if.update()', () => {
  context('normal', () => {
    const opIf = new If(
      () => (true),
      [
        new TestEvent(),
        new TestEvent(),
        new TestEvent(),
      ],
    );

    const rangeStore: IRange<IScenarioEvent>[] = [];

    opIf.update(0, {events: rangeStore, currentEvents: []});

    it('op if should be complete', async () => {
      expect(opIf.isComplete).is.true;
    });

    it('rangeStore should have a event range', async () => {
      expect(rangeStore.length).is.equal(1);
    });
  });

  context('normal 2', () => {
    const opIf = new If(
      () => (false),
      [
        new TestEvent(),
        new TestEvent(),
        new TestEvent(),
      ],
    );

    const rangeStore: IRange<IScenarioEvent>[] = [];

    opIf.update(0, {events: rangeStore, currentEvents: []});

    it('op if should be complete', async () => {
      expect(opIf.isComplete).is.true;
    });

    it('rangeStore should have no event range', async () => {
      expect(rangeStore.length).is.equal(0);
    });
  });

  context('normal 3', () => {
    const opIf = new If(
      () => (false),
      [new TestEvent()],
    );

    opIf.elseIf(() => (true))(
      new TestEvent(),
      new TestEvent(),
    ).else(
      new TestEvent(),
      new TestEvent(),
      new TestEvent(),
    );

    const rangeStore: IRange<IScenarioEvent>[] = [];

    opIf.update(0, {events: rangeStore, currentEvents: []});

    it('op if should be complete', async () => {
      expect(opIf.isComplete).is.true;
    });

    it('rangeStore should have a event range', async () => {
      expect(rangeStore.length).is.equal(1);
    });

    it('first event range should have 2 events', async () => {
      const firstRangesEvents = rangeStore[0] ? rangeStore[0].entries.length : -1;
      expect(firstRangesEvents).is.equal(2);
    });
  });

  context('normal 4', () => {
    const opIf = new If(
      () => (false),
      [new TestEvent()],
    );

    opIf.elseIf(() => (false))(
      new TestEvent(),
      new TestEvent(),
    ).else(
      new TestEvent(),
      new TestEvent(),
      new TestEvent(),
    );

    const rangeStore: IRange<IScenarioEvent>[] = [];

    opIf.update(0, {events: rangeStore, currentEvents: []});

    it('op if should be complete', async () => {
      expect(opIf.isComplete).is.true;
    });

    it('rangeStore should have a event range', async () => {
      expect(rangeStore.length).is.equal(1);
    });

    it('first event range should have 3 events', async () => {
      const firstRangesEvents = rangeStore[0] ? rangeStore[0].entries.length : -1;
      expect(firstRangesEvents).is.equal(3);
    });
  });
});