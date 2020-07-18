import { Break } from './Break';
import { If } from './If';
import { Loop } from './Loop';
import { Return } from './Return';
import { IScenarioEvent } from '../IScenarioEvent';

type CriteriaCallback = () => boolean;

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
   * if(criteriaCallback)(
   *   event,
   *   event,
   *   event,
   *
   * ).elseIf(criteriaCallback)(
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
   * @param criteriaCallback
   */
  static if(
    criteriaCallback: CriteriaCallback,
  ): (...events: IScenarioEvent[]) => If {
    return (...events: IScenarioEvent[]) => new If(criteriaCallback, events);
  }

  static loop(...events: IScenarioEvent[]): Loop {
    return new Loop(events);
  }
}
