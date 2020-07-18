import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { Direction } from '../../core/models/Direction';
import { IFieldScene } from '../../core/scenes/IFieldScene';
import { IFieldSceneConfig } from '../../core/scenes/IFieldSceneConfig';

export class MoveField implements IScenarioEvent {
  readonly isAsync = true;

  isComplete: boolean;

  private fieldId: number;
  private x: number;
  private y: number;
  private direction: Direction;

  constructor(fieldId: number, x: number, y: number, direction: Direction) {
    this.fieldId = fieldId;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.isComplete = false;
  }

  init(scene: IFieldScene): void {
    this.isComplete = false;
  }

  update(scene: IFieldScene): void {
    const config: IFieldSceneConfig = {
      fieldId: this.fieldId,
      heroX: this.x,
      heroY: this.y,
      heroDirection: this.direction,
    };

    scene.phaserScene.scene.start('field', config);

    this.complete();
  }

  complete(): void {
    this.isComplete = true;
  }
}
