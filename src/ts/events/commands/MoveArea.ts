import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../../core/events/ScenarioEventUpdateConfig';
import { Direction } from '../../core/models/Direction';
import { SceneData } from '../../core/models/SceneData';

export class MoveArea implements IScenarioEvent {
  readonly isAsync = true;

  isComplete: boolean;

  private areaId: number;
  private x: number;
  private y: number;
  private direction: Direction;

  constructor(areaId: number, x: number, y: number, direction: Direction) {
    this.areaId = areaId;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.isComplete = false; 
  }

  init(config: ScenarioEventUpdateConfig): void {
    this.isComplete = false;
  }

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    if (!config.scene) {
      console.warn('ScenarioEventUpdateConfig has not scene object');
      this.isComplete = true;
      return;
    }

    const sceneData = new SceneData(this.areaId, this.x, this.y, this.direction);

    config.scene.scene.start('field', sceneData);

    this.complete();
  }

  complete(): void {
    this.isComplete = true;
  }
}