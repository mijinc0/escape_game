import 'mocha';
import { expect } from 'chai';
import { TestFieldScene } from '../TestFieldScene';
import { TestScenarioEventManager } from '../TestScenarioEventManager';
import { Break } from '../../../../../ts/core/events/operations/Break';
import { EventRange } from '../../../../../ts/core/events/EventRange';
import { LineRange } from '../../../../../ts/core/events/LineRange';
import { CircularRange } from '../../../../../ts/core/events/CircularRange';
import { IScenarioEventManager } from '../../../../../ts/core/events/IScenarioEventManager';

class ScenarioEventManager extends TestScenarioEventManager {
  _events: EventRange[];

  constructor(...events: EventRange[]) {
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

describe('break.update()', () => {
  context('normal', () => {
    const sem = new ScenarioEventManager(new LineRange(), new CircularRange(), new LineRange());
    const scene = new FieldScene(sem);

    const opBreak = new Break();
    opBreak.update(scene);

    it('op break should be complete', async () => {
      expect(opBreak.isComplete).is.true;
    });

    it('events should be removed 2 event ranges', async () => {
      const events = sem.events;
      expect(events.length).is.equal(1);
    });
  });

  context('normal 2 (all LineRange)', () => {
    const sem = new ScenarioEventManager(new LineRange(), new LineRange(), new LineRange());
    const scene = new FieldScene(sem);

    const opBreak = new Break();
    opBreak.update(scene);

    it('op break should be complete', async () => {
      expect(opBreak.isComplete).is.true;
    });

    it('events should be removed 0 event ranges', async () => {
      const events = sem.events;
      expect(events.length).is.equal(3);
    });
  });

  context('normal 3 (there is CircularRange)', () => {
    const sem = new ScenarioEventManager(new LineRange(), new CircularRange(), new LineRange());
    const scene = new FieldScene(sem);

    const opBreak = new Break();
    opBreak.update(scene);

    it('op break should be complete', async () => {
      expect(opBreak.isComplete).is.true;
    });

    it('events should be removed 2 event ranges', async () => {
      const events = sem.events;
      expect(events.length).is.equal(1);
    });
  });
});
