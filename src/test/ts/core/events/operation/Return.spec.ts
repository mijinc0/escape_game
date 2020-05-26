import 'mocha';
import { expect } from 'chai';
import { Return } from '../../../../../ts/core/events/operations/Return';
import { EventRange } from '../../../../../ts/core/events/EventRange';
import { LineRange } from '../../../../../ts/core/events/LineRange';
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

describe('return.update()', () => {
  context('normal', () => {
    const opReturn = new Return();

    const events: EventRange[] = [
      new LineRange(),
      new LineRange(),
      new LineRange(),
    ];

    const currentEvent = [
      new TestEvent(),
      new TestEvent(),
      new TestEvent(),
    ];

    opReturn.update(0, {events: events, currentEvents: currentEvent});

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