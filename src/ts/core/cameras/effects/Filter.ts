import * as Phaser from 'phaser';
import * as Render from '../../renders';
import * as Util from '../../utils';
import { SceneCameraEffect } from './SceneCameraEffect';

type FilterConfig = {
  duration: number;
  endAlpha: number;
  endColor: number;
  startAlpha?: number;
  startColor?: number;
  onComplete?: () => void;
};

export class Filter extends SceneCameraEffect {
  name = 'filter';

  private filter: Phaser.GameObjects.Rectangle;
  private duration: number;
  private elapsed: number;
  private startAlpha: number;
  private endAlpha: number;
  private startColor: number;
  private endColor: number;

  constructor(scene: Phaser.Scene) {
    super(scene);

    this.reset();
  }

  start(config: FilterConfig): boolean {
    if (config.duration < 0) {
      throw Error('duration must be positive num');
    }

    this.endAlpha = config.endAlpha;
    this.endColor = config.endColor;
    this.duration = config.duration;
    this.elapsed = 0;

    // filterエフェクトが既にある時に再度startを呼ばれると、現在のfilterのステータスをデフォルト値として
    // filterエフェクトを開始する。無い場合にはフィルターを作るところからはじめる。
    if (this.filter) {
      this.startAlpha = typeof(config.startAlpha) === 'number' ? config.startAlpha : this.filter.fillAlpha;
      this.startColor = typeof(config.startColor) === 'number' ? config.startColor : this.filter.fillColor;

    } else {
      const worldView = this.scene.cameras.main.worldView;

      this.startAlpha = typeof(config.startAlpha) === 'number' ? config.startAlpha : 0;
      this.startColor = typeof(config.startColor) === 'number' ? config.startColor : config.endColor;

      this.filter = this.scene.add.rectangle(
        worldView.x,
        worldView.y,
        worldView.width,
        worldView.height,
        this.startColor,
        this.startAlpha,
      );

      this.filter.setOrigin(0);
  
      Render.CameraEffectRenderOrder.base(this.filter);
    }

    if (config.onComplete) {
      this.once('complete', config.onComplete);
    }
    
    this.isRunning = true;

    return true;
  };

  update(time: number, delta: number): void {
    if (!this.isRunning) return;

    const worldView = this.scene.cameras.main.worldView;

    this.filter.setPosition(worldView.x, worldView.y);
    this.filter.setSize(worldView.width, worldView.height);

    this.elapsed += delta;

    const progress = Util.MathUtil.clamp(this.elapsed / this.duration, 1, 0);

    const currentAlpha = this._calcCurrentAlpha(this.startAlpha, this.endAlpha, progress);
    const currentColor = this._calcCurrentColor(this.startColor, this.endColor, progress);

    this.filter.setFillStyle(currentColor, currentAlpha);

    if (progress === 1) {
      this.complete();
    }
  };

  complete(): void {
    this.emit('complete');
    this.removeAllListeners();
    this.isRunning = false;
  }
  
  reset(): boolean {
    if(this.filter) {
      this.filter.destroy(true);
    }

    this.filter = null;
    this.duration = 0;
    this.elapsed = 0;
    this.startAlpha = 0;
    this.endAlpha = 0;
    this.startColor = 0x000000;
    this.endColor = 0x000000;

    this.removeAllListeners();

    return this.filter ? true : false;
  }

  /**
   * progressは事前にclampされているものとして重ねてclampも検査もしないので注意
   * 
   * @param startAlpha 
   * @param endAlpha 
   * @param progress 0-1
   */
  private _calcCurrentAlpha(startAlpha: number, endAlpha: number, progress: number): number {
    const dAlpha = endAlpha - startAlpha;

    return startAlpha + (dAlpha * progress);
  }

  /**
   * progressは事前にclampされているものとして重ねてclampも検査もしないので注意
   * 
   * @param startColor 
   * @param endColor 
   * @param progress 0-1
   */
  private _calcCurrentColor(startColor: number, endColor: number, progress: number): number {
    // start
    const sRed = (startColor & 0xff0000) >> 16;
    const sGreen = (startColor & 0x00ff00) >> 8;
    const sBlue = startColor & 0x0000ff;

    // end
    const eRed = (endColor & 0xff0000) >> 16;
    const eGreen = (endColor & 0x00ff00) >> 8;
    const eBlue = endColor & 0x0000ff;

    // delta
    const dRed = eRed - sRed; 
    const dGreen = eGreen - sGreen; 
    const dBlue = eBlue - sBlue;

    // current
    const cRed = sRed + (dRed * progress);
    const cGreen = sGreen + (dGreen * progress);
    const cBlue = sBlue + (dBlue * progress);

    // concat & return
    return (cRed << 16) | (cGreen << 8) | (cBlue);
  }
  
}