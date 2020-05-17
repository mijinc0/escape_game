import 'mocha';
import { expect } from 'chai';
import { ScenarioEventManager } from '../../../../ts/core/events/ScenarioEventManager';
import { IScenarioEvent } from '../../../../ts/core/events/IScenarioEvent';

class TestEvent implements IScenarioEvent {
  isComplete: boolean;
  isAsync: boolean;

  execComplete: boolean;

  constructor(isComplete: boolean, isAsync: boolean) {
    this.isComplete = isComplete;
    this.isAsync = isAsync;

    this.execComplete = false;
  }

  update(frame: number, asyncEvents: IScenarioEvent[]): void {
    this.isComplete = true;
  }

  complete(frame: number): void {
    this.execComplete = true;
  };
}

describe('scenarioEventManager.start()', () => {
  context('normal(async:2, sync3)', () => {
    const sem = new ScenarioEventManager();
    const events = [
      new TestEvent(false, true),
      new TestEvent(false, true),
      new TestEvent(false, false),
      new TestEvent(false, false),
      new TestEvent(false, false),
    ];
    sem.start(events);

    it('event should be going', () => {
      expect(sem.isGoing()).is.true;
    });

    it('current event size should be 3 ', () => {
      expect(sem.getCurrentEventSize()).is.equals(3);
    });

    it('all event size should be 5', () => {
      expect(sem.getAllEventSize()).is.equals(5);
    });
  });

  context('normal(async: 3)', () => {
    const sem = new ScenarioEventManager();
    const events = [
      new TestEvent(false, true),
      new TestEvent(false, true),
      new TestEvent(false, true),
    ];
    sem.start(events);

    it('evnet should be going', () => {
      expect(sem.isGoing()).is.true;
    });

    it('current event size should be 3', () => {
      expect(sem.getCurrentEventSize()).is.equals(3);
    });

    it('all event size should be 3', () => {
      expect(sem.getAllEventSize()).is.equals(3);
    });
  });
});

describe('scenarioEventManager.clearEvent()', () => {
  context('normal', () => {
    const sem = new ScenarioEventManager();
    const events = [
      new TestEvent(false, true),
      new TestEvent(false, true),
      new TestEvent(false, true),
    ];
    sem.clearEvent();

    it('evnet should be going', () => {
      expect(sem.isGoing()).is.false;
    });

    it('all event size should be 0', () => {
      expect(sem.getAllEventSize()).is.equals(0);
    });
  });
});

describe('scenarioEventManager.update()', () => {
  context('normal', () => {
    const sem = new ScenarioEventManager();
    // あとからイベントの中身を確認できるように外で一つ作っておく
    const trapEvent = new TestEvent(false, false);
    const events = [
      new TestEvent(false, true),
      new TestEvent(false, true),
      new TestEvent(false, false),
      trapEvent,
      new TestEvent(false, false),
    ];
    sem.start(events);
    // 1回目 : 0,1,2が終了
    // 2回目 : 3が終了
    // 結果  : 4だけが残る
    sem.update(0);
    sem.update(1);

    it('current event size should equal 1', () => {
      expect(sem.getCurrentEventSize()).is.equals(1);
    });

    it('all event size should equal 1', () => {
      expect(sem.getAllEventSize()).is.equals(1);
    });

    it('event[3] should be completed', () => {
      expect(trapEvent.isComplete).is.true;
    });

    it('event[3].complete() should be executed', () => {
      expect(trapEvent.execComplete).is.true;
    });
  });
});