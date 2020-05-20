import 'mocha';
import { expect } from 'chai';
import { ScenarioEventManager } from '../../../../ts/core/events/ScenarioEventManager';
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

describe('scenarioEventManager.start()', () => {
  context('normal', () => {
    const sem = new ScenarioEventManager();
    const events = [
      new TestEvent(true, true),
      new TestEvent(true, true),
      new TestEvent(true, false),
      new TestEvent(true, false),
      new TestEvent(true, false),
    ];
    sem.start(events);

    it('event should be going', () => {
      expect(sem.isGoing).is.true;
    });

    it('current event size should be 3 ', () => {
      expect(sem.getCurrentEventSize()).is.equals(3);
    });

    it('all event size should be 5', () => {
      expect(sem.getAllEventSize()).is.equals(5);
    });
  });
});

describe('scenarioEventManager.update()', () => {
  context('normal', () => {
    const sem = new ScenarioEventManager();
    const events = [
      new TestEvent(true, true),
      new TestEvent(true, true),
      new TestEvent(true, false),
      new TestEvent(true, true),
      new TestEvent(true, false),
    ];
    sem.start(events);

    sem.update(0);
    // 最初の3つのイベントが上記updateで終了し、
    // 残りの2つのイベント(非同期1,同期1)がcurrentEventsにセットされる
    it('current event size should be 2 ', () => {
      expect(sem.getCurrentEventSize()).is.equals(2);
    });
  });

  context('normal 2', () => {
    const sem = new ScenarioEventManager();
    const events = [
      new TestEvent(false, true),
      new TestEvent(false, true),
      new TestEvent(true, false),
      new TestEvent(true, true),
      new TestEvent(true, true),
    ];
    sem.start(events);

    sem.update(0);
    // 最初の2つのイベントはupdateしても完了せず、3つ目の同期イベントが完了するため、
    // 次の4,5個目の非同期イベントをcurrentEventに追加して合計4つになるはず
    it('current event size should be 4 ', () => {
      expect(sem.getCurrentEventSize()).is.equals(4);
    });
  });

  context('normal 3', () => {
    const sem = new ScenarioEventManager();
    const events = [
      new TestEvent(true, true),
      new TestEvent(true, true),
      new TestEvent(true, false),
      new TestEvent(true, true),
      new TestEvent(true, true),
    ];
    sem.start(events);

    sem.update(0);
    sem.update(1);
    // 上記2回のupdadeで、全てのイベントが完了するはず
    it('current event size should be 0', () => {
      expect(sem.getCurrentEventSize()).is.equals(0);
    });

    it('event should stop (not isGoint)', () => {
      expect(sem.isGoing).is.false;
    });
  });
});