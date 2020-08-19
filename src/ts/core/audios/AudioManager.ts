import * as Phaser from 'phaser';
import * as Util from '../utils';
import { IAudioManager } from './IAudioManager';
import { IAudioConfig } from './IAudioConfig';
import { IPlayingAudioConfig } from './IPlayingAudioConfig';

type TangibleAudioSound = Phaser.Sound.HTML5AudioSound|Phaser.Sound.WebAudioSound;

/**
 * 音の生成自体はPhaserに任せる。
 * このクラスはbgmとseのマスターボリュームを持ち、再生する音量を調整する機能を持つだけ
 * (ちなみに、bgmとseでボリュームを分けなくて良いならPhaserのマネージャーにGlobalVolumeがある)
 */
export class AudioManager implements IAudioManager {
  scene: Phaser.Scene;
  
  private config: IAudioConfig;
  private bgmObject: Phaser.Sound.BaseSound;
  
  constructor(scene: Phaser.Scene, config: IAudioConfig) {
    this.scene = scene;
    this.config = config;
    this.bgmObject = null;
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

  playBgm(key: string, config: IPlayingAudioConfig, ignoreIfPlaying?: boolean): Phaser.Sound.BaseSound | null {
    if (!this.scene.cache.audio.exists(key)) {
      console.warn(`audio ${key} is not found`);
      return null;
    }

    if (ignoreIfPlaying && this.bgmObject) return null;

    config = this._applyAudioConfigToPlayingConfig(config);

    config.loop = true;

    const soundObject = this.scene.sound.add(key);

    if (config.onComplete) {
      soundObject.on('complete', config.onComplete);
    }

    soundObject.play(undefined, config);

    if (config.fade && this._isTangibleAudioSound(soundObject)) {
      const startVol = Util.MathUtil.clamp(config.volume * config.fade.from, 1, 0);
      const endVol = Util.MathUtil.clamp(config.volume * config.fade.to, 1, 0);
      this._addVolumeFading(soundObject, config.fade.duration, startVol, endVol);
    }

    if (this.bgmObject) {
      this._stopBgm(this.bgmObject);
    }
    this.bgmObject = soundObject;

    return soundObject;
  }

  stopBgm(duration?: number, onComplete?: () => void): void {
    if (!this.bgmObject) return;
    
    // duration > 0の場合、フェードアウト後にbgmObjectを削除する。
    // フェードアウト後に`this.bgmObject = null`をしてしまうと、
    // フェードアウト中に`this.bgmObject`に対する操作が合った場合に予期せぬ挙動をしそうなので、
    // 先に取り出して`this.bgmObject = null`をしている。
    const bgmObject = this.bgmObject;
    this.bgmObject = null;

    onComplete = onComplete ? onComplete : () => {};

    if (duration > 0 && this._isTangibleAudioSound(bgmObject)) {
      const currentVolume = bgmObject.volume;
      const tween = this._addVolumeFading(bgmObject, duration, currentVolume, 0);
      tween.on('complete', (() => {
        onComplete();
        this._stopBgm(bgmObject)
      }).bind(this));
    } else {
      onComplete();
      this._stopBgm(bgmObject);
    }
  }

  private _applyAudioConfigToPlayingConfig(config: IPlayingAudioConfig): IPlayingAudioConfig {
    const result: IPlayingAudioConfig = {};

    Object.assign(result, config);

    const v = config.volume ? config.volume * this.seMaster : this.seMaster;

    result.volume = Util.MathUtil.clamp(v, 1, 0);

    return result;
  }

  private _stopBgm(bgmObject: Phaser.Sound.BaseSound): void {
    bgmObject.stop();
    bgmObject.destroy();
  }

  private _addVolumeFading(soundObject: TangibleAudioSound, duration: number, from: number, to: number): Phaser.Tweens.Tween {
    from = Util.MathUtil.clamp(from, 1, 0);
    to = Util.MathUtil.clamp(to, 1, 0);

    return this.scene.add.tween({
      targets: soundObject,
      volume: {from: from, to: to},
      duration: duration,
    });
  }

  private _isTangibleAudioSound(soundObject: Phaser.Sound.BaseSound): soundObject is TangibleAudioSound {
    return soundObject instanceof Phaser.Sound.HTML5AudioSound || soundObject instanceof Phaser.Sound.WebAudioSound;
  }
}
