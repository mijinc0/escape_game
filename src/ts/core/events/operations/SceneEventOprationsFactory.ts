import { Break } from './Break';
import { If } from './If';
import { Loop } from './Loop';
import { Return } from './Return';
import { IScenarioEvent } from '../IScenarioEvent';

type ConditionCallback = () => boolean;

export class SceneEventOprationsFactory {
  static break(): Break {
    return new Break();
  }

  static return(): Return {
    return new Return();
  }

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
  static if(conditionCallback: ConditionCallback): (...events: IScenarioEvent[]) => If {
    return (...events: IScenarioEvent[]) => (
      new If(conditionCallback, events)
    );
  }

  static loop(...events: IScenarioEvent[]): Loop {
    return new Loop(events);
  }
}