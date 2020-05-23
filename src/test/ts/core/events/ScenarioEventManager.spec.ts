import 'mocha';
import { expect } from 'chai';
import { ScenarioEventManager } from '../../../../ts/core/events/ScenarioEventManager';
import { IRelationalChunk } from '../../../../ts/core/events/IRelationalChunk';
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

  update(frame: number): void {
    this.isComplete = this.canBeComplete;
  }
}

class TestRelationalChunk implements IRelationalChunk<IScenarioEvent> {
  events: IScenarioEvent[];
  
  currentIndex: number;

  backPoint: {chunk: IRelationalChunk<IScenarioEvent>, index: number};

  constructor(events: IScenarioEvent[]) {
    this.events = events;
    this.currentIndex = -1;
    this.backPoint = null;
  }

  next(): IteratorResult<IScenarioEvent, IScenarioEvent> {
    this.currentIndex++;
    const value = this.events[this.currentIndex];
    const done = !this.events[this.currentIndex + 1];

    return {value: value, done: done};
  }

  isComplete(): boolean {
    return this.currentIndex >= (this.events.length - 1);
  };

  getRootChunk(): IRelationalChunk<IScenarioEvent> {
    return this; // ここでは使わないので適当
  };
}

describe('scenarioEventManager.start()', () => {
  context('normal', () => {
    const sem = new ScenarioEventManager();
    const chunk = new TestRelationalChunk([
      new TestEvent(true, true),
      new TestEvent(true, true),
      new TestEvent(true, false),
      new TestEvent(true, false),
      new TestEvent(true, false),
    ]);

    sem.start(chunk);

    it('current event size should be 3 ', () => {
      expect(sem.getCurrentEventSize()).is.equals(3);
    });
  });
});

describe('scenarioEventManager.update()', () => {
  context('normal', () => {
    const sem = new ScenarioEventManager();
    const chunk = new TestRelationalChunk([
      new TestEvent(true, true),
      new TestEvent(true, true),
      new TestEvent(true, false),
      new TestEvent(true, false),
      new TestEvent(true, false),
    ]);

    sem.start(chunk);

    sem.update(0);

    it('current event size should be 1 ', () => {
      expect(sem.getCurrentEventSize()).is.equals(1);
    });
  });

  context('normal', () => {
    const sem = new ScenarioEventManager();
    const chunk = new TestRelationalChunk([
      new TestEvent(false, true),
      new TestEvent(true, true),
      new TestEvent(true, false),
      new TestEvent(true, false),
      new TestEvent(true, true),
      new TestEvent(true, true),
      new TestEvent(true, false),
    ]);

    sem.start(chunk);

    sem.update(0);
    sem.update(1);

    // 最初の終了しないイベント+最後のイベント*3が残るので、4つになるはず
    it('current event size should be 4 ', () => {
      expect(sem.getCurrentEventSize()).is.equals(4);
    });
  });

  context('normal', () => {
    const sem = new ScenarioEventManager();
    const chunk = new TestRelationalChunk([
      new TestEvent(false, true),
      new TestEvent(true, true),
      new TestEvent(true, false),

      new TestEvent(true, false),

      new TestEvent(true, true),
      new TestEvent(true, true),
      new TestEvent(true, false),
    ]);

    sem.start(chunk);

    sem.update(0);
    sem.update(1);
    sem.update(2);

    // 最初の終了しないイベントのみが残るはず
    it('current event size should be 1', () => {
      expect(sem.getCurrentEventSize()).is.equals(1);
    });
  });
});