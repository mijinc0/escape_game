import * as Phaser from 'phaser';
import { IAudioConfig } from './IAudioConfig';

/**
 * play系の関数はcacheの中に指定のkeyのオーディオが無い場合は警告を出して返す 
 */
export interface IAudioManager {
  scene: Phaser.Scene;

  bgmMaster: number;
  
  seMaster: number;

  playSe(key: string, config: IAudioConfig): Phaser.Sound.BaseSound|null;

  playBgm(key: string, config: IAudioConfig): Phaser.Sound.BaseSound|null;
}