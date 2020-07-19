import 'mocha';
import { expect } from 'chai';
import { TestFieldScene } from '../TestFieldScene';
import { TestScenarioEventManager } from '../TestScenarioEventManager';
import { TestEvent } from '../TestEvent';
import { Return } from '../../../../../ts/core/events/operations/Return';
import { EventRange } from '../../../../../ts/core/events/EventRange';
import { LineRange } from '../../../../../ts/core/events/LineRange';
import { IScenarioEvent } from '../../../../../ts/core/events/IScenarioEvent';
import { IScenarioEventManager } from '../../../../../ts/core/events/IScenarioEventManager';

class ScenarioEventManager extends TestScenarioEventManager {
  _events: EventRange[];

  _currentEvents: IScenarioEvent[];

  constructor(events: EventRange[], currentEvents: IScenarioEvent[]) {
    super();
    this.events = events;
    this.currentEvents = currentEvents;
  }

  get events(): EventRange[] {
    return this._events;
  }

  set events(v: EventRange[]) {
    this._events = v;
  }

  get currentEvents(): IScenarioEvent[] {
    return this._currentEvents;
  }

  set currentEvents(v: IScenarioEvent[]) {
    this._currentEvents = v;
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

describe('return.update()', () => {
  context('normal', () => {
    const events: EventRange[] = [new LineRange(), new LineRange(), new LineRange()];

    const currentEvent = [new TestEvent(), new TestEvent(), new TestEvent()];

    const sem = new ScenarioEventManager(events, currentEvent);

    const scene = new FieldScene(sem);

    const opReturn = new Return();
    opReturn.update(scene);

    it('op break should be complete', async () => {
      expect(opReturn.isComplete).is.true;
    });

    it('events should be removed all event ranges', async () => {
      expect(events.length).is.equal(0);
    });

    it('all currentEvents should be complete', async () => {
      expect(currentEvent[0].isComplete).is.true;
      expect(currentEvent[1].isComplete).is.true;
      expect(currentEvent[2].isComplete).is.true;
    });
  });
});
