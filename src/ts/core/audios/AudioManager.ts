import * as Phaser from 'phaser';
import * as Util from '../utils';
import { IAudioManager } from './IAudioManager';
import { IAudioConfig } from './IAudioConfig';
import { IPlayingAudioConfig } from './IPlayingAudioConfig';

/**
 * 音の生成自体はPhaserに任せる。
 * このクラスはbgmとseのマスターボリュームを持ち、再生する音量を調整する機能を持つだけ
 * (ちなみに、bgmとseでボリュームを分けなくて良いならPhaserのマネージャーにGlobalVolumeがある)
 */
export class AudioManager implements IAudioManager {
  scene: Phaser.Scene;

  private config: IAudioConfig;

  constructor(scene: Phaser.Scene, config: IAudioConfig) {
    this.scene = scene;
    this.config = config;
  }

  get bgmMaster(): number {
    return this.config.bgmMaster;
  }

  get seMaster(): number {
    return this.config.seMaster;
  }

  playSe(key: string, config: IPlayingAudioConfig): Phaser.Sound.BaseSound | null {
    if (!this.scene.cache.audio.exists(key)) {
      console.warn(`audio ${key} is not found`);
      return null;
    }

    config = this._applyAudioConfigToPlayingConfig(config);

    const soundObject = this.scene.sound.add(key);

    if (config.onComplete) {
      soundObject.on('complete', config.onComplete);
    }

    soundObject.play(undefined, config);

    return soundObject;
  }

  playBgm(key: string, config: IPlayingAudioConfig): Phaser.Sound.BaseSound | null {
    if (!this.scene.cache.audio.exists(key)) {
      console.warn(`audio ${key} is not found`);
      return null;
    }

    config = this._applyAudioConfigToPlayingConfig(config);

    const soundObject = this.scene.sound.add(key);

    if (config.onComplete) {
      soundObject.on('complete', config.onComplete);
    }

    soundObject.play(undefined, config);

    return soundObject;
  }

  private _applyAudioConfigToPlayingConfig(config: IPlayingAudioConfig): IPlayingAudioConfig {
    const result: IPlayingAudioConfig = {};

    const v = config.volume ? config.volume * this.seMaster : this.seMaster;

    result.volume = Util.MathUtil.clamp(v, 1, 0);

    return result;
  }
}
