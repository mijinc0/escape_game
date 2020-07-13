import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { Direction } from '../../core/models/Direction';
import { SceneData } from '../../core/models/SceneData';
import { IFieldScene } from '../../core/scenes/IFieldScene';

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

  init(scene: IFieldScene): void {
    this.isComplete = false;
  }

  update(scene: IFieldScene): void {
    const sceneData = new SceneData(this.areaId, this.x, this.y, this.direction);

    scene.phaserScene.scene.start('field', sceneData);

    this.complete();
  }

  complete(): void {
    this.isComplete = true;
  }
}