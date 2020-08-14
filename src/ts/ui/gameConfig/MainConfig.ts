import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import * as Util from '../../core/utils';
import { ProgressBar } from '../ProgressBar';
import { IGameGlobal } from '../../core/IGameGlobal';

type MainConfigConfig = {
  scene: Phaser.Scene;
  gameGlobal: IGameGlobal;
};

/**
 * 各サイズは固定
 */
export class MainConfig extends Ui.Group {
  constructor(config: MainConfigConfig, dx = 0, dy = 0, anchor?: Ui.IElement) {
    const width = 300;
    const height = 56;

    const margin = 40;
    const ah = new Ui.RangeAlignmentHandler(margin, Ui.Direction.Down);
    super(dx, dy, width, height, anchor, ah);

    this._init(config);
  }

  addPlayingTestBgmEvent(callback: () => void): void {
    this.on('testBgmPlay', callback);
  }

  addPlayingTestSeEvent(callback: () => void): void {
    this.on('testSePlay', callback);
  }

  private _init(config: MainConfigConfig): void {
    const seVolumeBar = this._createSeVolume(config);

    const bgmVolumeBar = this._createBgmVolume(config);

    this.push(seVolumeBar, bgmVolumeBar);
  }

  private _createSeVolume(config: MainConfigConfig): ProgressBar {
    const seVolumeBarConfig = {
      scene: config.scene,
      color: 0x777777,
      initProgress: config.gameGlobal.audioConfig.seMaster,
    };
    const seVolumeBar = new ProgressBar(seVolumeBarConfig, 0, 0, 300, 8);

    seVolumeBar.on(Ui.ElementEventNames.CursorLeft, () => {
      const seMaster = config.gameGlobal.audioConfig.seMaster - 0.1;
      config.gameGlobal.audioConfig.seMaster = Util.MathUtil.clamp(seMaster, 1, 0);
      seVolumeBar.progress = seMaster;
      this.emit('testSePlay');
    });

    seVolumeBar.on(Ui.ElementEventNames.CursorRight, () => {
      const seMaster = config.gameGlobal.audioConfig.seMaster + 0.1;
      config.gameGlobal.audioConfig.seMaster = Util.MathUtil.clamp(seMaster, 1, 0);
      seVolumeBar.progress = seMaster;
      this.emit('testSePlay');
    });

    seVolumeBar.on(Ui.ElementEventNames.Over, () => {
      seVolumeBar.color = 0x119933;
    });

    seVolumeBar.on(Ui.ElementEventNames.Out, () => {
      seVolumeBar.color = 0x777777;
    });

    return seVolumeBar;
  }

  private _createBgmVolume(config: MainConfigConfig): ProgressBar {
    const bgmVolumeBarConfig = {
      scene: config.scene,
      color: 0x777777,
      initProgress: config.gameGlobal.audioConfig.bgmMaster,
    };
    const bgmVolumeBar = new ProgressBar(bgmVolumeBarConfig, 0, 0, 300, 8);

    bgmVolumeBar.on(Ui.ElementEventNames.CursorLeft, () => {
      const bgmMaster = config.gameGlobal.audioConfig.bgmMaster - 0.1;
      config.gameGlobal.audioConfig.bgmMaster = Util.MathUtil.clamp(bgmMaster, 1, 0);
      bgmVolumeBar.progress = bgmMaster;
      this.emit('testBgmPlay');
    });

    bgmVolumeBar.on(Ui.ElementEventNames.CursorRight, () => {
      const bgmMaster = config.gameGlobal.audioConfig.bgmMaster + 0.1;
      config.gameGlobal.audioConfig.bgmMaster = Util.MathUtil.clamp(bgmMaster, 1, 0);
      bgmVolumeBar.progress = bgmMaster;
      this.emit('testBgmPlay');
    });

    bgmVolumeBar.on(Ui.ElementEventNames.Over, () => {
      bgmVolumeBar.color = 0x119933;
    });

    bgmVolumeBar.on(Ui.ElementEventNames.Out, () => {
      bgmVolumeBar.color = 0x777777;
    });

    return bgmVolumeBar;
  }
}
