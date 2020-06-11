import * as Phaser from 'phaser';
import { FieldMenu } from '../ui/fieldMenu/FieldMenu';
import { FieldMenuFactory } from '../ui/fieldMenu/FieldMenuFactory';
import { IScenarioEvent } from '../core/events/IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../core/events/ScenarioEventUpdateConfig';

export class FieldMenuEvent implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  private initCooldown: number;
  private scene: Phaser.Scene;
  private fieldMenu: FieldMenu;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.fieldMenu = null;
    this.isComplete = false;
    this.initCooldown = 0;
  }

  init(config: ScenarioEventUpdateConfig): void {
    this.isComplete = false;
    this.fieldMenu = FieldMenuFactory.create(this.scene, config.gameGlobal.items.entries, config.keys);
    this.initCooldown = 15;
  };

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    // 開始してすぐに入力を受け付けると誤操作してしまうので開いてすぐあとにクールダウンを設ける
    if (this.initCooldown > 0) {
      this.initCooldown--;
      return;
    }

    if (this.isComplete || !this.fieldMenu || this.fieldMenu.isClosed) return;

    this.fieldMenu.update(frame);

    if (this.fieldMenu.isClosed) {
      this.complete();
    }
  };

  complete(): void {
    this.fieldMenu = this.fieldMenu.destroy();
    this.isComplete = true;
  };
}
