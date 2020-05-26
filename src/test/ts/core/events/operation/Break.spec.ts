import 'mocha';
import { expect } from 'chai';
import { Break } from '../../../../../ts/core/events/operations/Break';
import { EventRange } from '../../../../../ts/core/events/EventRange';
import { LineRange } from '../../../../../ts/core/events/LineRange';
import { CircularRange } from '../../../../../ts/core/events/CircularRange';

describe('break.update()', () => {
  context('normal', () => {
    const opBreak = new Break();

    const events: EventRange[] = [
      new LineRange(),
      new CircularRange(),
      new LineRange(),
    ];

    opBreak.update(0, {events: events, currentEvents: []});

    it('op break should be complete', async () => {
      expect(opBreak.isComplete).is.true;
    });

    it('events should be removed 2 event ranges', async () => {
      expect(events.length).is.equal(1);
    });
  });

  context('normal 2', () => {
    const opBreak = new Break();

    const events: EventRange[] = [
      new LineRange(),
      new LineRange(),
    ];

    opBreak.update(0, {events: events, currentEvents: []});

    it('op break should be complete', async () => {
      expect(opBreak.isComplete).is.true;
    });

    it('events should be removed 0 event ranges', async () => {
      expect(events.length).is.equal(2);
    });
  });

  context('normal', () => {
    const opBreak = new Break();

    const events: EventRange[] = [
      new LineRange(),
      new CircularRange(),
      new CircularRange(),
    ];

    opBreak.update(0, {events: events, currentEvents: []});

    it('op break should be complete', async () => {
      expect(opBreak.isComplete).is.true;
    });

    it('events should be removed 2 event ranges', async () => {
      expect(events.length).is.equal(1);
    });
  });
});