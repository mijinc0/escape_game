import * as Phaser from 'phaser';

export interface IAudioConfig extends Phaser.Types.Sound.SoundConfig {
  onComplete?: () => void;
}