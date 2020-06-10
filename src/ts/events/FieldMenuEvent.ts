import * as Phaser from 'phaser';
import { FieldMenu } from '../ui/fieldMenu/FieldMenu';
import { FieldMenuFactory } from '../ui/fieldMenu/FieldMenuFactory';
import { IScenarioEvent } from '../core/events/IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../core/events/ScenarioEventUpdateConfig';

export class FieldMenuEvent implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  private scene: Phaser.Scene;
  private fieldMenu: FieldMenu;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.fieldMenu = null;
    this.isComplete = false;
  }

  init(config: ScenarioEventUpdateConfig): void {
    this.isComplete = false;
    this.fieldMenu = FieldMenuFactory.create(this.scene, config.gameGlobal.items.entries, config.keys);
  };

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    if (this.isComplete) return;

    if (!this.fieldMenu) {
      this.isComplete = true;

    } else if (this.fieldMenu.isClosed) {
      this.complete();

    } else {
      this.fieldMenu.update(frame);
    }
  };

  complete(): void {
    this.fieldMenu = this.fieldMenu.destroy();
    this.isComplete = true;
  };
}
