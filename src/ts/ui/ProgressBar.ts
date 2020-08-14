import * as Phaser from 'phaser';
import * as Ui from '../core/ui';
import * as Render from '../core/renders';
import * as Util from '../core/utils';

type ProgressBarConfig = {
  scene: Phaser.Scene;
  color: number;
  initProgress?: number;
};

export class ProgressBar extends Ui.Group {
  private background: Ui.Rectangle;
  private progressBar: Ui.Rectangle;

  constructor(config: ProgressBarConfig, dx = 0, dy = 0, width = 0, height = 0, anchor?: Ui.IElement) {
    super(dx, dy, width, height, anchor, null);

    this.init(config);
  }

  init(config: ProgressBarConfig): void {
    this.background = this._createBackground(config);

    this.progressBar = this._createProgressBar(config);

    Render.UiRenderOrder.base(this.background, this.progressBar);

    this.push(this.background, this.progressBar);

    this.progress = config.initProgress ? config.initProgress : 0;
  }

  get progress(): number {
    const progress = this.progressBar.width / this.width;

    return progress;
  }

  set progress(v: number) {
    v = Util.MathUtil.clamp(v, 1, 0);

    this.progressBar.width = this.width * v;
  }

  set color(v: number) {
    this.background.setFillStyle(v, 0.3);
    this.progressBar.setFillStyle(v, 0.9);
  }

  private _createBackground(config: ProgressBarConfig): Ui.Rectangle {
    const backgroupd = new Ui.Rectangle(config.scene, 0, 0, this.width, this.height, 0x555555, 0.1);
    backgroupd.setOrigin(0);
    config.scene.add.existing(backgroupd);

    return backgroupd;
  }

  private _createProgressBar(config: ProgressBarConfig): Ui.Rectangle {
    const progressBar = new Ui.Rectangle(config.scene, 0, 0, this.width, this.height, config.color, 1.0);
    progressBar.setOrigin(0);
    config.scene.add.existing(progressBar);

    return progressBar;
  }
}
