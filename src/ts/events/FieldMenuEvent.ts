import * as Phaser from 'phaser';
import { FieldMenu } from '../ui/fieldMenu/FieldMenu';
import { IScenarioEvent } from '../core/events/IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../core/events/ScenarioEventUpdateConfig';
import { Element } from '../core/ui/Element';

export class FieldMenuEvent implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  private scene: Phaser.Scene;
  private uiRoot: Element;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.uiRoot = null;
    this.isComplete = false;
  }

  init(config: ScenarioEventUpdateConfig): void {
    this.isComplete = false;
    this.uiRoot = new FieldMenu(this.scene, config.keys);
  };

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    if (!this.uiRoot) {
      this.isComplete = true;
      return;
    }

    this.uiRoot.update(frame);
  };

  complete(): void {
    this.uiRoot = this.uiRoot.destroy();
    this.isComplete = true;
  };
}
