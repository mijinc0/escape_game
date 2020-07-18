import 'mocha';
import { expect } from 'chai';
import { TestEvent } from '../TestEvent';
import { TestFieldScene } from '../TestFieldScene';
import { TestScenarioEventManager } from '../TestScenarioEventManager';
import { EventRange } from '../../../../../ts/core/events/EventRange';
import { If } from '../../../../../ts/core/events/operations/If';
import { IScenarioEventManager } from '../../../../../ts/core/events/IScenarioEventManager';

class ScenarioEventManager extends TestScenarioEventManager {
  _events: EventRange[];

  constructor(events: EventRange[]) {
    super();
    this.events = events;
  }

  get events(): EventRange[] {
    return this._events;
  }

  set events(v: EventRange[]) {
    this._events = v;
  }
}

class FieldScene extends TestFieldScene {
  _scenarioEventManager: IScenarioEventManager;

  constructor(scenarioEventManager: IScenarioEventManager) {
    super();
    this.scenarioEventManager = scenarioEventManager;
  }

  get scenarioEventManager(): IScenarioEventManager {
    return this._scenarioEventManager;
  }

  set scenarioEventManager(v: IScenarioEventManager) {
    this._scenarioEventManager = v;
  }
}

describe('if.update()', () => {
  context('normal', () => {
    const sem = new ScenarioEventManager([]);
    const scene = new FieldScene(sem);

    const opIf = new If(() => true, [
      new TestEvent(),
      new TestEvent(),
      new TestEvent(),
    ]);

    opIf.update(scene);

    it('op if should be complete', async () => {
      expect(opIf.isComplete).is.true;
    });

    it('rangeStore should have a event range', async () => {
      const events = scene.scenarioEventManager.events;
      expect(events.length).is.equal(1);
    });
  });

  context('normal 2', () => {
    const sem = new ScenarioEventManager([]);
    const scene = new FieldScene(sem);

    const opIf = new If(() => false, [
      new TestEvent(),
      new TestEvent(),
      new TestEvent(),
    ]);

    opIf.update(scene);

    it('op if should be complete', async () => {
      expect(opIf.isComplete).is.true;
    });

    it('rangeStore should have no event range', async () => {
      const events = scene.scenarioEventManager.events;
      expect(events.length).is.equal(0);
    });
  });

  context('normal 3', () => {
    const sem = new ScenarioEventManager([]);
    const scene = new FieldScene(sem);

    const opIf = new If(() => false, [new TestEvent()]);

    opIf
      .elseIf(() => true)(new TestEvent(), new TestEvent())
      .else(new TestEvent(), new TestEvent(), new TestEvent());

    opIf.update(scene);

    it('op if should be complete', async () => {
      expect(opIf.isComplete).is.true;
    });

    it('rangeStore should have a event range', async () => {
      const events = scene.scenarioEventManager.events;
      expect(events.length).is.equal(1);
    });

    it('first event range should have 2 events', async () => {
      const events = scene.scenarioEventManager.events;
      const firstRangesEvents = events[0] ? events[0].entries.length : -1;
      expect(firstRangesEvents).is.equal(2);
    });
  });

  context('normal 4', () => {
    const sem = new ScenarioEventManager([]);
    const scene = new FieldScene(sem);

    const opIf = new If(() => false, [new TestEvent()]);

    opIf
      .elseIf(() => false)(new TestEvent(), new TestEvent())
      .else(new TestEvent(), new TestEvent(), new TestEvent());

    opIf.update(scene);

    it('op if should be complete', async () => {
      expect(opIf.isComplete).is.true;
    });

    it('rangeStore should have a event range', async () => {
      const events = scene.scenarioEventManager.events;
      expect(events.length).is.equal(1);
    });

    it('first event range should have 3 events', async () => {
      const events = scene.scenarioEventManager.events;
      const firstRangesEvents = events[0] ? events[0].entries.length : -1;
      expect(firstRangesEvents).is.equal(3);
    });
  });
});
