import * as Phaser from 'phaser';
import * as Util from '../utils';
import { IAudioConfig } from './IAudioConfig';
import { IAudioManager } from './IAudioManager';

export class AudioManager implements IAudioManager {
  scene: Phaser.Scene;
  
  private pBgmMaster: number;
  private pSeMaster: number;
  
  constructor(scene: Phaser.Scene, bgmMaster: number, seMaster: number) {
    this.scene = scene;
    this.bgmMaster = bgmMaster;
    this.seMaster = seMaster;
  }

  get bgmMaster(): number {
    return this.pBgmMaster;
  }

  set bgmMaster(v: number) {
    this.pBgmMaster = Util.MathUtil.clamp(v, 1, 0);
  }

  get seMaster(): number {
    return this.pSeMaster;
  }

  set seMaster(v: number) {
    this.pSeMaster = Util.MathUtil.clamp(v, 1, 0);
  }

  playSe(key: string, config: IAudioConfig): Phaser.Sound.BaseSound|null {
    if (!this.scene.cache.audio.exists(key)) {
      console.warn(`audio ${key} is not found`);
      return null;  
    }

    if (config.volume) {
      const v = config.volume * this.seMaster;
      config.volume = Util.MathUtil.clamp(v, 1, 0);
    }

    const soundObject = this.scene.sound.add(key, config);

    if (config.onComplete) {
      soundObject.on('complete', config.onComplete);
    }
    
    soundObject.play();
    
    return soundObject;
  }

  playBgm(key: string, config: IAudioConfig): Phaser.Sound.BaseSound|null {
    if (!this.scene.cache.audio.exists(key)) {
      console.warn(`audio ${key} is not found`);
      return null;  
    }

    if (config.volume) {
      const v = config.volume * this.bgmMaster;
      config.volume = Util.MathUtil.clamp(v, 1, 0);
    }

    const soundObject = this.scene.sound.add(key, config);

    if (config.onComplete) {
      soundObject.on('complete', config.onComplete);
    }
    
    soundObject.play();

    return soundObject;
  }
}