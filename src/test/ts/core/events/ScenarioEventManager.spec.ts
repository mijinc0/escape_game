import 'mocha';
import { expect } from 'chai';
import { ScenarioEventManager } from '../../../../ts/core/events/ScenarioEventManager';
import { LineRange } from '../../../../ts/core/events/LineRange';
import { IScenarioEvent } from '../../../../ts/core/events/IScenarioEvent';

class TestEvent implements IScenarioEvent {
  isComplete: boolean;
  isAsync: boolean;
  canBeComplete: boolean;

  constructor(canBeComplete: boolean, isAsync: boolean) {
    this.isComplete = false;
    this.isAsync = isAsync;
    this.canBeComplete = canBeComplete;
  }

  init(): void {}

  update(frame: number): void {
    this.complete();
  }
  
  complete(): void {
    this.isComplete = this.canBeComplete;
  }
}


describe('scenarioEventManager.start()', () => {
  context('normal', () => {
    const sem = new ScenarioEventManager();
    const eventRange = new LineRange([
      new TestEvent(true, true),
      new TestEvent(true, true),
      new TestEvent(true, false),
      new TestEvent(true, false),
      new TestEvent(true, false),
    ]);

    sem.start(eventRange);

    it('current event size should be 3 ', () => {
      expect(sem.getCurrentEventSize()).is.equals(3);
    });
  });
});

describe('scenarioEventManager.update()', () => {
  context('normal', () => {
    const sem = new ScenarioEventManager();
    const eventRange = new LineRange([
      new TestEvent(true, true),
      new TestEvent(true, true),
      new TestEvent(true, false),
      new TestEvent(true, true),
      new TestEvent(true, false),
    ]);

    sem.start(eventRange);

    sem.update(0);

    it('current event size should be 2', () => {
      expect(sem.getCurrentEventSize()).is.equals(2);
    });
  });

  context('normal 2', () => {
    const sem = new ScenarioEventManager();
    const eventRange = new LineRange([
      new TestEvent(false, true),
      new TestEvent(true, true),
      new TestEvent(true, false),
      new TestEvent(true, true),
      new TestEvent(true, false),
    ]);

    sem.start(eventRange);

    sem.update(0);

    it('current event size should be 3', () => {
      expect(sem.getCurrentEventSize()).is.equals(3);
    });
  });

  context('normal 3', () => {
    const sem = new ScenarioEventManager();
    const eventRange = new LineRange([
      new TestEvent(false, true),
      new TestEvent(true, true),
      new TestEvent(true, false),
      new TestEvent(true, true),
      new TestEvent(true, false),
    ]);

    sem.start(eventRange);

    sem.update(0);
    sem.update(1);
    sem.update(2);
    sem.update(3);

    it('current event size should be 1', () => {
      expect(sem.getCurrentEventSize()).is.equals(1);
    });
  });

  context('normal 3', () => {
    const sem = new ScenarioEventManager();
    const eventRange = new LineRange([
      new TestEvent(true, false),
      new TestEvent(true, false),
      new TestEvent(true, false),
    ]);

    sem.start(eventRange);

    sem.update(0);
    sem.update(1);
    sem.update(2);

    it('current event size should be 0', () => {
      expect(sem.getCurrentEventSize()).is.equals(0);
    });
  });

  context('normal 4', () => {
    const sem = new ScenarioEventManager();
    const eventRange = new LineRange([
      new TestEvent(false, true),
      new TestEvent(false, true),
      new TestEvent(false, true),
    ]);

    sem.start(eventRange);

    sem.update(0);

    it('current event size should be 3', () => {
      expect(sem.getCurrentEventSize()).is.equals(3);
    });
  });
});

