import { Break } from './Break';
import { If } from './If';
import { Loop } from './Loop';
import { Return } from './Return';
import { IScenarioEvent } from '../IScenarioEvent';

type ConditionCallback = () => boolean;

/**
 * break,returnは同じものを使い回せば済むので関数ではなくreadonlyプロパティにしておく
 */
export class SceneEventOprationsFactory {
  readonly break = new Break();

  readonly return = new Return();

  /**
   * わざわざIfを生成する関数オブジェクトを生成しているのは、使う場所で以下のように
   * 記述できるようにするため
   * 
   * if(conditionCallback)(
   *   event,
   *   event,
   *   event,
   * 
   * ).elseIf(conditionCallback)(
   *   event,
   *   event,
   *   event,
   * 
   * ).else(
   *   event,
   *   event,
   *   event,
   * );
   * 
   * @param conditionCallback 
   */
  if(conditionCallback: ConditionCallback): (...events: IScenarioEvent[]) => If {
    return (...events: IScenarioEvent[]) => (
      new If(conditionCallback, events)
    );
  }

  loop(...events: IScenarioEvent[]): Loop {
    return new Loop(events);
  }
}