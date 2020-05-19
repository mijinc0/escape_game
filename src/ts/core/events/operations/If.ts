import { Conditional } from './Conditional';
import { Else } from './Else';
import { IScenarioEvent } from '../IScenarioEvent';

type ConditionCallback = () => boolean;
type EventInterruptionCallback = (...events: IScenarioEvent[]) => void;

export class If extends Conditional {
  private beforeConditional: Conditional;
  private nextConditional: Conditional;

  constructor (
    eventInterruptionCallback: EventInterruptionCallback,
    conditionCallback: ConditionCallback,
    ...events: IScenarioEvent[]
  ) {
    super(eventInterruptionCallback, conditionCallback, ...events);

    this.beforeConditional = null;
    this.nextConditional = null;
  }


  update(frame: number): void {
    if (this.conditionCallback()) {
      this.eventInterruptionCallback(...this.events);
    } else if (this.nextConditional) {
      // もし、nextConditional(elseIf または else)を持っていれば、それをupdateする
      this.nextConditional.update(frame);
    }

    this.complete(frame);
  }
  
  elseIf(conditionCallback: ConditionCallback, ...events: IScenarioEvent[]): If {
    if (this.nextConditional) throw Error('this "if" already has a next conditional');

    const elseIf = new If(this.eventInterruptionCallback, conditionCallback, ...events);

    this.nextConditional = elseIf;
    elseIf.beforeConditional = this;

    return elseIf;
  }

  else(...events: IScenarioEvent[]): If {
    if (this.nextConditional) throw Error('this "if" already has a next conditional');

    const _else = new Else(this.eventInterruptionCallback, ...events);

    this.nextConditional = _else;

    return this.endIf();
  }

  endIf(): If {
    return this.beforeConditional instanceof If ? this.beforeConditional.endIf() : this;
  }
}